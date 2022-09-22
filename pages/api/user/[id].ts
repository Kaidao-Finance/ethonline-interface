import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../src/libs/mongodb";
import { ObjectId } from "mongodb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (session) {
    if (req.method === "GET") {
      const { id } = req.query;
      //database connect
      const database = await clientPromise;
      const db = await database.db("ethernal");

      //get users
      const data = await db
        .collection("users")
        .findOne({ _id: new ObjectId(id as string) });

      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({ status: false, message: "not found" });
      }
    }
  } else {
    res.status(401).json({ message: "unauthorized" });
  }
};

export default handler;

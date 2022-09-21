import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../src/libs/mongodb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (session) {
    if (req.method === "GET") {
      //database connect
      const database = await clientPromise;
      const db = await database.db("ethernal");

      //check register users
      const twitter_uid = session.user.id;
      const data = await db
        .collection("users")
        .findOne({ twitter_uid: twitter_uid });

      if (data) {
        res.status(200).json({ status: true });
      } else {
        //change to true to test register page
        res.status(200).json({ status: false });
      }
    }
  } else {
    res.status(401).json({ message: "unauthorized" });
  }
};

export default handler;

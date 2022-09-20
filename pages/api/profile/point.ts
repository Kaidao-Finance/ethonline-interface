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
      const db = await database.db("herculeswap");

      //get user invite code by session
      const twitter_uid = session.user.id;
      const data = await db
        .collection("join_logs")
        .findOne({ twitter_uid: twitter_uid });
      const my_code = data?.join_code;

      //query downline
      const count = await db
        .collection("join_logs")
        .find({ invited_code: my_code })
        .count();

      return res.status(200).json({ point: count * 100 });
    }
  } else {
    res.status(401).json({ message: "unauthorized" });
  }
};

export default handler;

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

      if (data) {
        return res
          .status(200)
          .json({ join_type: data?.join_type, join_code: data?.join_code });
      } else {
        return res.status(200).json({ join_type: null, join_code: null });
      }
    }
  } else {
    res.status(401).json({ message: "unauthorized" });
  }
};

export default handler;

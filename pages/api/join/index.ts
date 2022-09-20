import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../src/libs/mongodb";
import { JoinLogs } from "../../../interfaces/JoinLogs";
import { generateCode as generateJoinCode } from "../../../utils/generateCode";
import { validateCode } from "../../../utils/validateCode";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (session) {
    if (req.method === "POST") {
      //database connect
      const database = await clientPromise;
      const db = await database.db("herculeswap");

      // get post data
      const {
        join_type,
        twitter_uid,
        twitter_name,
        invited_code,
        wallet_address,
      } = req.body;

      //validate invite code format
      if (!validateCode(invited_code)) {
        return res.status(400).json({
          status: 400,
          message: "Invite Code `" + invited_code + "` invalid format.",
        });
      }

      //validate invite code from database
      const data = await db.collection("join_logs").findOne({
        join_code: invited_code,
        twitter_uid: { $ne: twitter_uid },
      });
      if (!data) {
        return res.status(400).json({
          status: 400,
          message: "Invite Code `" + invited_code + "` not found.",
        });
      }

      //check joined
      const joined = await db
        .collection("join_logs")
        .findOne({ twitter_uid: twitter_uid });
      if (joined) {
        return res.status(400).json({
          status: 400,
          message: "You have joined.",
        });
      }

      const joinLogs: JoinLogs = {
        twitter_uid: twitter_uid,
        twitter_name: twitter_name,
        join_type: join_type,
        join_code: generateJoinCode(),
        invited_code: invited_code,
        wallet_address: wallet_address,
        timestamp: new Date(),
      };

      //example insert data without condition check and session check
      const join = await db.collection("join_logs").insertOne(joinLogs);
      if (!join) {
        return res.status(500).json({ message: "cannot join" });
      } else {
        return res.status(200).json({ message: "join success" });
      }
    }
  } else {
    res.status(401).json({ message: "unauthorized" });
  }
};

export default handler;

import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../src/libs/mongodb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    //database connect
    const database = await clientPromise;
    const db = await database.db("herculeswap");

    //get recent join
    const data = await db
      .collection("join_logs")
      .aggregate([
        {
          $lookup: {
            from: "join_logs",
            localField: "invited_code",
            foreignField: "join_code",
            as: "topline",
          },
        },
      ])
      .sort({ timestamp: -1 })
      .limit(50)
      .toArray();

    const recent_data = data.filter((item) => item.twitter_uid != null);

    return res.status(200).json(recent_data);
  }
};

export default handler;

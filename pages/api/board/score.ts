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
            localField: "join_code",
            foreignField: "invited_code",
            as: "downline",
          },
        },
        {
          $lookup: {
            from: "join_logs",
            localField: "invited_code",
            foreignField: "join_code",
            as: "topline",
          },
        },
      ])
      .sort({ downline: -1 })
      .limit(10)
      .toArray();

    const filteredData = data.filter((item) => item.twitter_uid != null);
    const scoreData = filteredData.map((item) => {
      const data = {
        twitter_uid: item.twitter_uid,
        twitter_name: item.twitter_name,
        join_type: item.join_type,
        join_code: item.join_code,
        invited_code: item.invited_code,
        wallet_address: item.wallet_address,
        timestamp: item.timestamp,
        score: item.downline.length * 100,
        downline: item.downline,
        topline: item.topline,
      };
      return data;
    });

    return res.status(200).json(scoreData.sort((a, b) => b.score - a.score));
  }
};

export default handler;

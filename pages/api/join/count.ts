import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../src/libs/mongodb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    //database connect
    const database = await clientPromise;
    const db = await database.db("herculeswap");

    //get recent join
    const all = await db.collection("join_logs").find().count();
    const creator = await db
      .collection("join_logs")
      .find({ join_type: 1 })
      .count();
    const collector = await db
      .collection("join_logs")
      .find({ join_type: 2 })
      .count();

    return res
      .status(200)
      .json({ count: all, creator: creator, collector: collector });
  }
};

export default handler;

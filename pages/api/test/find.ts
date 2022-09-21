import type { NextApiRequest, NextApiResponse } from "next";
import { getNFTCollection } from "../../../src/utils/getNFTCollection";

import clientPromise from "../../../src/libs/mongodb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const database = await clientPromise;
  const db = await database.db("ethernal");
  const data = await db
    .collection("users")
    .findOne({ twitter_id: "1155921327577915392" });

  return res.status(200).json(data);
};

export default handler;

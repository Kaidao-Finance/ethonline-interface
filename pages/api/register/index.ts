import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../src/libs/mongodb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (session) {
    if (req.method === "POST") {
      //database connect
      const database = await clientPromise;
      const db = await database.db("ethernal");

      const { position, walletAddress } = req.body;

      if (!position || !walletAddress) {
        return res.status(400).json({
          status: 400,
          message: "the required field is not present",
        });
      }

      const joined = await db
        .collection("Users")
        .findOne({ twitter_uid: session.user.id });

      if (joined) {
        return res.status(400).json({
          status: 400,
          message: "you have already registered",
        });
      }

      const user = {
        twitter_id: session.user.id,
        twitter_name: session.user.name,
        position: {
          type: "point",
          coordinate: position,
        },
        wallet_address: walletAddress,
        nft_collections: "test",
        profile_picture: session.user.image,
        isOnline: false,
      };

      const join = await db.collection("join_logs").insertOne(user);

      if (!join) {
        res.status(500).json({ message: "internal server error , fuck you" });
      } else {
        //change to true to test register page
        res.status(200).json(join);
      }
    }
  } else {
    res.status(401).json({ message: "unauthorized" });
  }
};

export default handler;

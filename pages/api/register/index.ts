import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { getNFTCollection } from "../../../src/utils/getNFTCollection";

import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../src/libs/mongodb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (session) {
    if (req.method === "POST") {
      //database connect
      const database = await clientPromise;
      const db = await database.db("ethernal");

      const body = JSON.parse(req.body);

      const {
        position,
        walletAddress,
        description,
        displayName,
        tags,
        nft_collections,
      } = body;

      if (!position || !description || !displayName) {
        return res.status(400).json({
          status: 400,
          message: "the required field is not present",
        });
      }

      const joined = await db
        .collection("users")
        .findOne({ twitter_id: session.user.id });

      if (joined) {
        return res.status(400).json({
          status: 400,
          message: "you have already registered",
        });
      }

      /**
       *
       * Find collection
       */

      const user = {
        twitter_id: session.user.id,
        display_name: displayName,
        description: description,
        position: {
          type: "point",
          coordinate: position,
        },
        wallet_address: walletAddress ? walletAddress : null,
        nft_collections: walletAddress ? nft_collections : [],
        profile_picture: session.user.image,
        isOnline: false,
        tags: tags,
      };

      const join = await db.collection("users").insertOne(user);

      if (!join) {
        res.status(500).json({ message: "internal server error , fuck you" });
      } else {
        res.status(200).json(join);
      }
    } else {
      res.status(401).json({ message: "unauthorized" });
    }
  }
};

export default handler;

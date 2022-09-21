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

      const { position, walletAddress } = body;

      if (!position || !walletAddress) {
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

      const collection = await getNFTCollection(walletAddress);
      const collections_only = collection.ownedNfts.map((n) => {
        return n.contract.address;
      });

      const collections = collection.ownedNfts.map((n) => {
        return {
          address: n.contract.address,
          tokenId: n.tokenId,
          tokenType: n.tokenType,
          name: n.title,
          metadata: n.rawMetadata,
          image: n.rawMetadata?.image,
        };
      });

      const collection_filltered = collections_only.filter((c, index) => {
        return collections_only.indexOf(c) === index;
      });

      let data = [];
      for (let i = 0; i < collection_filltered.length; i++) {
        let NFTs = [];
        for (let j = 0; j < collections.length; j++) {
          if (collection_filltered[i] === collections[j].address) {
            NFTs.push(collections[j]);
          }
        }
        data.push({ address: collection_filltered[i], NFTs });
      }

      const user = {
        twitter_id: session.user.id,
        twitter_name: session.user.name,
        position: {
          type: "point",
          coordinate: position,
        },
        wallet_address: walletAddress,
        nft_collections: data,
        profile_picture: session.user.image,
        isOnline: false,
      };

      const join = await db.collection("users").insertOne(user);

      if (!join) {
        res.status(500).json({ message: "internal server error , fuck you" });
      } else {
        res.status(200).json(join);
      }
    }
  } else {
    res.status(401).json({ message: "unauthorized" });
  }
};

export default handler;

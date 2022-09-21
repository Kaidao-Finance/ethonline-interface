import type { NextApiRequest, NextApiResponse } from "next";
import { getNFTCollection } from "../../../src/utils/getNFTCollection";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const address = "unnawut.eth";
  const collection = await getNFTCollection(address);
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

  return res.status(200).json(collection);
};

export default handler;

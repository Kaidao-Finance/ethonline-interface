import { Alchemy } from "alchemy-sdk";
const alchemy = new Alchemy();

export const getNFTCollection = async (address: string) => {
  const nfts = await alchemy.nft.getNftsForOwner(address);

  return nfts;
};

import { Alchemy } from "alchemy-sdk";
const alchemy = new Alchemy();

export const getNFTCollection = async (address: string) => {
  const collection = await alchemy.nft.getNftsForOwner("unnawut.eth");

  let data: any[] = [];

  const collections_only = collection.ownedNfts.map((n: any) => {
    return n.contract.address;
  });

  const collections = collection.ownedNfts.map((n: any) => {
    return {
      address: n.contract.address,
      tokenId: n.tokenId,
      tokenType: n.tokenType,
      name: n.title,
      metadata: n.rawMetadata,
      image: n.rawMetadata?.image,
    };
  });

  const collection_filltered = collections_only.filter(
    (c: any, index: number) => {
      return collections_only.indexOf(c) === index;
    }
  );

  for (let i = 0; i < collection_filltered.length; i++) {
    let NFTs: any[] = [];

    for (let j = 0; j < collections.length; j++) {
      if (collection_filltered[i] === collections[j].address) {
        NFTs = [...NFTs, collections[j]];
      }
    }

    data = [...data, { address: collection_filltered[i], NFTs }];
  }

  const collectionWithName = await Promise.all(
    data.map(async (collection) => {
      const resp = await fetch(
        `https://api.opensea.io/api/v1/asset_contract/${collection.address}`
      );
      const data = await resp.json();

      const collectionImage = data.collection.featured_image_url;
      const collectionName = data.collection.name;
      const temp = {
        address: collection.address,
        image: collectionImage,
        name: collectionName,
        NFTs: collection.NFTs,
      };
      return temp;
    })
  );

  return collectionWithName;
};

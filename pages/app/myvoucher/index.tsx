import Layout from "../../../src/components/Layout";
import MenuHeader from "../../../src/components/MenuHeader";

import { Box, SimpleGrid, Image, Button, Text, Center } from "@chakra-ui/react";
import { useState, useEffect } from "react";

import { Alchemy, Network } from "alchemy-sdk";
import { useRouter } from "next/router";
const settings = {
  network: Network.MATIC_MUMBAI,
};
const alchemy = new Alchemy(settings);

const MyVoucher = () => {
  const router = useRouter();
  const [profile, setProfile] = useState<any>([]);
  const [vouchers, setVoucher] = useState<any>([]);
  const [sysvoc, setSysVoc] = useState<any>([]);

  const getProfileData = async () => {
    const res = await fetch("/api/profile");
    const data = await res.json();
    setProfile(data);
  };

  useEffect(() => {
    getProfileData();
  }, []);

  const getVoucherData = async (address: any) => {
    const vouchers = await alchemy.nft.getNftsForOwner(address);
    const data = vouchers.ownedNfts.filter(
      (item: any) => (item.title = "Ethernal Voucher")
    );

    setVoucher(data);
  };

  useEffect(() => {
    if (profile.wallet_address != null) {
      getVoucherData(profile.wallet_address);
    }
  }, [profile]);

  const getVocSys = async () => {
    const res = await fetch("/api/vouchers");
    const data = await res.json();
    setSysVoc(data);
  };

  useEffect(() => {
    getVocSys();
  }, []);

  const getNFTName = (address: any) => {
    const data: any = sysvoc.find((item: any) => item.Address === address);
    if (data) {
      return data.Name;
    } else {
      return "Some NFT";
    }
  };

  const getAddressNFT = (address: any) => {
    const data: any = sysvoc.find((item: any) => item.Address === address);
    if (data) {
      return data.Address;
    } else {
      return "0x0";
    }
  };

  const getType = (address: any) => {
    const data: any = sysvoc.find((item: any) => item.Address === address);
    if (data) {
      return data.Type;
    } else {
      return "0x0";
    }
  };

  const handleViewVoucher = (name: string, address: any, type: any) => {
    router.push(`/app/myvoucher/name/${name}?address=${address}&type=${type}`);
  };

  return (
    <>
      <Layout title="Ethernal | My Voucher">
        <MenuHeader title={"My Voucher"} />
        <Box textAlign="left"></Box>
        {vouchers.length === 0 && (
          <>
            <Text>Voucher Not Found</Text>
          </>
        )}

        <SimpleGrid columns={1}>
          <Box pt={10}>
            <Box>
              <SimpleGrid minChildWidth="150px" spacing="20px">
                {vouchers &&
                  vouchers.map((i: any) => {
                    return (
                      <>
                        <Box
                          bg="#f5f5f5"
                          p={5}
                          borderRadius={15}
                          key={i.contract.address}
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            handleViewVoucher(
                              getNFTName(i.contract.address),
                              getAddressNFT(i.contract.address),
                              getType(i.contract.address)
                            );
                          }}
                        >
                          <Image
                            borderRadius={10}
                            src={i.rawMetadata.image}
                            alt={"voucher"}
                          />
                          <Box textAlign="right" mt={2}>
                            <Center>
                              <Text fontWeight="bold">
                                {getNFTName(i.contract.address)}
                              </Text>
                            </Center>
                          </Box>
                        </Box>
                      </>
                    );
                  })}
              </SimpleGrid>
            </Box>
          </Box>
        </SimpleGrid>
      </Layout>
    </>
  );
};

export default MyVoucher;

import { NextPage } from "next";
import Layout from "../../../../src/components/Layout";
import MenuHeader from "../../../../src/components/MenuHeader";

import { useState, useEffect } from "react";
import { Alchemy, Network } from "alchemy-sdk";
import { useRouter } from "next/router";

import { Box, Image, Center, Text, Button } from "@chakra-ui/react";

const settings = {
  network: Network.MATIC_MUMBAI,
};
const alchemy = new Alchemy(settings);

const ProfilePage: NextPage = () => {
  const router = useRouter();
  const { address, name, type } = router.query;

  const [profile, setProfile] = useState<any>([]);
  const [vouchers, setVoucher] = useState<any>([]);

  const getProfileData = async () => {
    const res = await fetch("/api/profile");
    const data = await res.json();
    setProfile(data);
  };

  useEffect(() => {
    getProfileData();
  }, []);

  const getVoucherData = async (a: any) => {
    const vouchers = await alchemy.nft.getNftsForOwner(a);
    const data = vouchers.ownedNfts.filter(
      (item: any) => item.contract.address == address
    );

    setVoucher(data);
  };

  useEffect(() => {
    if (profile.wallet_address != null && address) {
      getVoucherData(profile.wallet_address);
    }
  }, [profile]);

  useEffect(() => {
    console.log(vouchers);
  }, [vouchers]);

  const handleRedeem = async () => {
    if (type === "Free-Mint") {
      await redeemFreeMint();
    } else if (type === "TokenGated") {
      await redeemTokenGated();
    }
  };

  const redeemFreeMint = async () => {
    const res = await fetch(
      "https://ethernal-api.kmuttchain.tech/redeem/" +
        name +
        "/" +
        profile.wallet_address,
      {
        method: "POST",
      }
    );
    const data = await res.json();
    console.log(data);
    alert(data);
  };

  const redeemTokenGated = async () => {
    const res = await fetch(
      "https://ethernal-api.kmuttchain.tech/redeem/" +
        name +
        "/" +
        profile.wallet_address +
        "/" +
        address,
      {
        method: "POST",
      }
    );
    const data = await res.json();
    console.log(data);
    alert(JSON.stringify(data));
  };

  return (
    <>
      <Layout title="Ethernal | View Voucher">
        <MenuHeader
          title="View Voucher"
          descritpion="View your voucher and Redeem"
        />
        {vouchers[0] && (
          <>
            <Box bg="#f5f5f5" p={5} width="100%" borderRadius={15}>
              <Text
                mb={5}
                fontSize={20}
                color="primary.0"
                fontWeight="bold"
                textAlign="center"
              >
                {name}
              </Text>
              <Center>
                <Image
                  width={300}
                  borderRadius={10}
                  src={vouchers[0].rawMetadata.image}
                  alt={"voucher"}
                />
              </Center>
              <Center>
                <Box mt={3}>
                  <Button
                    bg="primary.0"
                    color="#fff"
                    _hover={{ bg: "primary.100" }}
                    onClick={() => {
                      handleRedeem();
                    }}
                  >
                    Redeem
                  </Button>
                </Box>
              </Center>
            </Box>
          </>
        )}
      </Layout>
    </>
  );
};

export default ProfilePage;

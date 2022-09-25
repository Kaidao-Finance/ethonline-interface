import { Box, Text, Image, Badge, Spinner, Button } from "@chakra-ui/react";
import axios from "axios";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useAccount } from "wagmi";
import Layout from "../../../src/components/Layout";
import MenuHeader from "../../../src/components/MenuHeader";
import ProfileCard from "../../../src/components/ProfileCard";
import TokenGatedVoucherABI from "../../../src/abi/TokengatedVoucherABI.json";
import VoucherABI from "../../../src/abi/VoucherABI.json";
import { getNFTCollection } from "../../../src/utils/getNFTCollection";

const VoucherName = () => {
  const [user, setUser] = useState<any>();
  const [voucher, setVoucher] = useState<any>();
  const [eligible, setEligible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoading2, setIsLoading2] = useState<boolean>(false);
  const [isMint, setIsMint] = useState<boolean>(false);
  const router = useRouter();
  const { name } = router.query;
  const { address } = useAccount();

  useEffect(() => {
    if (!voucher) return;

    if (!name) return;

    if (!voucher[0]) return;

    if (!user) return;

    if (voucher[0].Type == "Free-Mint") {
      setEligible(true);
      return;
    } else if (voucher[0].Type == "TokenGated") {
      // if(voucher[0].TokenGateAddress == )
      getNFTCollection(user.wallet_address).then((data) => {
        if (data.length == 0) {
          setEligible(false);
          return;
        }
        const temp = data.map((nft) => nft.address);
        setEligible(temp.includes(voucher[0].Address.toLowerCase()));
      });
    }
  }, [voucher, name, user]);

  useEffect(() => {
    if (!name) return;

    setIsLoading(true);
    setIsLoading2(true);
    fetch("/api/user").then((resp) =>
      resp.json().then((data) => {
        setUser(data);
        setIsLoading(false);
      })
    );

    fetch("/api/vouchers").then((resp) =>
      resp.json().then((data) => {
        const temp = data.filter(
          (voucher: any) =>
            voucher.Name.toLowerCase() == (name as string).toLowerCase()
        );
        setVoucher(temp);
        setIsLoading2(false);
      })
    );
  }, [name]);

  const handleMintVoucher = () => {
    setIsMint(true);
    axios
      .post(
        `https://ethernal-api.kmuttchain.tech/mint/${name}/${user.wallet_address}`
      )
      .then((data) => {
        alert(`success tx hash = ${JSON.stringify(data.data)}`);
      })
      .catch((e) => {
        alert(JSON.stringify(e));
      });
  };

  if (isLoading || isLoading2) return <Spinner />;

  return (
    <>
      <Layout title={`Ethernal | ${name}`}>
        <MenuHeader title={``} />
        <Box textAlign="left">
          <Box w="full">
            {voucher && (
              <>
                <Box
                  w="full"
                  display="flex"
                  flexDir="row"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={5}
                >
                  <Box
                    fontSize="20px"
                    _hover={{ color: "primary.0" }}
                    cursor="pointer"
                    onClick={() => router.push("/app/explore-voucher")}
                  >
                    <BiArrowBack />
                  </Box>
                  <Box>
                    <Text className="h2-bold" color="primary.0">
                      {" "}
                      {voucher[0].Name}
                    </Text>
                  </Box>
                  <Box>
                    {eligible ? (
                      <Badge
                        fontSize="15px"
                        colorScheme="green"
                        variant="solid"
                      >
                        {" "}
                        eligible{" "}
                      </Badge>
                    ) : (
                      <Badge fontSize="15px" colorScheme="red" variant="solid">
                        {" "}
                        Not Eligible{" "}
                      </Badge>
                    )}
                  </Box>
                </Box>
                <Box display="flex" w="full" justifyContent="center" mb={5}>
                  <Image src="/ethernal-logo.jpg" alt="nft-image" w="300px" />
                </Box>
                <Box mb={5}>
                  <Text className="body1" mb={2}>
                    {" "}
                    Address : {voucher[0].Address}
                  </Text>
                  <Text className="body1" mb={2}>
                    {" "}
                    Description : hello world
                  </Text>
                </Box>
                <Box textAlign="center">
                  <Button
                    disabled={!eligible || !user.wallet_address || isMint}
                    onClick={handleMintVoucher}
                  >
                    {" "}
                    Mint Voucher{" "}
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Layout>
    </>
  );
};

export default VoucherName;

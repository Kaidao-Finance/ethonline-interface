import { Box, Input, Image, Text, Spinner } from "@chakra-ui/react";
import Layout from "../../src/components/Layout";
import MenuHeader from "../../src/components/MenuHeader";
import ProfileCard from "../../src/components/ProfileCard";
import { Badge } from "@chakra-ui/react";
import { FaPlay } from "react-icons/fa";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getNFTCollection } from "../../src/utils/getNFTCollection";

const ExploreVoucher = () => {
  const [user, setUser] = useState<any>();
  const [vouchers, setVouchers] = useState<any>();
  const [nfts, setNFTs] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetch("/api/user").then((resp) =>
      resp.json().then((data) => setUser(data))
    );

    fetch("/api/vouchers").then((resp) =>
      resp.json().then((data) => setVouchers(data))
    );
  }, []);

  useEffect(() => {
    if (!user) return;

    if (!vouchers) return;

    console.log(user);

    setIsLoading(true);
    getNFTCollection(user.wallet_address).then((data) => {
      if (data.length == 0) {
        setNFTs([]);
        setIsLoading(false);
        return;
      }
      const temp = data.map((nft) => nft.address);
      console.log(temp);
      setNFTs(temp);
      setIsLoading(false);
    });
  }, [user, vouchers]);

  const router = useRouter();

  if (isLoading)
    return (
      <Layout title="Ethernal | Explore Voucher">
        <MenuHeader title={"Explore Vourcher"} />
        <Box textAlign="left">
          <Spinner />
        </Box>
      </Layout>
    );
  return (
    <>
      <Layout title="Ethernal | Explore Voucher">
        <MenuHeader title={"Explore Vourcher"} />
        <Box textAlign="left">
          <Input placeholder="search" mb={5} />
          {vouchers &&
            vouchers.map((voucher: any) => {
              return (
                <>
                  <Box
                    m="20px"
                    p="20px"
                    display="flex"
                    flexDir={"row"}
                    bgColor="neutral.bg"
                    borderRadius={"16px"}
                    border={"1px solid transparent"}
                    cursor="pointer"
                    _hover={{ border: "1px solid red" }}
                    onClick={() => router.push(`/app/voucher/${voucher.Name}`)}
                  >
                    <Image
                      borderRadius={"10px"}
                      src="/ethernal-logo.jpg"
                      w="150px"
                      alt="hello world"
                    />
                    <Box
                      ml="20px"
                      p="10px"
                      w="full"
                      display="flex"
                      flexDir="column"
                      justifyContent="space-between"
                    >
                      <Box>
                        {voucher.Type == "Free-Mint" ||
                        (voucher.Type == "TokenGated" &&
                          nfts?.includes(
                            voucher.TokenGateAddress.toLowerCase()
                          )) ? (
                          <>
                            <Badge colorScheme="green" variant="solid">
                              eligible
                            </Badge>
                          </>
                        ) : (
                          <Badge colorScheme="red" variant="solid">
                            not eligible
                          </Badge>
                        )}
                      </Box>
                      <Box w="full" textAlign="center">
                        <Text className="h3-bold"> {voucher.Name} </Text>
                      </Box>
                      <Box
                        w="full"
                        display="flex"
                        alignItems="center"
                        flexDir="row"
                        justifyContent="flex-end"
                      >
                        <FaPlay />
                      </Box>
                    </Box>
                  </Box>
                </>
              );
            })}
        </Box>
      </Layout>
    </>
  );
};

export default ExploreVoucher;

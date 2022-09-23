import { Box, Input, Image, Text } from "@chakra-ui/react";
import Layout from "../../src/components/Layout";
import MenuHeader from "../../src/components/MenuHeader";
import ProfileCard from "../../src/components/ProfileCard";
import { Badge } from "@chakra-ui/react";
import { FaPlay } from "react-icons/fa";
import { useRouter } from "next/router";

const ExploreVoucher = () => {
  const router = useRouter();
  return (
    <>
      <Layout title="Ethernal | Explore Voucher">
        <MenuHeader title={"Explore Vourcher"} />
        <Box textAlign="left">
          <Input placeholder="search" mb={5} />
          <Box
            p="20px"
            display="flex"
            flexDir={"row"}
            bgColor="neutral.bg"
            borderRadius={"16px"}
            border={"1px solid transparent"}
            cursor="pointer"
            _hover={{ border: "1px solid red" }}
            onClick={() => router.push("/")}
          >
            <Image src="/ethernal-logo.jpg" w="150px" alt="hello world" />
            <Box
              p="10px"
              w="full"
              display="flex"
              flexDir="column"
              justifyContent="space-between"
            >
              <Box>
                <Badge colorScheme="green" variant="solid">
                  {" "}
                  eligible{" "}
                </Badge>
              </Box>
              <Box w="full" textAlign="center">
                <Text className="h3-bold"> Name </Text>
                <Text className="h5-bold"> Description </Text>
              </Box>
              <Box
                w="full"
                display="flex"
                alignItems="center"
                flexDir="row"
                justifyContent="space-between"
              >
                <Text> 300/500 </Text>
                <FaPlay />
              </Box>
            </Box>
          </Box>
        </Box>
      </Layout>
    </>
  );
};

export default ExploreVoucher;

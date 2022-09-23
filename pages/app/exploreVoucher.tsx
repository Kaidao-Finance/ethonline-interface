import { Box, Input, Image, Text } from "@chakra-ui/react";
import Layout from "../../src/components/Layout";
import MenuHeader from "../../src/components/MenuHeader";
import ProfileCard from "../../src/components/ProfileCard";
import { Badge } from "@chakra-ui/react";

const ExploreVoucher = () => {
  return (
    <>
      <Layout title="Ethernal | Explore Voucher">
        <MenuHeader title={"Explore Vourcher"} />
        <Box textAlign="left">
          <Input placeholder="search" />
          <Box p="20px" display="flex" flexDir={"row"} bgColor="neutral.bg">
            <Image src="/ethernal-logo.jpg" w="150px" alt="hello world" />
            <Box p="10px" w="full">
              <Badge colorScheme="green" variant="solid">
                {" "}
                eligible{" "}
              </Badge>
              <Box w="full" textAlign="center">
                <Text className="h3-bold"> Name </Text>
                <Text className="h5-bold"> Description </Text>
              </Box>
              <Text> 300/500 </Text>
            </Box>
          </Box>
        </Box>
      </Layout>
    </>
  );
};

export default ExploreVoucher;

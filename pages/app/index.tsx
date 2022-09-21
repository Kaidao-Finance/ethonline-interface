import Layout from "../../src/components/Layout";
import MenuHeader from "../../src/components/MenuHeader";
import ProfileCard from "../../src/components/ProfileCard";

import { Box } from "@chakra-ui/react";

const IAppHome = () => {
  return (
    <>
      <Layout title="Ethernal | App">
        <MenuHeader title={"Your Profile"} />
        <Box textAlign="left">
          <ProfileCard />
        </Box>
      </Layout>
    </>
  );
};

export default IAppHome;

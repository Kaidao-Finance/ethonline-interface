import { Text } from "@chakra-ui/react";
import { NextPage } from "next";
import Layout from "../src/components/Layout";
import MenuHeader from "../src/components/MenuHeader";

const ProfilePage: NextPage = () => {
  return (
    <>
      <Layout title="Ethernal | Update Profile">
        <MenuHeader title="Update Profile" />
      </Layout>
    </>
  );
};

export default ProfilePage;

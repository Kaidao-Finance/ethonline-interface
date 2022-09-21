import Layout from "../../src/components/Layout";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import MenuHeader from "../../src/components/MenuHeader";
import { Text } from "@chakra-ui/react";

const IAppHome = () => {
  const { data: session } = useSession();

  return (
    <Layout title="Ethernal | App">
      <MenuHeader title="Your Profile" descritpion="okokokokokokokokokok" />
      <div style={{ textAlign: "left" }}>
        {session && (
          <Image
            alt="profile"
            src={session.user?.image}
            width="50"
            height="50"
          />
        )}
        <br />
        <div style={{ marginTop: "15px" }}>
          {session && `Welcome: ${session.user?.name}`}
        </div>
      </div>
    </Layout>
  );
};
export default IAppHome;

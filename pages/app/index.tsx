import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import Layout from "../../src/components/Layout";
import MenuHeader from "../../src/components/MenuHeader";
import ProfileCard from "../../src/components/ProfileCard";
import RegisterForm from "../../src/components/RegisterForm";

import { Spinner, Box } from "@chakra-ui/react";

const IAppHome = () => {
  // const { data: session } = useSession();
  // const [registered, setStatus] = useState<boolean>(false);
  // const [loading, setLoading] = useState<boolean>(true);

  // const getRegisterStatus = async () => {
  //   const res = await fetch("/api/register/status");
  //   const data = await res.json();

  //   setStatus(data.status);
  //   setLoading(false);
  // };

  // useEffect(() => {
  //   getRegisterStatus();
  // }, []);

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

import type { NextPage } from "next";
import Head from "next/head";

import Navbar from "../src/components/Navbar";
import { SignInButton } from "../src/components/SignInButton";
import { Container, Box, Text, Center, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Ethernal</title>
        <link rel="icon" href="/ethernal-logo.jpg" />
        <meta name="description" content="Ethernal | Find your NFT community" />
      </Head>
      <Container maxW="6xl">
        <Navbar />

        <Box>
          <Container maxW={"3xl"} h={"auto"} textAlign="center">
            <Box>
              <Center
                pb={3}
                pt={{ base: "30px", md: 20, lg: 100, xl: 170 }}
              ></Center>
              <Center>
                <Text
                  fontSize={{ base: "3xl", md: "6xl" }}
                  lineHeight={{ base: "45px", md: "72px" }}
                >
                  <b>
                    Connect and Reward <br />
                    with <label style={{ color: "#f98e8e" }}>Ethernal</label>
                  </b>
                </Text>
              </Center>
            </Box>

            <Box mt={5}>
              <Container>
                <Text
                  mt={2}
                  color="#000000"
                  fontSize={{ base: "lg", md: "xl" }}
                >
                  <Center style={{ textAlign: "center" }}>
                    New experience of meeting people from Web 3.0
                    <br />
                    {"  Let's make it fun"}
                  </Center>
                  <Button
                    mt={5}
                    color="white"
                    _hover={{ bgColor: "primary.100" }}
                    bgColor="primary.0"
                    onClick={() => {
                      router.push("/app");
                    }}
                  >
                    {" "}
                    Get Start{" "}
                  </Button>
                </Text>
              </Container>
            </Box>
          </Container>
        </Box>
      </Container>
    </>
  );
};

export default Home;

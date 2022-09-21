import type { NextPage } from "next";
import Head from "next/head";

import Navbar from "../src/components/Navbar";
import { SignInButton } from "../src/components/SignInButton";
import { Container, Box, Text, Center } from "@chakra-ui/react";

const Home: NextPage = () => {
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
                  <b>Connect and Reward with Ethernal </b>
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
                    New experience of meeting people from Web 3.0.
                    <br />
                    {"  Let's make it fun"}
                  </Center>
                </Text>
              </Container>
            </Box>
            <SignInButton />
          </Container>
        </Box>
      </Container>
    </>
  );
};

export default Home;

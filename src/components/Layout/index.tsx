import Navbar from "../Navbar";
import MainMenu from "../MainMenu";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { Container, Box, Text, Center } from "@chakra-ui/react";

interface LayoutProps {
  title?: string;
  children: React.ReactNode;
}

export default function Layout({ children, title }: LayoutProps) {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar />
      <Container maxW="6xl">
        <Box
          p={{ base: 5, md: 10 }}
          mt={{ base: 0, md: 5 }}
          mr={{ base: 0, md: 5 }}
          boxShadow={{ base: "none", md: "10px 10px 10px 10px #F5F5F5" }}
          borderRadius="15px"
        >
          {session ? (
            <>
              <div className="row">
                <div className="col-md-3">
                  <MainMenu />
                </div>

                <div className="col-md-9">
                  <div className="row">{children}</div>
                </div>
              </div>
            </>
          ) : (
            "Please Sign in ..."
          )}
        </Box>
        <Box pt={8}>
          <Center>
            <Text color="#999" fontSize="sm">
              copyright © 2022 Ethernal.app
            </Text>
          </Center>
        </Box>
      </Container>
    </>
  );
}

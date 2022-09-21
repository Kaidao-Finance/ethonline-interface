import Navbar from "../Navbar";
import MainMenu from "../MainMenu";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { Container, Box } from "@chakra-ui/react";
import Footer from "../Footer";
import PleaseSignIn from "../PleaseSignIn";
import { RegisterContextProvider } from "../../contexts/RegisterContext";

interface LayoutProps {
  title?: string;
  register?: boolean;
  children: React.ReactNode;
}

export default function Layout({ children, title, register }: LayoutProps) {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar />
      <Container maxW="4xl">
        <Box
          p={{ base: 5, md: 10 }}
          mt={{ base: 0, md: 5 }}
          mr={{ base: 0, md: 5 }}
          boxShadow={{ base: "none", md: "10px 10px 10px 10px #F5F5F5" }}
          borderRadius="15px"
        >
          {session ? (
            <>
              <RegisterContextProvider>
                <div className="row">
                  <div className="col-md-3">
                    <MainMenu />
                  </div>

                  <div className="col-md-9">
                    <div className="row">{children}</div>
                  </div>
                </div>
              </RegisterContextProvider>
            </>
          ) : (
            <PleaseSignIn />
          )}
        </Box>
        <Footer />
      </Container>
    </>
  );
}

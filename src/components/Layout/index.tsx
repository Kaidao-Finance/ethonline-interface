import Navbar from "../Navbar";
import MainMenu from "../MainMenu";
import Head from "next/head";
import { useSession } from "next-auth/react";
import styled from "styled-components";

interface LayoutProps {
  title?: string;
  children: React.ReactNode;
}

const LayoutGrid = styled.div`
  display: grid;
  grid-column-gap: 1.4em;
  grid-template-rows: auto;
  grid-template-columns: 4fr 8fr;

  @media (max-width: 800px) {
    display: flex;
    flex-direction: column;
    margin-bottom: 50px;
  }
`;

export default function Layout({ children, title }: LayoutProps) {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar />
      <div className="container">
        <h1>Herculeswap</h1>
        <hr style={{ paddingBottom: 0, margin: 0 }} />
        <div style={{ marginTop: 30 }}></div>
        <LayoutGrid>
          {session ? (
            <>
              <MainMenu />
              <main>{children}</main>
            </>
          ) : (
            "Please Sign in ..."
          )}
        </LayoutGrid>
      </div>
    </>
  );
}

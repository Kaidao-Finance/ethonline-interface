import type { NextPage } from "next";
import Head from "next/head";

import styles from "../styles/Home.module.css";
import Navbar from "../src/components/Navbar";
import Roadmap from "../src/components/Roadmap";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Herculeswap</title>
        <link rel="icon" href="/logo.jpeg" />
        <meta
          name="description"
          content="Redefined NFT AMM Marketplace | Safe for investors, Created for True Creator"
        />
      </Head>
      <div className={styles.wrapper}>
        <Navbar />

        <div className="container">
          <h1>Herculeswap</h1>

          <>
            <hr style={{ paddingBottom: 0, margin: 0, marginBottom: 20 }} />
            <h3>What is Herculeswap (?)</h3>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Herculeswap is an NFT
              marketplace with Automated Market Maker (AMM), allowing users to
              trade NFT in liquidity pools. With our platform, NFT creators can
              launch their NFT collection and initiate pools for their
              collection since Day 1.
            </p>

            <h3>Our Modules</h3>
            <ul>
              <li>Launchpad ( Liquidity Locking, Vesting )</li>
              <li>Refund Modules</li>
            </ul>

            <h3>How it works </h3>
            <ul>
              <li>Collector Flowchart (Minting, Refund)</li>
              <ul
                style={{
                  marginTop: "0.5em",
                  listStyleType: "lower-alpha",
                  paddingBottom: 0,
                }}
              >
                <li style={{ marginLeft: "2em" }}>
                  Collectors can mint an NFT through herculeswap. If the
                  collection is minted out, the minting revenue will be directly
                  locked in the liquidity pool. However, if the project fails to
                  mint out, the minting fee will be returned to the collectors.
                </li>
              </ul>

              <li style={{ marginTop: "2em" }}>
                Creator Flowchart (Lock LP, Vesting)
              </li>
              <ul
                style={{
                  marginTop: "0.5em",
                  listStyleType: "lower-alpha",
                  paddingBottom: 0,
                }}
              >
                <li style={{ marginLeft: "2em" }}>
                  The NFT creators will be able to select the percentage of
                  minting revenue to provide the initial liquidity for the pool.
                  After the collection is minted out, they need to provide NFT
                  and a portion of minting revenue in the liquidity pool. The
                  creator can generate revenue from trading fees when collectors
                  trade NFT in the pool.
                </li>
              </ul>
            </ul>
          </>
          {/* <Roadmap /> */}
          <hr style={{ paddingBottom: 0, margin: 0 }} />
          <div style={{ marginTop: 30 }}></div>
        </div>
      </div>
    </>
  );
};

export default Home;

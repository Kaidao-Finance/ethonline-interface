import Head from "next/head";
import Navbar from "../src/components/Navbar";
import styles from "../styles/Home.module.css";
import { numberWithCommas } from "../utils/numberWithCommas";
import { displayAccount } from "../utils/displayAccount";

import { useState, useEffect } from "react";

const LeaderBoard = () => {
  const [recentJoin, setRecentJoin] = useState<any>([]);
  const [recentLoading, setRecentLoading] = useState(true);

  const [leaderboard, setLeaderboard] = useState<any>([]);
  const [leaderboardLoading, setLeaderboardLoading] = useState(true);

  const [count, setCount] = useState<any>(0);
  const [countLoading, setCountLoading] = useState<boolean>(true);

  const getRecentJoin = async () => {
    const response = await fetch("/api/board/recent", {
      method: "GET",
    });
    const data = await response.json();
    setRecentJoin(data);
    setRecentLoading(false);
  };

  const getLeaderBoard = async () => {
    const response = await fetch("/api/board/score", {
      method: "GET",
    });
    const data = await response.json();
    setLeaderboard(data);
    setLeaderboardLoading(false);
  };

  const getCount = async () => {
    const response = await fetch("/api/join/count", {
      method: "GET",
    });
    const data = await response.json();
    setCount(data);
    setCountLoading(false);
  };

  useEffect(() => {
    getRecentJoin();
    getLeaderBoard();
    getCount();
  }, []);

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
          <section>
            <header style={{ textAlign: "center" }}>
              <h2
                style={{ marginTop: "40px", marginBottom: "40px" }}
                id="Tables"
              >
                Total Join
              </h2>
            </header>
            <div
              style={{
                textAlign: "center",
                fontSize: "48px",
                marginBottom: "40px",
              }}
            >
              <b>{numberWithCommas(count.count ? count.count - 1 : 0)}</b>
            </div>
            <div style={{ textAlign: "center" }}>
              Creator: {numberWithCommas(count.creator ? count.creator : 0)} |
              Collector:{" "}
              {numberWithCommas(count.collector ? count.collector : 0)}
            </div>
          </section>
          <section>
            <header>
              <h2 id="Tables"> 50 Recent Joins</h2>
            </header>

            <table className={styles.leaderboard}>
              {/* <caption>20 Recent Joins</caption> */}
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Twitter Name</th>
                  <th>Join as</th>
                  <th>Invited by</th>
                </tr>
              </thead>
              <tbody>
                {recentJoin.map((p: any, i: any) => {
                  return (
                    <tr key={p._id}>
                      <th>{i + 1}</th>
                      <td>
                        {p.twitter_name + " "}
                        {/* <small>[{displayAccount(p.wallet_address)}]</small> */}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {p.join_type === 1 ? "Creator" : "Collector"}
                      </td>
                      <td>
                        {p.topline[0].twitter_name
                          ? p.topline[0].twitter_name
                          : "Herculeswap"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>

          <hr />

          {/* <section>
            <header>
              <h2 id="Tables">Leader Board</h2>
            </header>
            <table className={styles.leaderboard}>
              <caption>Point Top 10</caption>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Wallet Address</th>
                  <th>Point</th>
                  <th>Invited by</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((p: any, i: any) => {
                  return (
                    <tr key={p._id}>
                      <th>{i + 1}</th>
                      <td>
                        {p.twitter_name + " "}
                        <small>[{displayAccount(p.wallet_address)}]</small>
                      </td>
                      <td>
                        {numberWithCommas(p.score)} <small> pt</small>
                      </td>
                      <td>
                        {p.topline[0].twitter_name
                          ? p.topline[0].twitter_name
                          : "Herculeswap"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section> */}
        </div>
      </div>
    </>
  );
};

export default LeaderBoard;

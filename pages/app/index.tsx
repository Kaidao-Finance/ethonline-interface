import Layout from "../../src/components/Layout";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { StatusResponse } from "../../interfaces/StatusResponse";
import Link from "next/link";

const IAppHome = () => {
  const { data: session } = useSession();
  const [status, setStatus] = useState<StatusResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getJoinStatus = async () => {
    const response = await fetch("/api/join/status", {
      method: "GET",
    });
    const data = await response.json();
    setStatus(data);
    setLoading(false);
  };

  useEffect(() => {
    getJoinStatus();
  }, []);

  return (
    <Layout title="Herculeswap | App">
      <h1>Your Profile </h1>
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

        {!loading && (
          <>
            {status?.status ? (
              <>
                <hr style={{ padding: 0, marginTop: 20 }} />
                <div style={{ textAlign: "left" }}>
                  <p style={{ color: "white" }}>
                    Message: You have joined as a{" "}
                    <u>{status?.join_type === 1 ? "Creator" : "Collector"}</u>
                    <br />
                    <div style={{ marginTop: "10px" }}></div>
                    <b>Twitter Name:</b> {status?.twitter_name}
                    <br />
                    {/* <b>Invite Code:</b> {status?.join_code}
                    <br /> */}
                    <b>Wallet Address:</b> {status?.wallet_address}
                  </p>
                  <fieldset
                    style={{
                      border: "1px solid white",
                      color: "white",
                      padding: "10px 10px 0px 10px",
                    }}
                  >
                    <legend>Your Invite Code</legend>
                    <p style={{ textAlign: "center", fontSize: "18px" }}>
                      <b> {status?.join_code}</b>
                    </p>
                  </fieldset>
                </div>
                <div style={{ textAlign: "right", marginTop: "15px" }}>
                  <a
                    href={`https://twitter.com/intent/tweet?text=You%27re%20all%20invited%20to%20%40Herculeswap%20early%20access%0AInvite%20code%3A%20${status?.join_code}%0A%0ARegister%20at%3A%20https%3A%2F%2Fherculeswap.xyz`}
                    data-size="large"
                  >
                    <button
                      style={{ width: "150px" }}
                      className="btn btn-primary"
                    >
                      <Image
                        src="/twitter.png"
                        width="15"
                        height="15"
                        alt="twitter"
                      />
                      <div style={{ paddingLeft: "7px" }}> Tweet</div>
                    </button>
                  </a>
                </div>
              </>
            ) : (
              <>
                <div style={{ marginTop: "20px" }}></div>
                <h3>Join Early Access</h3>
                <div style={{ textAlign: "center", display: "flex" }}>
                  <Link href="/app/join/?type=creator">
                    <button className="btn btn-default">
                      Join as a Creator
                    </button>
                  </Link>
                  <Link href="/app/join/?type=collector">
                    <button className="btn btn-default">
                      Join as a Collector
                    </button>
                  </Link>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};
export default IAppHome;

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { useSession } from "next-auth/react";
import { StatusResponse } from "../../../interfaces/StatusResponse";

interface Props {
  code: string | string[] | undefined;
}

const JoinCollectorCard = ({ code }: Props) => {
  const { address } = useAccount();
  const { data: session } = useSession();
  const [inviteCode, setInviteCode] = useState<string | string[] | undefined>(
    code ? code : ""
  );
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

  const handleInviteCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInviteCode(e.target.value);
  };

  const handleJoin = () => {
    const data = {
      join_type: 2,
      twitter_uid: session?.user?.id,
      twitter_name: session?.user?.name,
      invited_code: inviteCode,
      wallet_address: address,
    };

    if (data.invited_code) {
      if (data.twitter_uid && data.wallet_address && data.twitter_name) {
        fetch("/api/join", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then((res) => {
            alert(res.message);
            window.location.reload();
          });
      } else {
        alert("Please connect your wallet or twitter account.");
      }
    } else {
      alert("Please enter an invite code.");
    }
  };

  if (!status?.status && !loading) {
    return (
      <>
        <div
          style={{
            padding: 10,
            marginBottom: 15,
            border: "1px solid white",
            color: "white",
          }}
        >
          <p
            style={{
              textAlign: "center",
              fontSize: "16px",
              padding: 0,
              margin: 0,
            }}
          >
            <b>Join as a Collector</b>
          </p>
        </div>
        <form>
          <fieldset style={{ border: "1px solid white", color: "white" }}>
            <legend>Join Form</legend>

            <div className="form-group">
              <label style={{ color: "white" }}>Twitter Account :</label>
              <input
                type="text"
                disabled
                value={session?.user?.name}
                placeholder="Twitter Account"
                style={{
                  marginTop: "10px",
                  backgroundColor: "#222225",
                  color: "white",
                  border: "1px solid white",
                }}
              />
            </div>

            <div className="form-group">
              <label style={{ color: "white" }}>Invite Code :</label>
              <input
                name="invite_code"
                type="text"
                autoFocus
                maxLength={8}
                value={inviteCode}
                placeholder="invite code"
                onChange={handleInviteCodeChange}
                style={{
                  marginTop: "10px",
                  backgroundColor: "#222225",
                  color: "white",
                  border: "1px solid white",
                }}
              />
            </div>

            <div className="form-group" style={{ overflow: "hidden" }}>
              <label htmlFor="text" style={{ color: "white" }}>
                Wallet Address :
              </label>
              {address ? (
                <>
                  <input
                    id="text"
                    name="wallet_address"
                    type="text"
                    maxLength={42}
                    disabled
                    value={address}
                    placeholder={address ? address : "Please Connect Wallet"}
                    style={{
                      backgroundColor: "#222225",
                      color: "white",
                      marginTop: "10px",
                      border: "1px solid white",
                    }}
                  />

                  <ConnectButton.Custom>
                    {({ openAccountModal, mounted }) => {
                      return (
                        <div
                          {...(!mounted && {
                            "aria-hidden": true,
                            style: {
                              opacity: 0,
                              pointerEvents: "none",
                              userSelect: "none",
                            },
                          })}
                        >
                          {(() => {
                            return (
                              <div
                                style={{
                                  display: "flex",
                                  gap: 12,
                                  justifyContent: "flex-end",
                                }}
                              >
                                <p
                                  onClick={openAccountModal}
                                  style={{
                                    paddingTop: "5px",
                                    cursor: "pointer",
                                  }}
                                >
                                  <small>Change Wallet ?</small>
                                </p>
                              </div>
                            );
                          })()}
                        </div>
                      );
                    }}
                  </ConnectButton.Custom>
                </>
              ) : (
                <ConnectButton.Custom>
                  {({ account, chain, openConnectModal, mounted }) => {
                    return (
                      <div
                        {...(!mounted && {
                          "aria-hidden": true,
                          style: {
                            opacity: 0,
                            pointerEvents: "none",
                            userSelect: "none",
                          },
                        })}
                      >
                        {(() => {
                          if (!mounted || !account || !chain) {
                            return (
                              <button
                                style={{
                                  marginTop: "10px",
                                  width: "150px",
                                  padding: "10px 0px 10px 0px",
                                  fontSize: "12px",
                                }}
                                className="btn btn-default"
                                onClick={openConnectModal}
                                type="button"
                              >
                                Connect Wallet
                              </button>
                            );
                          }
                        })()}
                      </div>
                    );
                  }}
                </ConnectButton.Custom>
              )}
            </div>

            <div className="form-group" style={{ textAlign: "right" }}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleJoin}
              >
                Join Now
              </button>
            </div>
          </fieldset>
        </form>
      </>
    );
  } else {
    return (
      <div style={{ textAlign: "left" }}>
        <p style={{ color: "white" }}>
          Message: You have joined as a{" "}
          <u>{status?.join_type === 1 ? "Creator" : "Collector"}</u>
          <br />
          <div style={{ marginTop: "10px" }}></div>
          <b>Twitter Name:</b> {status?.twitter_name}
          <br />
          <b>Your Invite Code:</b> {status?.join_code}
          <br />
          <b>Wallet Address:</b> {status?.wallet_address}
          <br />
        </p>
        {/* <fieldset
          style={{
            border: "1px solid white",
            color: "white",
            padding: "10px 10px 0px 10px",
          }}
        >
          <legend>Invite Link</legend>
          <p style={{ textAlign: "center" }}>
            {process.env.NEXT_PUBLIC_URL}
            {"join?code="}
            {status?.join_code}
          </p>
        </fieldset> */}
      </div>
    );
  }
};

export default JoinCollectorCard;

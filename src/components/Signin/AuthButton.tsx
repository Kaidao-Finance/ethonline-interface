import { useSession, signOut, signIn, getProviders } from "next-auth/react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const Button = styled.button`
  color: white;
  border-color: white;
  border-radius: 10px;
  background-color: transparent;
  box-sizing: border-box;
  text-rendering: geometricPrecision;
  border-style: solid;
  border-width: 1px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  outline: 0;
  padding: 0.55em 1.5em;
  font-size: 1em;
  font-family: inherit;

  :hover {
    color: white;
    border-color: white;
  }
`;

export const AuthButton = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [provider, setProvider] = useState<any>("");

  useEffect(() => {
    getProviders().then((prov) => {
      setProvider(prov);
    });
  }, []);

  return (
    <>
      {session ? (
        <>
          <Button
            onClick={async () => {
              await signOut({ callbackUrl: "/", redirect: false });
              router.push("/");
            }}
          >
            Sign Out
          </Button>
        </>
      ) : (
        <>
          <Button
            onClick={() => {
              signIn(provider.twitter.id);
            }}
          >
            Sign in with Twitter
          </Button>
        </>
      )}
    </>
  );
};

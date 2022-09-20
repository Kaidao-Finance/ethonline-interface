import { useSession, signOut, signIn, getProviders } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Button } from "@chakra-ui/react";

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

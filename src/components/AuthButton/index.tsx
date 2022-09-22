import { useSession, signOut, signIn, getProviders } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import { Button } from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";
import { SocketContext } from "../../contexts/SocketContext";

export const AuthButton = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [provider, setProvider] = useState<any>("");
  const { connectState, setConnectState, socket } = useContext(SocketContext);

  const [connect, setConnect] = useState(false);

  const [registered, setStatus] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const [location, setLocation] = useState<any>();

  const getRegisterStatus = async () => {
    const res = await fetch("/api/register/status");
    const data = await res.json();

    setStatus(data.status);
    setLoading(false);
  };

  useEffect(() => {
    getRegisterStatus();
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (p) {
      setLocation([p.coords.longitude, p.coords.latitude]);
    });
  }, []);

  useEffect(() => {
    if (session && location) {
      if (!loading && registered && !connectState) {
        socket.emit(
          "login",
          JSON.stringify({
            twitter_id: `${session.user.id}`,
            position: location,
          })
        );
        setConnectState(true);
        console.log("emitting login");
      }
    }
  }, [location, session, registered, loading]);

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
            bg="primary.0"
            color="white"
            _hover={{ bg: "primary.100" }}
            borderRadius="16px"
            onClick={async () => {
              await signOut({ callbackUrl: "/", redirect: false });
              router.push("/");
            }}
          >
            <FiLogOut />
          </Button>
        </>
      ) : (
        <>
          <Button
            bg="primary.0"
            color="white"
            _hover={{ bg: "#FE8C89" }}
            borderRadius="16px"
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

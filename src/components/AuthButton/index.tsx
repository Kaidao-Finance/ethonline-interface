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
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    if (!session) return;

    navigator.geolocation.getCurrentPosition(function (position) {
      setTimeout(() => {
        socket.emit(
          "login",
          JSON.stringify({
            twitter_id: `${session.user.id}`,
            position: [position.coords.longitude, position.coords.latitude],
          })
        );
        console.log("emitting event");
      }, 1500);
    });

    console.log(socket.connected ? "yes" : "kuy");
  }, [session, socket]);

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

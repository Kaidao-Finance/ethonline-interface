import { Box, Button, Input, Text, Image, useToast } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

const RegisterForm = () => {
  const [location, setLocation] = useState<any>({});
  const [isLoaing, setIsLoading] = useState(false);
  const { address } = useAccount();
  const { data: seesion } = useSession();
  const toast = useToast();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  const handleRegiser = () => {
    setIsLoading(true);
    const body = {
      position: location,
      walletAddress: address,
    };
    fetch(`/api/register`, {
      method: "POST",
      body: JSON.stringify(body),
    }).then(async (resp) => {
      if (resp.status === 200) {
        toast({
          title: "Registered.",
          description: "We've created your profile for you.",
          status: "success",
          duration: 1500,
          isClosable: true,
        });
      }

      setTimeout(() => {
        window.location.reload();
      }, 1600);
      setIsLoading(false);
    });
  };

  return (
    <>
      <Box display="flex" flexDir="column" alignItems="center">
        <Text
          style={{ alignSelf: "self-start" }}
          className="h5-bold"
          color="primary.0"
        >
          Your personal information
        </Text>
        <Image
          src={seesion?.user.image}
          alt="twitter profile"
          w="100px"
          borderRadius={"10px"}
        />
        {/* <Text className="h6-semibold">{`twitter uid: ${seesion?.user.id}`}</Text> */}
        <Text className="h6-semibold">{`twitter name: ${seesion?.user.name}`}</Text>
        <ConnectButton />
        <Box style={{ alignSelf: "self-end" }}>
          <Button
            borderRadius="12px"
            bgColor="primary.0"
            _hover={{ bgColor: "primary.100" }}
            _active={{ bgColor: "primary.100" }}
            _focus={{ border: "none" }}
            color="white"
            disabled={!address || !location}
            onClick={handleRegiser}
          >
            Register
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default RegisterForm;

import {
  Box,
  Button,
  Input,
  Text,
  Image,
  useToast,
  position,
} from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";

const RegisterForm = () => {
  const [location, setLocation] = useState<any>({});
  const [description, setDescription] = useState<string>("");
  const [displayName, setDisplayName] = useState<string>("");
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

  const handleDisplayNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayName(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleRegiser = () => {
    setIsLoading(true);
    const body = {
      position: [location.lng, location.lat],
      walletAddress: address ? address : null,
      displayName: displayName,
      description: description,
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
      <Box>
        <Text
          style={{ alignSelf: "self-start" }}
          className="h3-bold"
          color="primary.0"
        >
          Your Profile
        </Text>
        <Box
          w="full"
          display={"flex"}
          flexDir="row"
          justifyContent="space-evenly"
        >
          <Box>
            <Text>Your display name</Text>
            <Input
              placeholder={seesion?.user.name}
              onChange={handleDisplayNameChange}
              size="md"
            />

            <Text>Your description</Text>
            <Input
              placeholder={"description"}
              onChange={handleDescriptionChange}
              size="md"
            />
          </Box>

          <Box>
            <Image
              h="150px"
              src={seesion?.user.image}
              alt="twitter pfp"
              borderRadius="50%"
            />
          </Box>
        </Box>

        <Box>
          <Text className="h5-bold">
            {" "}
            Select NFT Communities you want to represent (Optional)
          </Text>
          <Text className="subtitle">
            {" "}
            (You have to connect your wallet to claim vouchers/represent your
            NFT communities)
          </Text>
          <ConnectButton />
        </Box>
        <Box style={{ alignSelf: "self-end" }}>
          <Button
            mr={5}
            borderRadius="12px"
            bgColor="primary.0"
            _hover={{ bgColor: "primary.100" }}
            _active={{ bgColor: "primary.100" }}
            _focus={{ border: "none" }}
            color="white"
            disabled={!location}
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

import { Box, Button, Input, Text } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";

const RegisterForm = () => {
  const [location, setLocation] = useState<any>({});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  return (
    <>
      <Box display="flex" flexDir="column" alignItems="center">
        <ConnectButton />
        <Text style={{ alignSelf: "self-start" }}>Your location </Text>
        <Text>Latitude: {location.lat}</Text>
        <Text>Longitude: {location.lng}</Text>
        <Box style={{ alignSelf: "self-end" }}>
          <Button> Hello world </Button>
        </Box>
      </Box>
    </>
  );
};

export default RegisterForm;

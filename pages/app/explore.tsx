import { Box, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import Layout from "../../src/components/Layout";
import MenuHeader from "../../src/components/MenuHeader";
import ProfileCard from "../../src/components/ProfileCard";
import { SocketContext } from "../../src/contexts/SocketContext";

const Explore: NextPage = () => {
  const { socket } = useContext(SocketContext);
  const [location, setLocation] = useState<any>();
  const [users, setUsers] = useState<any>();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      //   setLocation({
      //     lat: position.coords.latitude,
      //     lng: position.coords.longitude,
      //   });

      setTimeout(() => {
        socket.emit(
          "find-near",
          JSON.stringify({
            position: [position.coords.longitude, position.coords.latitude],
          })
        );
        console.log("emitting event");
      }, 1500);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("found-near", (msg) => {
      console.log(msg);
      setUsers(msg);
    });

    return () => {
      socket.off("found-near");
    };
  }, [socket]);

  return (
    <>
      <Layout title="Ethernal | App">
        <MenuHeader title={"Explore People"} />
        <Box>
          <Text className="h5-bold">
            {" "}
            Discover: Find your fellow Web 3.0 Enthusiasts{" "}
          </Text>
          <Box>
            {users &&
              users.map((item: any) => {
                return (
                  <>
                    <Box key={item._id}>
                      <Text> {item.display_name}</Text>
                      <Text> {item.description}</Text>
                      <Text> {item.wallet_address}</Text>
                    </Box>
                  </>
                );
              })}
          </Box>
        </Box>
      </Layout>
    </>
  );
};

export default Explore;

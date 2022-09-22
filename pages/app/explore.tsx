import { Box, Text, Button, Divider, Image } from "@chakra-ui/react";
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
  const [isAccept, setIsAccept] = useState<any>();

  const handleSendChatRequest = (id: any) => {
    console.log("sending chat req to", id);
    socket.emit("ask-user", id);
  };

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
      }, 1000);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("found-near", (msg) => {
      console.log(msg);
      const data = msg.filter((user: any) => {
        return user.isOnline;
      });
      setUsers(data);
    });

    socket.on("chat-request", (uid) => {
      alert(`chat request from ${uid} `);
    });

    socket.on("request-accepted", (uid) => {
      console.log(uid);
      setIsAccept(true);
    });

    socket.on("request-denied", (uid) => {
      console.log(uid);
      setIsAccept(false);
    });

    return () => {
      socket.off("found-near");
      socket.off("request-accepted");
      socket.off("request-denied");
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
          <Box pt={10}>
            {users &&
              users.map((item: any) => {
                return (
                  <>
                    <Box
                      mt={4}
                      display="flex"
                      flexDir="row"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Box display="flex" flexDir="row" alignItems="center">
                        <Image
                          src={item.profile_picture}
                          h="70px"
                          w="70px"
                          alt="pfp"
                          borderRadius="50%"
                          zIndex={10}
                        />
                        <Box
                          zIndex={0}
                          bgColor="neutral.bg"
                          borderRadius="16px"
                          ml="-20px"
                          py="10px"
                          pl="40px"
                          pr="20px"
                          display="flex"
                          flexDir="row"
                          alignItems="center"
                        >
                          <Box pr={5}>
                            <Text> {item.display_name} </Text>
                            <Text> {item.description}</Text>
                          </Box>
                          <Box height="40px">
                            <Divider
                              orientation="vertical"
                              color="red"
                              pr={5}
                            />
                          </Box>
                          <Box display="flex" flexDir="row">
                            {item.tags &&
                              item.tags.map((tag: any) => {
                                return <Text key={tag.name}> {tag.name}</Text>;
                              })}
                          </Box>
                        </Box>
                      </Box>
                      <Box>
                        <Button onClick={() => handleSendChatRequest(item._id)}>
                          connect
                        </Button>
                      </Box>
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

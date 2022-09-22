import { Box, Text, Button, Divider, Image, toast } from "@chakra-ui/react";
import { NextPage } from "next";
import { useContext, useEffect, useState, useCallback } from "react";
import Layout from "../../src/components/Layout";
import MenuHeader from "../../src/components/MenuHeader";
import ProfileCard from "../../src/components/ProfileCard";
import { SocketContext } from "../../src/contexts/SocketContext";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

const Explore: NextPage = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { socket } = useContext(SocketContext);
  const [location, setLocation] = useState<any>();
  const [users, setUsers] = useState<any>();
  const [isAccept, setIsAccept] = useState<any>();
  const [contactName, setContactName] = useState<string>("");
  const [contactUid, setContactUid] = useState<any>();

  const handleSendChatRequest = useCallback(
    (id: any) => {
      console.log("sending chat req to", id);
      socket.emit("ask-user", id);
    },
    [socket]
  );

  const handleAcceptChatRequest = useCallback(
    (id: any) => {
      console.log("accept chat req to", id);
      socket.emit("request-accepted", id);
      onClose();
    },
    [socket]
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (p) {
      setLocation([p.coords.longitude, p.coords.latitude]);
    });
  }, []);

  useEffect(() => {
    if (location && socket.connected) {
      console.log("Ready to Find");
      socket.emit(
        "find-near",
        JSON.stringify({
          position: location,
        })
      );
      console.log("Send Find");
    }
  }, [location]);

  useEffect(() => {
    if (socket.connected) {
      socket.on("found-near", (data: any) => {
        console.log("Found Receivced");
        console.log(data);
        const filterOnline = data.filter((user: any) => user.isOnline);
        setUsers(filterOnline);
      });

      return () => {
        socket.off("found-near");
      };
    }
  }, []);

  useEffect(() => {
    if (socket.connected) {
      socket.on("chat-request", ({ userId, name }) => {
        setContactName(name);
        setContactUid(userId);
        onOpen();
      });

      socket.on("request-accepted", (uid) => {
        console.log(uid);
        toast({
          title: "Chat Request Accepted",
          description: "You can start chatting now",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setIsAccept(true);
      });

      socket.on("request-denied", (uid) => {
        console.log(uid);
        setIsAccept(false);
      });

      return () => {
        socket.off("request-accepted");
        socket.off("request-denied");
      };
    }
  }, []);

  return (
    <>
      <Layout title="Ethernal | App">
        <MenuHeader title={"Explore People"} />
        <Box>
          <Text className="h5-bold">
            Discover: Find your fellow Web 3.0 Enthusiasts
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

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Chat Alert</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{contactName} want to chat to you</ModalBody>

          <ModalFooter>
            <Button
              colorScheme="orange"
              mr={3}
              onClick={() => handleAcceptChatRequest(contactUid)}
            >
              Accept
            </Button>
            <Button variant="ghost">Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Explore;

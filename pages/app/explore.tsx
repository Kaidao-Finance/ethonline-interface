import {
  Box,
  Text,
  Button,
  Divider,
  Image,
  toast,
  SimpleGrid,
  Badge,
} from "@chakra-ui/react";
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
  Center,
  ModalCloseButton,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

const Explore: NextPage = () => {
  const router = useRouter();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { socket } = useContext(SocketContext);
  const [location, setLocation] = useState<any>();
  const [users, setUsers] = useState<any>();
  const [isAccept, setIsAccept] = useState<any>();
  const [requestUid, setRequestUid] = useState<any>();
  const [contactName, setContactName] = useState<string>("");
  const [contactUid, setContactUid] = useState<any>();
  const [goChat, setGoChat] = useState<any>(false);
  const [goChatID, setGoChatId] = useState<any>();

  const handleSendChatRequest = useCallback(
    (id: any) => {
      console.log("sending chat req to", id);
      setRequestUid(id);
      socket.emit("ask-user", id);
    },
    [socket]
  );

  const handleAcceptChatRequest = useCallback(
    (id: any) => {
      console.log("accept chat req to", id);
      socket.emit("request-accepted", id);
      setGoChat(true);
      setGoChatId(id);
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

  useEffect(() => {
    if (isAccept) {
      router.push(`/app/chat?uid=${requestUid}`);
    }
  }, [isAccept]);

  useEffect(() => {
    if (goChat) {
      router.push(`/app/chat?uid=${goChatID}`);
    }
  }, [goChat]);

  return (
    <>
      <Layout title="Ethernal | App">
        <MenuHeader title={"Explore People"} />
        <Box>
          <Text className="h5-bold">
            Discover: Find your fellow Web 3.0 Enthusiasts
          </Text>
          <SimpleGrid columns={1}>
            <Box pt={10}>
              <Box>
                <SimpleGrid minChildWidth="150px" spacing="20px">
                  {users &&
                    users.map((item: any) => {
                      return (
                        <>
                          <Box>
                            <Box
                              style={{ cursor: "pointer" }}
                              bg={"#f9f9f9"}
                              h="100%"
                              borderRadius="16px"
                              onClick={() => handleSendChatRequest(item._id)}
                            >
                              <Box p={4} height="auto">
                                <Box display="flex">
                                  <Image
                                    mr={3}
                                    style={{ objectFit: "cover" }}
                                    borderRadius={50}
                                    src={item.profile_picture}
                                    alt={"ok"}
                                    h="70px"
                                    w="70px"
                                  />
                                  <Box>
                                    <Text fontSize="md" mt={2}>
                                      {item.display_name}
                                    </Text>
                                    <Text color="gray.600" fontSize="xs">
                                      {item.description}
                                    </Text>
                                    <Text>
                                      {item.tags &&
                                        item.tags.map((tag: any) => {
                                          return (
                                            <Badge
                                              mr={2}
                                              key={tag.name}
                                              colorScheme="red"
                                            >
                                              <small>{tag.name}</small>
                                            </Badge>
                                          );
                                        })}
                                    </Text>
                                  </Box>
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                        </>
                      );
                    })}
                </SimpleGrid>
              </Box>
            </Box>
          </SimpleGrid>
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

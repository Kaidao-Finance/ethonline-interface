import { Box, Text } from "@chakra-ui/react";
import Layout from "../../src/components/Layout";
import MenuHeader from "../../src/components/MenuHeader";

const Chat = () => {
  const chat = [
    { state: 1, message: "Hello, how are you?", time: "12:00" },
    { state: 2, message: "I'm fine, thank you", time: "12:01" },
    { state: 1, message: "Hello, how are you?", time: "12:00" },
    {
      state: 2,
      message: " I'm fine, thank youI'm fine, thank youI'm fine, thank you",
      time: "12:01",
    },
    { state: 1, message: "Hello, how are you?", time: "12:00" },
    { state: 2, message: "I'm fine, thank you", time: "12:01" },
    { state: 1, message: "Hello, how are you?", time: "12:00" },
    { state: 2, message: "I'm fine, thank you", time: "12:01" },
    { state: 1, message: "Hello, how are you?", time: "12:00" },
    { state: 2, message: "I'm fine, thank you", time: "12:01" },
  ];
  return (
    <>
      <Layout title="Ethernal | Chat">
        <MenuHeader title="@aomwara" descritpion="CEO of Ethernal" />
        <Box
          bg={"#fafafa"}
          borderRadius="15px"
          height="50vh"
          p={{ base: 0, md: 3 }}
          overflow={"auto"}
        >
          {chat.map((c) => {
            if (c.state == 1) {
              return (
                <>
                  <Box display="flex" justifyContent="flex-start">
                    <Text ml={3} mt={1} fontSize="xs" color="gray.500">
                      {c.time}
                    </Text>
                  </Box>
                  <Box
                    mb={2}
                    pr={4}
                    pl={4}
                    p={2}
                    ml={3}
                    maxWidth="200px"
                    borderRadius="7px"
                    bg={"#ffffff"}
                    boxShadow={{
                      base: "none",
                      md: "5px 5px 5px 5px #f7f7f7",
                    }}
                  >
                    <Text>{c.message}</Text>
                  </Box>
                </>
              );
            } else {
              return (
                <>
                  <Box width="100%" display="flex" justifyContent="flex-end">
                    <Box
                      p={2}
                      pr={4}
                      pl={4}
                      mr={3}
                      bg="primary.100"
                      color="white"
                      textAlign="right"
                      mt={3}
                      maxWidth="300px"
                      borderRadius="7px"
                      boxShadow={{
                        base: "none",
                        md: "10px 10px 10px 10px #F5F5F5",
                      }}
                    >
                      <Text>{c.message}</Text>
                    </Box>
                  </Box>
                  <Box width="100%" display="flex" justifyContent="flex-end">
                    <Text mr={3} mt={1} fontSize="xs" color="gray.500">
                      {c.time}
                    </Text>
                  </Box>
                </>
              );
            }
          })}
        </Box>
      </Layout>
    </>
  );
};

export default Chat;

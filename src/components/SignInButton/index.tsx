import { Center, Flex, Input, Button, Box, Text } from "@chakra-ui/react";

export const SignInButton = () => {
  return (
    <>
      <Box pt={10}>
        <Button
          display={{ base: "block", md: "none" }}
          mt={5}
          width="100%"
          h="50px"
          minWidth={{ base: "150px", md: "170px" }}
          bg="primary.0"
          color="white"
          _hover={{ bg: "#B28357" }}
          borderRadius="30px"
          type="button"
          fontSize={{ base: "md", md: "lg" }}
        >
          Start my page
        </Button>
      </Box>
    </>
  );
};

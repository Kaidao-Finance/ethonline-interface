import { Box, Text, Center } from "@chakra-ui/react";
const Footer = () => {
  return (
    <>
      <Box pt={8} mb={5}>
        <Center>
          <Text color="#999" fontSize="sm">
            copyright © 2022 Ethernal.app
          </Text>
        </Center>
      </Box>
    </>
  );
};

export default Footer;

import { Spinner, Center, Box, Text } from "@chakra-ui/react";

const LoadingLayout = () => {
  return (
    <>
      <Box mt={10}>
        <Center>
          <Spinner size="xl" />
        </Center>
      </Box>
    </>
  );
};

export default LoadingLayout;

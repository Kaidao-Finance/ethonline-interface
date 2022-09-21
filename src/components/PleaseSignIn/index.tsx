import { WarningTwoIcon } from "@chakra-ui/icons";
import { Center, Text } from "@chakra-ui/react";

const PleaseSignIn = () => {
  return (
    <>
      <Center>
        <WarningTwoIcon mt={10} color="primary.100" w={20} h={20} />
      </Center>
      <Center>
        <Text fontWeight="bold" fontSize="2xl" mt={5}>
          Please sign in
        </Text>
      </Center>
    </>
  );
};
export default PleaseSignIn;

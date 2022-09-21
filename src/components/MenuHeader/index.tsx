import { Text, Divider } from "@chakra-ui/react";

interface Props {
  title: string;
}

const MenuHeader = ({ title }: Props) => {
  return (
    <>
      <Text color="primary.0" fontWeight="bold" fontSize="2xl" marginBottom={7}>
        {title}
      </Text>
    </>
  );
};
export default MenuHeader;

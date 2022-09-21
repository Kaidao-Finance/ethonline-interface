import { Text, Divider } from "@chakra-ui/react";

interface Props {
  title: string;
  descritpion?: string;
}

const MenuHeader = ({ title, descritpion }: Props) => {
  return (
    <>
      <Text
        color="primary.0"
        fontWeight="bold"
        fontSize="2xl"
        marginBottom={descritpion ? 0 : 7}
      >
        {title}
      </Text>
      {descritpion && (
        <Text
          marginBottom={descritpion ? 7 : 0}
          fontSize="sm"
          color="primary.100"
        >
          {descritpion}
        </Text>
      )}
    </>
  );
};
export default MenuHeader;

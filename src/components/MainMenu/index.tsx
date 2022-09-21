import Link from "next/link";
import { SIDE_MENU } from "../../constants/AppMenu";
import { Box, Text } from "@chakra-ui/react";
import { FaAngleRight } from "react-icons/fa";
import { useRouter } from "next/router";

const MainMenu = () => {
  const router = useRouter();
  return (
    <>
      <Box
        display={{ base: "none", md: "block" }}
        style={{ borderRight: "1px solid #edf1f7", height: "100%" }}
        minH="65vh"
      >
        <Text color="primary.0" fontWeight="bold" fontSize="md">
          Main Menu
        </Text>
        <Box pt={3} pr={5}>
          {SIDE_MENU.map((item) => (
            <>
              <Link key={item.label} href={item.href}>
                <Box
                  display="flex"
                  alignItems="center"
                  color={
                    router.pathname === item.href ? "primary.0" : "gray.600"
                  }
                  style={{ cursor: "pointer" }}
                  lineHeight="30px"
                  _hover={{ color: "primary.100" }}
                >
                  <FaAngleRight />
                  <Text>{item.label}</Text>
                </Box>
              </Link>
            </>
          ))}
        </Box>
      </Box>
    </>
  );
};
export default MainMenu;

import Link from "next/link";
import { SIDE_MENU } from "../../constants/SideMenu";
import { Box, Text, Button } from "@chakra-ui/react";
const MainMenu = () => {
  return (
    <>
      <Box
        display={{ base: "none", md: "block" }}
        style={{ borderRight: "1px solid #edf1f7", height: "100%" }}
      >
        <Text color="primary.0" fontWeight="bold" fontSize="md">
          Main Menu
        </Text>
        <Box pt={3} pr={5}>
          {SIDE_MENU.map((item) => (
            <>
              <Link key={item.label} href={item.href}>
                <Button mt={2} width="100%">
                  {item.label}
                </Button>
              </Link>
            </>
          ))}
        </Box>
      </Box>
    </>
  );
};
export default MainMenu;

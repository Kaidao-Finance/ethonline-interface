import {
  Box,
  Flex,
  Text,
  IconButton,
  Stack,
  Center,
  Collapse,
  Icon,
  Link,
  Popover,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  useColorMode,
  Container,
} from "@chakra-ui/react";

import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";

import { AuthButton } from "../AuthButton";
import Image from "next/image";
import LinkNext from "next/link";
import { MENU, AUTH_MENU } from "../../constants/Menu";
import { useSession } from "next-auth/react";

import { useRouter } from "next/router";
import { SIDE_MENU } from "../../constants/SideMenu";

const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const { data: session } = useSession();

  return (
    <>
      <Container maxW="6xl">
        <Box mt={5} pl={{ base: 0, md: 0 }}>
          <Flex
            color={useColorModeValue("gray.600", "white")}
            h="70px"
            py={{ base: 4 }}
            px={{ base: 5 }}
            align={"center"}
          >
            <Flex
              flex={{ base: 1, md: "auto" }}
              ml={{ base: -2 }}
              display={{ base: "flex", md: "none" }}
            >
              <IconButton
                mb={1}
                onClick={onToggle}
                icon={
                  isOpen ? (
                    <CloseIcon color="primary.0" w={3} h={3} />
                  ) : (
                    <HamburgerIcon w={5} h={5} color="primary.0" />
                  )
                }
                variant={"ghost"}
                aria-label={"Toggle Navigation"}
              />
            </Flex>
            <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
              <Text
                textAlign={useBreakpointValue({
                  base: "center",
                  md: "left",
                })}
                fontFamily={"heading"}
                color={useColorModeValue("gray.800", "white")}
              >
                <LinkNext href="/" passHref>
                  <a>
                    <Box display={{ base: "none", md: "block" }}>
                      <Image
                        src={"/ethernal-logo.jpg"}
                        width={50}
                        height={50}
                        alt="Ehternal"
                      />
                    </Box>
                  </a>
                </LinkNext>
              </Text>

              <Flex>
                <Box mt={0} display={{ base: "none", md: "flex" }} ml={10}>
                  <DesktopNav />
                </Box>
              </Flex>
            </Flex>

            <Stack
              flex={{ base: 1, md: 0 }}
              justify={"flex-end"}
              direction={"row"}
              spacing={6}
            >
              <AuthButton />
            </Stack>
          </Flex>

          <Collapse in={isOpen} animateOpacity>
            <MobileNav />
          </Collapse>
        </Box>
      </Container>
    </>
  );
};

const DesktopNav = () => {
  const linkColor = useColorModeValue("black", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <Stack direction={"row"} spacing={10} pt={3}>
      {session ? (
        <>
          {AUTH_MENU.map((navItem) => (
            <Box
              key={navItem.label}
              style={{ cursor: "pointer" }}
              onClick={() => {
                if (navItem.href) {
                  router.push(navItem.href);
                }
              }}
            >
              <Popover trigger={"hover"} placement={"bottom-start"}>
                <Text
                  fontSize={"md"}
                  fontWeight={500}
                  color={linkColor}
                  _hover={{
                    textDecoration: "none",
                    color: linkHoverColor,
                  }}
                >
                  <b> {navItem.label}</b>
                </Text>
              </Popover>
            </Box>
          ))}
        </>
      ) : (
        <>
          {MENU.map((navItem) => (
            <Box
              key={navItem.label}
              style={{ cursor: "pointer" }}
              onClick={() => {
                if (navItem.href) {
                  router.push(navItem.href);
                }
              }}
            >
              <Popover trigger={"hover"} placement={"bottom-start"}>
                <Text
                  fontSize={"md"}
                  fontWeight={500}
                  color={linkColor}
                  _hover={{
                    textDecoration: "none",
                    color: linkHoverColor,
                  }}
                >
                  <b> {navItem.label}</b>
                </Text>
              </Popover>
            </Box>
          ))}
        </>
      )}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: any) => {
  const router = useRouter();
  return (
    <Box
      onClick={() => {
        router.push(href);
      }}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "pink.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{
            opacity: "100%",
            transform: "translateX(0)",
          }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Box>
  );
};

const MobileNav = () => {
  const { data: session } = useSession();
  return (
    <Stack p={4} display={{ md: "none" }}>
      {session ? (
        <>
          <Box display={{ base: "none", md: "block" }}>
            {AUTH_MENU.map((navItem) => (
              <MobileNavItem key={navItem.label} {...navItem} />
            ))}
          </Box>
          <Box display={{ base: "block", md: "none" }}>
            {SIDE_MENU.map((navItem) => (
              <MobileNavItem key={navItem.label} {...navItem} />
            ))}
          </Box>
        </>
      ) : (
        <>
          {MENU.map((navItem) => (
            <MobileNavItem key={navItem.label} {...navItem} />
          ))}
        </>
      )}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: any) => {
  const { isOpen, onToggle } = useDisclosure();
  const router = useRouter();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        pl={8}
        as={Link}
        href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Center>
          <ul>
            <Text
              fontWeight={600}
              color={useColorModeValue("gray.600", "gray.200")}
            >
              <li> {label}</li>
            </Text>
          </ul>
        </Center>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child: any) => (
              <Box
                onClick={() => {
                  router.push(child.href);
                }}
                key={child.label}
                py={2}
              >
                {child.label}
              </Box>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

export default Navbar;

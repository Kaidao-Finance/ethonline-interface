import {
  Box,
  Button,
  Input,
  Text,
  Image,
  useToast,
  Center,
  FormControl,
  FormLabel,
  Textarea,
  Spinner,
  SimpleGrid,
  Container,
  Divider,
} from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { getNFTCollection } from "../../utils/getNFTCollection";

const RegisterForm = () => {
  const [location, setLocation] = useState<any>({});
  const [selectCollection, setSelectCollection] = useState<any>([]);
  const [description, setDescription] = useState<string>("");
  const [isLoading2, setIsLoading2] = useState(false);
  const [displayName, setDisplayName] = useState<string>("");
  const [isLoaing, setIsLoading] = useState(false);
  const [nfts, setNfts] = useState<any>();
  const { address } = useAccount();
  const { data: session } = useSession();
  const toast = useToast();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  useEffect(() => {
    if (!address) return;
    setIsLoading2(true);
    getNFTCollection(address).then((data) => {
      setIsLoading2(false);
      setNfts(data);
    });
  }, [address]);

  const handleDisplayNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayName(e.target.value);
  };

  const handleDescriptionChange = (e: any) => {
    setDescription(e.target.value);
  };

  const handleRegiser = () => {
    setIsLoading(true);
    const body = {
      position: [location.lng, location.lat],
      walletAddress: address ? address : null,
      displayName: displayName,
      description: description,
      tags: selectCollection,
      nft_collections: nfts,
    };
    fetch(`/api/register`, {
      method: "POST",
      body: JSON.stringify(body),
    }).then(async (resp) => {
      if (resp.status === 200) {
        toast({
          title: "Registered.",
          description: "We've created your profile for you.",
          status: "success",
          duration: 1500,
          isClosable: true,
        });
      }

      setTimeout(() => {
        window.location.reload();
      }, 1600);
      setIsLoading(false);
    });
  };

  const handleSelectImage = (nft: any) => {
    if (selectCollection.includes(nft)) {
      setSelectCollection(selectCollection.filter((item: any) => item !== nft));
    } else {
      setSelectCollection([...selectCollection, nft]);
    }
  };

  const isSelected = (c: any) => {
    const data = selectCollection.find(
      (item: any) => item.address === c.address
    );

    return data ? true : false;
  };

  return (
    <>
      <Container maxW="2xl">
        <Center>
          <Box>
            <Image
              h="80px"
              src={session?.user.image}
              alt="twitter pfp"
              borderRadius="50%"
            />
          </Box>
        </Center>
        <Center>
          <Text mt={2} mb={4}>
            {session?.user.name}
          </Text>
        </Center>

        <Box>
          <FormControl>
            <FormLabel>
              <Text className="h5-bold">Display Name:</Text>
            </FormLabel>
            <Input
              value={displayName}
              placeholder={session?.user.name}
              onChange={handleDisplayNameChange}
            />
          </FormControl>
        </Box>

        <Box mt={3}>
          <FormControl>
            <FormLabel>
              <Text className="h5-bold">Your Description:</Text>
            </FormLabel>
            <Textarea
              maxLength={50}
              placeholder={"description"}
              value={description}
              onChange={handleDescriptionChange}
            />
          </FormControl>
          <Box mt={2} textAlign="right">
            <Text fontSize="xs" color="gray.500">
              Max 50 Characters
            </Text>
          </Box>
        </Box>
      </Container>
      <Container maxW="2xl">
        <Box>
          <Box>
            <Text className="h5-bold" mt={3}>
              Select NFT Communities you want to represent{" "}
              <small>(Optional)</small>
            </Text>
            <Text className="subtitle" mt={2}>
              (You have to connect your wallet to claim vouchers/represent your
              NFT communities)
            </Text>
            {address ? (
              <>
                <Input
                  name="wallet_address"
                  type="text"
                  maxLength={42}
                  disabled
                  value={address}
                  placeholder={address ? address : "Please Connect Wallet"}
                  style={{
                    marginTop: "10px",
                  }}
                />

                <ConnectButton.Custom>
                  {({ openAccountModal, mounted }) => {
                    return (
                      <div
                        {...(!mounted && {
                          "aria-hidden": true,
                          style: {
                            opacity: 0,
                            pointerEvents: "none",
                            userSelect: "none",
                          },
                        })}
                      >
                        {(() => {
                          return (
                            <div
                              style={{
                                display: "flex",
                                gap: 12,
                                justifyContent: "flex-end",
                              }}
                            >
                              <p
                                onClick={openAccountModal}
                                style={{
                                  paddingTop: "5px",
                                  cursor: "pointer",
                                }}
                              >
                                <small>Change Wallet ?</small>
                              </p>
                            </div>
                          );
                        })()}
                      </div>
                    );
                  }}
                </ConnectButton.Custom>
              </>
            ) : (
              <ConnectButton.Custom>
                {({ account, chain, openConnectModal, mounted }) => {
                  return (
                    <div
                      {...(!mounted && {
                        "aria-hidden": true,
                        style: {
                          opacity: 0,
                          pointerEvents: "none",
                          userSelect: "none",
                        },
                      })}
                    >
                      {(() => {
                        if (!mounted || !account || !chain) {
                          return (
                            <Button
                              style={{
                                marginTop: "10px",
                                width: "100%",
                                padding: "10px 0px 10px 0px",
                                fontSize: "12px",
                              }}
                              onClick={openConnectModal}
                              type="button"
                            >
                              Connect Wallet
                            </Button>
                          );
                        }
                      })()}
                    </div>
                  );
                }}
              </ConnectButton.Custom>
            )}
          </Box>

          <Box>
            {isLoading2 && <Spinner />}
            <SimpleGrid columns={1}>
              {address && nfts && (
                <>
                  <Box mt={3} width="100%">
                    <SimpleGrid minChildWidth="150px" spacing="20px">
                      {nfts?.map((c: any) => {
                        return (
                          <Box
                            key={c.address}
                            style={{ cursor: "pointer" }}
                            onClick={() => handleSelectImage(c)}
                            boxShadow={
                              isSelected(c) ? "0px 0px 3px #f98e8e" : "none"
                            }
                            h="100%"
                            border={
                              isSelected(c)
                                ? "1px solid #f85756"
                                : "1px #f5f5f5 solid"
                            }
                            borderRadius="16px"
                          >
                            <Center>
                              <Box pt={4} pr={4} pl={4} height="auto">
                                <Center>
                                  <Image
                                    style={{ objectFit: "cover" }}
                                    borderRadius={10}
                                    src={c.image ? c.image : c.NFTs[0].image}
                                    alt={c.name}
                                    h="100px"
                                    w="100px"
                                  />
                                </Center>

                                <Center>
                                  <Text fontSize="xs" mt={3} mb={2}>
                                    {c.name}
                                  </Text>
                                </Center>
                              </Box>
                            </Center>
                          </Box>
                        );
                      })}
                    </SimpleGrid>
                  </Box>
                </>
              )}
            </SimpleGrid>
          </Box>

          <Box style={{ alignSelf: "self-end" }} mt={5} textAlign="center">
            <Divider />
            <Button
              mt={2}
              w="100%"
              mr={5}
              borderRadius="12px"
              bgColor="primary.0"
              _hover={{ bgColor: "primary.100" }}
              _active={{ bgColor: "primary.100" }}
              _focus={{ border: "none" }}
              color="white"
              disabled={!location}
              onClick={handleRegiser}
            >
              Register
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default RegisterForm;

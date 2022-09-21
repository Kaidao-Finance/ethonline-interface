import { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Image,
  SimpleGrid,
  Center,
  Text,
} from "@chakra-ui/react";

const EditProfileForm = () => {
  const [profile, setProfile] = useState<any>();
  const [loading, setLoading] = useState(true);

  const [displayName, setDisplayName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [nftCollection, setNftCollection] = useState<any>();

  const [selectCollection, setSelectCollection] = useState<any>();

  const isSelected = (c: any) => {
    const data = selectCollection.find(
      (item: any) => item.address === c.address
    );

    return data ? true : false;
  };

  const handleSelectImage = (nft: any) => {
    const data = selectCollection.find(
      (item: any) => item.address === nft.address
    );

    if (data) {
      setSelectCollection(
        selectCollection.filter((item: any) => item.address !== nft.address)
      );
    } else {
      if (selectCollection.includes(nft)) {
        setSelectCollection(
          selectCollection.filter((item: any) => item.address !== nft.address)
        );
      } else {
        setSelectCollection([...selectCollection, nft]);
      }
    }
  };

  const getProfileData = async () => {
    const res = await fetch("/api/profile");
    const data = await res.json();
    setDisplayName(data.display_name);
    setDescription(data.description);
    setNftCollection(data.nft_collections);
    setSelectCollection(data.tags);
    setProfile(data);
    setLoading(false);
  };

  useEffect(() => {
    getProfileData();
  }, []);

  return (
    <>
      <Center>
        <Box>
          <Image
            h="80px"
            src={profile?.profile_picture}
            alt="twitter pfp"
            borderRadius="50%"
          />
        </Box>
      </Center>
      <Center>
        <Text mt={2} mb={4}>
          {profile?.display_name}
        </Text>
      </Center>

      <Box>
        <FormControl>
          <FormLabel>Display Name: </FormLabel>
          <Input placeholder="Display name" value={displayName} />
        </FormControl>
      </Box>

      <Box mt={3}>
        <FormControl>
          <FormLabel>Your Description: </FormLabel>
          <Textarea placeholder="About you" value={description} />
        </FormControl>
      </Box>

      <Box mt={3}>
        <SimpleGrid minChildWidth="150px" spacing="20px">
          {nftCollection?.map((c: any) => {
            return (
              <Box
                key={c.address}
                style={{ cursor: "pointer" }}
                onClick={() => handleSelectImage(c)}
                boxShadow={isSelected(c) ? "0px 0px 3px #f98e8e" : "none"}
                h="100%"
                border={
                  isSelected(c) ? "1px solid #f85756" : "1px #f5f5f5 solid"
                }
                borderRadius="16px"
              >
                <Box pt={4} pr={4} pl={4} height="80px">
                  <Text fontWeight="bold" fontSize="lg"></Text>
                  <Text fontSize="xs" mt={3}>
                    {c.name}
                  </Text>
                </Box>
              </Box>
            );
          })}
        </SimpleGrid>
      </Box>
    </>
  );
};

export default EditProfileForm;

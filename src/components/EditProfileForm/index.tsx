import { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Image,
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

  const getProfileData = async () => {
    const res = await fetch("/api/profile");
    const data = await res.json();
    setDisplayName(data.display_name);
    setDescription(data.description);
    setNftCollection(data.nft_collections);
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
    </>
  );
};

export default EditProfileForm;

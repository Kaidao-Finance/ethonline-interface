import { NextPage } from "next";
import Layout from "../../src/components/Layout";
import MenuHeader from "../../src/components/MenuHeader";
import EditProfileForm from "../../src/components/EditProfileForm";

const ProfilePage: NextPage = () => {
  return (
    <>
      <Layout title="Ethernal | Edit Profile">
        <MenuHeader
          title="Edit Profile"
          descritpion="Update your profile to connect other people"
        />
        <EditProfileForm />
      </Layout>
    </>
  );
};

export default ProfilePage;

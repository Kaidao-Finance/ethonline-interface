import Image from "next/image";
import { useSession } from "next-auth/react";

const ProfileCard = () => {
  const { data: session } = useSession();
  return (
    <>
      {session && (
        <Image alt="profile" src={session.user?.image} width="50" height="50" />
      )}
      <br />
      <div style={{ marginTop: "15px" }}>
        {session && `Welcome: ${session.user?.name}`}
      </div>
    </>
  );
};

export default ProfileCard;

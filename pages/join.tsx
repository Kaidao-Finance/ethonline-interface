import { useRouter } from "next/router";

const Join = () => {
  const router = useRouter();
  const { code } = router.query;
  if (code) {
    router.push(`/app?code=${code}`);
  }
};

export default Join;

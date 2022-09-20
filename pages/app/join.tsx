import Layout from "../../src/components/Layout";
import { useRouter } from "next/router";
import JoinCollectorCard from "../../src/components/JoinCard/JoinCollectorCard";
import JoinCreatorCard from "../../src/components/JoinCard/JoinCreatorCard";

const Join = () => {
  const router = useRouter();
  const { type, code } = router.query;
  if (type === "creator" || type === "collector") {
    return (
      <>
        <Layout title="Herculeswap | Join Early Access">
          <h1>Join Early Access </h1>

          {type === "creator" && <JoinCreatorCard code={code} />}
          {type === "collector" && <JoinCollectorCard code={code} />}
        </Layout>
      </>
    );
  } else {
    return (
      <>
        <Layout title="Herculeswap | Join Early Access">
          <h1>Join Early Access </h1>
          <h3>No type</h3>
          <button onClick={() => router.push("/app")}>Back to home</button>
        </Layout>
      </>
    );
  }
};

export default Join;

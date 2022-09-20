import Link from "next/link";
import { useRouter } from "next/router";
const MainMenu = () => {
  const router = useRouter();
  const { code } = router.query;

  const codeAppend = (type: string) => {
    if (code) {
      return `/app/join/?type=${type}&code=${code}`;
    } else {
      return `/app/join/?type=${type}`;
    }
  };

  return (
    <>
      <aside id="menu">
        <h2>Menu</h2>
        <nav>
          <ul>
            <li>
              <Link href="/app">Home</Link>
            </li>
            <li>
              <Link href="/leaderboard">Recent Join</Link>
            </li>
            <li>
              <Link href="/app">Early Access</Link>
              <ul>
                <li>
                  <Link href={codeAppend("creator")}>Join as a Creator</Link>
                </li>
                <li>
                  <Link href={codeAppend("collector")}>
                    Join as a Collector
                  </Link>
                </li>
              </ul>
            </li>
            {/* <li>
              <Link href="/app/point">Your point</Link>
            </li> */}
          </ul>
        </nav>
      </aside>
    </>
  );
};
export default MainMenu;

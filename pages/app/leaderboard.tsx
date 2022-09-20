import Layout from "../../src/components/Layout";
import styles from "../../styles/Home.module.css";

const LeaderBoard = () => {
  return (
    <>
      <Layout title="Herculeswap | Leader Board">
        <section>
          <header>
            <h2 id="Tables">Recent Joins</h2>
          </header>
          <table className={styles.leaderboard}>
            <caption>10 Recent Joins</caption>
            <thead>
              <tr>
                <th>No.</th>
                <th>Wallet Address</th>
                <th>Invited by</th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <th colSpan={4}>Totals 65,434 </th>
              </tr>
            </tfoot>
            <tbody>
              <tr>
                <th>1</th>
                <td>0xdC8861A8234143e5F2d99E5826ec8cB212d8ADE2</td>
                <td>Herculeswap</td>
              </tr>
              <tr>
                <th>2</th>
                <td>0x95e5E950cF8e5d8e81a414E4AFf544B4857a34Ab</td>
                <td>Herculeswap</td>
              </tr>
              <tr>
                <th>3</th>
                <td>0x726999dc8f2aacd85812822c06d54be934f98393</td>
                <td>0x83a3...FF31</td>
              </tr>
              <tr>
                <th>4</th>
                <td>0x83c8f28c26bf6aaca652df1dbbe0e1b56f8baba2</td>
                <td>0xdC8...ADE2</td>
              </tr>
              <tr>
                <th>5</th>
                <td>0xdC8861A8234143e5F2d99E5826ec8cB212d8ADE2</td>
                <td>Herculeswap</td>
              </tr>
              <tr>
                <th>6</th>
                <td>0x239f9Ef005D0b52399b389aFe56cD9fA82cCee2e</td>
                <td>Herculeswap</td>
              </tr>
              <tr>
                <th>7</th>
                <td>0xfE78D0Ebe002F09088564dB82a620417a4FC223e</td>
                <td>0xdC8...ADE2</td>
              </tr>
              <tr>
                <th>8</th>
                <td>0xdC8861A8234143e5F2d99E5826ec8cB212d8ADE2</td>
                <td>Herculeswap</td>
              </tr>
              <tr>
                <th>9</th>
                <td>0x239f9Ef005D0b52399b389aFe56cD9fA82cCee2e</td>
                <td>0xdC8...ADE2</td>
              </tr>
              <tr>
                <th>10</th>
                <td>0x86aC1a9d70e4bfcA6b4ca273F834cF3F3AfAd615</td>
                <td>Herculeswap</td>
              </tr>
            </tbody>
          </table>
        </section>

        <hr />

        <section>
          <header>
            <h2 id="Tables">Leader Board</h2>
          </header>
          <table className={styles.leaderboard}>
            <caption>Point Top 10</caption>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Wallet Address</th>
                <th>Point</th>
                <th>Invited by</th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <th colSpan={4}>Totals 65,434 </th>
              </tr>
            </tfoot>
            <tbody>
              <tr>
                <th>1</th>
                <td>0xdC8861A8234143e5F2d99E5826ec8cB212d8ADE2</td>
                <td>10,445 pt</td>
                <td>Herculeswap</td>
              </tr>
              <tr>
                <th>2</th>
                <td>0x95e5E950cF8e5d8e81a414E4AFf544B4857a34Ab</td>
                <td>9,422 pt</td>
                <td>Herculeswap</td>
              </tr>
              <tr>
                <th>3</th>
                <td>0x726999dc8f2aacd85812822c06d54be934f98393</td>
                <td>8,433 pt</td>
                <td>0x83a3...FF31</td>
              </tr>
              <tr>
                <th>4</th>
                <td>0x83c8f28c26bf6aaca652df1dbbe0e1b56f8baba2</td>
                <td>8,312 pt</td>
                <td>0xdC8...ADE2</td>
              </tr>
              <tr>
                <th>5</th>
                <td>0xdC8861A8234143e5F2d99E5826ec8cB212d8ADE2</td>
                <td>7,999 pt</td>
                <td>Herculeswap</td>
              </tr>
              <tr>
                <th>6</th>
                <td>0x239f9Ef005D0b52399b389aFe56cD9fA82cCee2e</td>
                <td>6,500 pt</td>
                <td>Herculeswap</td>
              </tr>
              <tr>
                <th>7</th>
                <td>0xfE78D0Ebe002F09088564dB82a620417a4FC223e</td>
                <td>6,400 pt</td>
                <td>0xdC8...ADE2</td>
              </tr>
              <tr>
                <th>8</th>
                <td>0xdC8861A8234143e5F2d99E5826ec8cB212d8ADE2</td>
                <td>6,299 pt</td>
                <td>Herculeswap</td>
              </tr>
              <tr>
                <th>9</th>
                <td>0x239f9Ef005D0b52399b389aFe56cD9fA82cCee2e</td>
                <td>5,500 pt</td>
                <td>0xdC8...ADE2</td>
              </tr>
              <tr>
                <th>10</th>
                <td>0x86aC1a9d70e4bfcA6b4ca273F834cF3F3AfAd615</td>
                <td>4,500 pt</td>
                <td>Herculeswap</td>
              </tr>
            </tbody>
          </table>
        </section>
      </Layout>
    </>
  );
};

export default LeaderBoard;

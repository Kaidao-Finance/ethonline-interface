import Layout from "../../src/components/Layout";
import { useState, useEffect } from "react";
import { numberWithCommas } from "../../utils/numberWithCommas";

const Point = () => {
  const [point, setPoint] = useState<number | 0>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const getPoint = async () => {
    const response = await fetch("/api/profile/point", {
      method: "GET",
    });
    const data = await response.json();
    setPoint(data.point);
    setLoading(false);
  };

  useEffect(() => {
    getPoint();
  }, []);

  return (
    <>
      <Layout title="Herculeswap | Your Point">
        <h1>Your Point: </h1>
        <div
          style={{
            padding: 10,

            border: "1px solid white",
            color: "white",
          }}
        >
          <p
            style={{
              textAlign: "center",
              fontSize: "20px",
              padding: 0,
              margin: 0,
              marginTop: "25px",
            }}
          >
            <p>
              <b>{numberWithCommas(point)} pt</b>
            </p>
          </p>
        </div>
      </Layout>
    </>
  );
};

export default Point;

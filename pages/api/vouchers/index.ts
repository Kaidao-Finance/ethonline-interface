import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../src/libs/mongodb";
import { ObjectId } from "mongodb";
import axios from "axios";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (session) {
    if (req.method === "GET") {
      const query = JSON.stringify({
        query: `{
                vouchers {
                    id
                    Address
                    Type
                    TokenGateAddress
                    Name
                  }
            }`,
      });

      const resp = await axios.post(
        "https://api.thegraph.com/subgraphs/name/i3acon/bacon-and-egg",
        query
      );

      const data = resp.data.data.vouchers;

      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({ status: false, message: "not found" });
      }
    }
  } else {
    res.status(401).json({ message: "unauthorized" });
  }
};

export default handler;

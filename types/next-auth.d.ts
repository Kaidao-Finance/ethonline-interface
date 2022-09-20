import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    // custome user data
    user: {
      id: string | unknown;
      name: string;
      image: string;
      sub: string | unknown;
      exp: number | unknown;
      iat: number | unknown;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    bar: number;
  }
}

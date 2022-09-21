import Layout from "../../src/components/Layout";
import MenuHeader from "../../src/components/MenuHeader";
import RegisterForm from "../../src/components/RegisterForm";
import Navbar from "../components/Navbar";
import { Container, Box } from "@chakra-ui/react";
import Head from "next/head";
import { createContext, useEffect, useState } from "react";

export const RegisterContext = createContext<any | null>(null);

export const RegisterContextProvider = ({ children }: any) => {
  const [registered, setStatus] = useState<boolean>(false);

  const getRegisterStatus = async () => {
    const res = await fetch("/api/register/status");
    const data = await res.json();

    setStatus(data.status);
  };

  useEffect(() => {
    getRegisterStatus();
  }, []);

  if (registered) {
    return (
      <RegisterContext.Provider value={{ status: registered }}>
        {children}
      </RegisterContext.Provider>
    );
  } else {
    return (
      <>
        <Head>
          <title>Register your wallet First</title>
        </Head>

        <MenuHeader title="Register your wallet" />
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <RegisterForm />
            </div>
          </div>
        </div>
      </>
    );
  }
};

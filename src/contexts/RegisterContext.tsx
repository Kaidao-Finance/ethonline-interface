import { createContext, useEffect, useState } from "react";
import RegisterLayout from "../components/RegisterLayout";

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
    return <RegisterLayout />;
  }
};

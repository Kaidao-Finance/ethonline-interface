import { createContext, useEffect, useState } from "react";
import RegisterLayout from "../components/RegisterLayout";
import LoadingLayout from "../components/LoadingLayout";

export const RegisterContext = createContext<any | null>(null);

export const RegisterContextProvider = ({ children }: any) => {
  const [registered, setStatus] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const getRegisterStatus = async () => {
    const res = await fetch("/api/register/status");
    const data = await res.json();

    setStatus(data.status);
    setLoading(false);
  };

  useEffect(() => {
    getRegisterStatus();
  }, []);

  if (loading) {
    return <LoadingLayout />;
  } else {
    if (registered) {
      return (
        <RegisterContext.Provider value={{ status: registered }}>
          {children}
        </RegisterContext.Provider>
      );
    } else {
      return (
        <RegisterContext.Provider value={{ status: registered }}>
          <RegisterLayout />
        </RegisterContext.Provider>
      );
    }
  }
};

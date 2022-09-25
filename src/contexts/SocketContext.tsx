import React, { createContext } from "react";
import { io, Socket } from "socket.io-client";

const socket = io("https://ws.ethernal.tools", {
  transports: ["websocket"],
});
export const SocketContext = createContext<{
  socket: Socket;
  connectState: boolean;
  setConnectState: any;
}>({ socket, connectState: false, setConnectState: null });

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [connectState, setConnectState] = React.useState(false);

  const value = {
    connectState,
    setConnectState,
    socket,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

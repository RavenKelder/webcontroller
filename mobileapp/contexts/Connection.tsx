import { createContext } from "react";

const Connection = createContext<ConnectionContext>({
  host: "",
  hostname: "",
});

export default Connection;

interface ConnectionContext {
  host: string;
  hostname: string;
}

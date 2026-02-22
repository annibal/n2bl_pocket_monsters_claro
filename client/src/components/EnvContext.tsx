import { createContext, useContext } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

export const EnvContext = createContext({
  apiUrl,
});

export default function useEnv() {
  const envData = useContext(EnvContext);
  return envData;
}

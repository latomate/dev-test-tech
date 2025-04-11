import { createContext, useContext } from "react";

export const UserContext = createContext<{userId: number | null, setUserId: (userId: number | null) => void}>({
  userId: null,
  setUserId: () => {},
});

export const useUserContext = () => {
  return useContext(UserContext);
};
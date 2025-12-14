import { createContext, useContext, useState, useEffect } from "react";
import { postUserAllergies } from "../services/fetchUserInfo";
import useUserContext from "./UserProvider";
const InitialUserInfoContext = createContext();

const useInitialUserInfoContext = () => {
  return useContext(InitialUserInfoContext);
};

const InitialUserInfoProvider = ({ children }) => {
  const { healthInfoController, allergyController, preferenceController } =
    useUserContext();

  const [allergies, setAllergies] = useState([]); // 알레르기

  // const allergyController = {
  //   getAllergies: () => allergies,
  //   setAllergies: setAllergies,
  //   complete: async () => {
  //     const allergiesResult = await postUserAllergies(allergies);
  //     if (!allergiesResult) {
  //       throw new Error("싫어하는 재료 설정 실패");
  //     }
  //     return true;
  //   },
  // };

  return (
    <InitialUserInfoContext.Provider
      value={{
        preferenceController,
        allergyController,
        healthInfoController,
      }}
    >
      {children}
    </InitialUserInfoContext.Provider>
  );
};

export default InitialUserInfoProvider;
export { useInitialUserInfoContext };

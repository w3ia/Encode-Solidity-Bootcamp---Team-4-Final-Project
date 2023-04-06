import React, { ReactNode, useState } from "react";
import AppContext from "./AppContext";

interface Props {
  children?: ReactNode;
}

function AppProvider({ children }: Props) {
  const [activeLink, setActiveLink] = useState("Main");
  const [votePower, setVotePower] = useState("");

  const updateActiveState = (action: React.SetStateAction<string>) => {
    setActiveLink(action);
  };

  const updateVotePowerState = (action: React.SetStateAction<string>) => {
    setVotePower(action);
  };

  const storedAppContext = {
    activeLink,
    setActiveLink: updateActiveState,
    votePower,
    setVotePower: updateVotePowerState,

  };

  return (
    <AppContext.Provider value={storedAppContext}>
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;

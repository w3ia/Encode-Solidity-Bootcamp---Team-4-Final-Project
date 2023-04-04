import React, { ReactNode, useState } from "react";
import AppContext from "./AppContext";

interface Props {
  children?: ReactNode;
}

function AppProvider({ children }: Props) {
  const [activeLink, setActiveLink] = useState("Main");

  const updateActiveState = (action: React.SetStateAction<string>) => {
    setActiveLink(action);
  };

  const storedAppContext = {
    activeLink,
    setActiveLink: updateActiveState,
  };

  return (
    <AppContext.Provider value={storedAppContext}>
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;

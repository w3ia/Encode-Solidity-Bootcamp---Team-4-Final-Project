import React from "react";

const AppContext = React.createContext({
  activeLink: "",
  setActiveLink: (action: string) => {},
  votePower: "",
  setVotePower: (action: string) => {},
});

export default AppContext;
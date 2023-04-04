import React from "react";

const AppContext = React.createContext({
  activeLink: "",
  setActiveLink: (action: string) => {},
});

export default AppContext;
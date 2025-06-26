import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { allTools } from "../assets/data.js";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [tools, setTools] = useState([]);
  const [searchQuery, setSearchQuery] = useState({});

  const fetchTools = () => {
    setTools(allTools);
  };

  useEffect(() => {
    fetchTools();
  }, []);

  const value = { allTools, setTools, navigate, searchQuery, setSearchQuery };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};

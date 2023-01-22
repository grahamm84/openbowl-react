import { useState, createContext } from "react";
import PropTypes from "prop-types";

export const SidebarContext = createContext({});

export function SidebarProvider({ children }) {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const toggleSidebar = () => {
    setSidebarToggle(!sidebarToggle);
  };

  const closeSidebar = () => {
    setSidebarToggle(false);
  };

  return (
    <SidebarContext.Provider
      value={{ sidebarToggle, toggleSidebar, closeSidebar }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

SidebarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

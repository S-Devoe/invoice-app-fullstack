import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import Sidebar from "../components/Sidebar";
import { dark, light } from "../data/Theme";
import GlobalStyles from "../styles/GlobalStyle";

const Layout = ({ children }: any) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (window.localStorage.getItem("theme") === "dark") {
      setTheme("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      window.localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      window.localStorage.setItem("theme", "light");
    }
  };

  return (
    <LayoutContainer>
      <AnimatePresence exitBeforeEnter>
        <ThemeProvider theme={theme === "light" ? light : dark}>
          <GlobalStyles />
          <Sidebar toggleTheme={toggleTheme} />
          {children}
        </ThemeProvider>
      </AnimatePresence>
    </LayoutContainer>
  );
};
export default Layout;

const LayoutContainer = styled.main`
  display: flex;
  width: 100%;
  flex-direction: column;

  @media screen and (min-width: 1000px) {
    flex-direction: unset;
    width: 100%;
  }
`;

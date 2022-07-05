import { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { themeMode } from "./Sidebar";

const ThemeToggle = ({ toggleTheme }: themeMode) => {
  const theme = useContext(ThemeContext);
  return (
    <ToggleButton onClick={toggleTheme}>
      <Image src={theme.icon.path} />
    </ToggleButton>
  );
};
export default ThemeToggle;

const ToggleButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  outline: none;
  border: none;
  margin: 0 1rem;
  padding: 1rem;
  cursor: pointer;

  &:focus {
    outline: 2px dotted #7e88c3;
    
  }
`;

const Image = styled.img`
  padding: 0.5rem;
  
`;

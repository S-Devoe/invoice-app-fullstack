import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    *,
    *::before,
    *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        transition: all .25s linear;
        font-family: 'Spartan', sans-serif;
        
    }

    html {
    /* font-size: 62.5%; */
    box-sizing: border-box;
    }


    body {
        background: ${(props: any) => props.theme.color.body.bg};
        font-family: 'Spartan', sans-serif;
        font-size: 1rem;
        transition: background .3s;
        -webkit-font-smoothing: antialiased;
        overflow-x: hidden;
        
    }
    
    a{
        text-decoration: none;
    }
`;
export default GlobalStyles;

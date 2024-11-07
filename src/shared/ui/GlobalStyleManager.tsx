import { createGlobalStyle } from "styled-components"

export default function GlobalStyleManager() {
  return <Common />
}

const Common = createGlobalStyle`
  :root {
    --color-white: rgba(255, 255, 255, 1);
    --color-black: rgba(24, 24, 24, 1);
    --color-black-secondary: rgba(24, 24, 24, 0.6);
    --color-black-hover: rgba(24, 24, 24, 0.8);
    --color-accent: linear-gradient(72.44deg, rgba(255, 184, 0, 0.8) -0.49%, rgba(242, 26, 56, 0.8) 99.51%); // TODO: update gradients to match Figma
    --color-accent-pale: linear-gradient(72.44deg, rgba(255, 184, 0, 0.2) -0.49%, rgba(242, 26, 56, 0.2) 99.51%);
    --color-background: linear-gradient(99.18deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.2) 100%);
    --color-background-action: linear-gradient(104.39deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.4) 100%);
    --color-border: rgba(255, 255, 255, 0.8);
    --color-shadow: rgba(24, 24, 24, 0.15);

    --transition-duration: 0.2s;
    --transition-function: cubic-bezier(0.4, 0, 0.2, 1);
  }

  html {
    background: var(--color-accent-pale);
  }

  body {
    width: 100%;
    height: 100%;
    margin: 0;

    color: var(--color-black);
    overflow-y: scroll;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: normal; // for Safari

    margin: 0;
  }

  p, pre {
    margin: 0;
  }

  input[type="search"]::-webkit-search-decoration,
  input[type="search"]::-webkit-search-cancel-button,
  input[type="search"]::-webkit-search-results-button,
  input[type="search"]::-webkit-search-results-decoration {
    -webkit-appearance:none;
  }
`

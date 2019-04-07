import { css, Global } from "@emotion/core"
import React from "react"
import { fonts } from "../styling/constants"
import { Calculator } from "./Calculator"

export const App = () => {
  return (
    <>
      <div css={appStyles.container}>
        <Calculator />
      </div>

      <Global styles={globalStyles} />
    </>
  )
}

const appStyles = {
  container: css`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: #212c2d;
  `
}

const globalStyles = css`
  .js-focus-visible *:focus:not(.focus-visible) {
    outline: none;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    text-decoration: inherit;
    color: inherit;
    font-family: inherit;
  }

  body {
    background-color: hsl(0, 0%, 93%);
    overflow-y: scroll;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 500;
  }

  html,
  body {
    font-family: ${fonts.normal};
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`

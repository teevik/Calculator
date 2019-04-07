import css from "@emotion/css"
import { observer } from "mobx-react-lite"
import { mediaQueries } from "../styling/constants"
import { Display } from "./Display"
import { Inputs } from "./Inputs"

export const Calculator = observer(() => {
  return (
    <div css={calculatorStyles.container}>
      <Display />
      <Inputs />
    </div>
  )
})

const calculatorStyles = {
  container: css`
    width: 100%;
    border-radius: 4px;
    overflow: hidden;
    margin: auto;

    @media ${mediaQueries.mobile} {
      max-width: calc(100% - 20px);
    }

    @media ${mediaQueries.desktop} {
      width: 300px;
    }
  `
}

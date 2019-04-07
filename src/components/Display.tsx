import css from "@emotion/css"
import { observer } from "mobx-react-lite"
import { rgba } from "polished"
import { calculatorStore } from "../stores/calculatorStore"

export const Display = observer(() => {
  const renderedExpression = calculatorStore.expression
    .map(expressionPart => expressionPart.displayValue)
    .join(" ")

  return (
    <div css={displayStyles.container}>
      <p css={displayStyles.expression}>{renderedExpression}&nbsp;</p>
      <p css={displayStyles.currentDigits}>
        {calculatorStore.currentDigitsAsNumber}
      </p>
    </div>
  )
})

const displayStyles = {
  container: css`
    background-color: #3e4c4e;
    padding: 20px;
  `,

  expression: css`
    margin-bottom: 5px;
    color: ${rgba("white", 0.7)};
    font-weight: 500;
    font-size: 14px;
    text-align: right;
  `,

  currentDigits: css`
    color: ${rgba("white", 0.7)};
    font-weight: 600;
    font-size: 22px;
    text-align: right;
  `
}

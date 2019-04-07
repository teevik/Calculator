import css from "@emotion/css"
import { action, computed, observable } from "mobx"
import { observer } from "mobx-react-lite"
import { rgba } from "polished"
import { isEmpty } from "ramda"
import { mediaQueries } from "../styling/constants"

type Operator = "addition" | "subtraction" | "multiplication" | "division"

const operatorLabels: Record<Operator, string> = {
  addition: "+",
  subtraction: "-",
  multiplication: "×",
  division: "÷"
}

const operatorEvalCharacters: Record<Operator, string> = {
  addition: "+",
  subtraction: "-",
  multiplication: "*",
  division: "/"
}

const isNegative = (number: number) => number < 0

interface ExpressionPart {
  displayValue: string
  evalValue: string
}

class OperatorExpressionPart implements ExpressionPart {
  constructor(public type: Operator) {}

  public get displayValue() {
    return operatorLabels[this.type]
  }

  public get evalValue() {
    return operatorEvalCharacters[this.type]
  }
}

class NumberExpressionPart implements ExpressionPart {
  constructor(public number: number) {}

  public get displayValue() {
    return this.number.toString()
  }

  public get evalValue() {
    return this.number.toString()
  }
}

// const useLocalStore = <T extends any>(storeClass: new () => T) => {
//   const instance = useMemo(() => new storeClass(), [])

//   return instance
// }

type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

class DigitList {
  @observable
  public digits: Digit[] = []

  @observable
  public isNegative = false

  @action
  public addDigit(digit: Digit) {
    this.digits.push(digit)
  }

  @action
  public removeDigit() {
    this.digits.pop()
  }

  @action
  public clear() {
    this.digits = []
    this.isNegative = false
  }

  @action
  public negate() {
    this.isNegative = !this.isNegative
  }

  @computed
  public get digitsAsNumber() {
    const digitsString = this.digits.join("")
    if (isEmpty(digitsString)) return 0

    const absoluteNumber = parseInt(digitsString)
    if (this.isNegative) return -absoluteNumber
    return absoluteNumber
  }

  public set digitsAsNumber(number) {
    const absoluteNumber = Math.abs(number)

    this.isNegative = isNegative(number)

    this.digits = absoluteNumber
      .toString()
      .split("")
      .map(digit => parseInt(digit) as Digit)
  }
}

class CalculatorStore {
  private finishedWithCurrentExpression = false

  private currentDigits = new DigitList()

  public addDigit(digit: Digit) {
    if (this.finishedWithCurrentExpression) {
      this.clearCurrentDigits()
      this.finishedWithCurrentExpression = false
    }

    this.currentDigits.addDigit(digit)
  }

  public removeDigit() {
    this.currentDigits.removeDigit()
  }

  public clearCurrentDigits() {
    this.currentDigits.clear()
  }

  public negateCurrentDigits() {
    this.currentDigits.negate()
  }

  @computed
  public get currentDigitsAsNumber() {
    return this.currentDigits.digitsAsNumber
  }

  @observable
  public expression: ExpressionPart[] = []

  @action
  public clearExpression() {
    this.expression = []
  }

  public clearEverything() {
    this.clearCurrentDigits()
    this.clearExpression()
  }

  private get canAddOperator() {
    return !isEmpty(this.currentDigits.digits)
  }

  @action
  private flushExpressionChanges() {
    if (!isEmpty(this.currentDigits.digits)) {
      this.expression.push(
        new NumberExpressionPart(this.currentDigits.digitsAsNumber)
      )
    }
  }

  @action
  public addOperator(operator: Operator) {
    if (!this.canAddOperator) return

    this.flushExpressionChanges()

    this.clearCurrentDigits()
    this.expression.push(new OperatorExpressionPart(operator))
    this.finishedWithCurrentExpression = false
  }

  @action
  public calculate() {
    if (!this.canAddOperator) return

    this.flushExpressionChanges()

    const evalExpression = this.expression
      .map(expressionPart => expressionPart.evalValue)
      .join(" ")

    const result: number = eval(evalExpression)
    this.currentDigits.digitsAsNumber = result

    this.clearExpression()

    this.finishedWithCurrentExpression = true
  }
}

const calculatorStore = new CalculatorStore()

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
    font-size: 16px;
    text-align: right;
  `
}

const BackspaceIcon = () => (
  <svg viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M19,15.59L17.59,17L14,13.41L10.41,17L9,15.59L12.59,12L9,8.41L10.41,7L14,10.59L17.59,7L19,8.41L15.41,12L19,15.59M22,3A2,2 0 0,1 24,5V19A2,2 0 0,1 22,21H7C6.31,21 5.77,20.64 5.41,20.11L0,12L5.41,3.88C5.77,3.35 6.31,3 7,3H22M22,5H7L2.28,12L7,19H22V5Z"
    />
  </svg>
)

const inputs = [
  { label: "CE", action: () => calculatorStore.clearCurrentDigits() },
  { label: "C", action: () => calculatorStore.clearEverything() },
  { label: <BackspaceIcon />, action: () => calculatorStore.removeDigit() },
  { label: "÷", action: () => calculatorStore.addOperator("division") },
  { label: "7", action: () => calculatorStore.addDigit(7) },
  { label: "8", action: () => calculatorStore.addDigit(8) },
  { label: "9", action: () => calculatorStore.addDigit(9) },
  { label: "×", action: () => calculatorStore.addOperator("multiplication") },
  { label: "4", action: () => calculatorStore.addDigit(4) },
  { label: "5", action: () => calculatorStore.addDigit(5) },
  { label: "6", action: () => calculatorStore.addDigit(6) },
  { label: "−", action: () => calculatorStore.addOperator("subtraction") },
  { label: "1", action: () => calculatorStore.addDigit(1) },
  { label: "2", action: () => calculatorStore.addDigit(2) },
  { label: "3", action: () => calculatorStore.addDigit(3) },
  { label: "+", action: () => calculatorStore.addOperator("addition") },
  { label: "±", action: () => calculatorStore.negateCurrentDigits() },
  { label: "0", action: () => calculatorStore.addDigit(0) },
  { label: ",", action: () => {} },
  { label: "=", action: () => calculatorStore.calculate() }
]

type InputButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export const InputButton: React.FC<InputButtonProps> = props => {
  return (
    <button {...props} css={inputButtonStyles.container}>
      <span css={inputButtonStyles.inner}>{props.children}</span>
    </button>
  )
}

const inputButtonStyles = {
  container: css`
    position: relative;
    padding-bottom: 100%;
    border: none;
    background: none;
    outline: none;
  `,

  inner: css`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${rgba("white", 0.85)};
    font-weight: 400;
    border: 3px solid #2dabbc;
    border-radius: 50%;

    transition: transform 50ms ease-in-out, background-color 100ms ease-in-out;

    &:active {
      transform: scale(0.9);
    }

    @media ${mediaQueries.mobile} {
      font-size: 6vw;

      svg {
        height: 6vw;
      }
    }

    @media ${mediaQueries.desktop} {
      font-size: 18px;

      svg {
        height: 18px;
      }

      &:hover,
      &:focus {
        background-color: #2dabbc;
      }
    }
  `
}
export const Inputs = () => {
  const renderedInputs = inputs.map((input, index) => (
    <InputButton key={index} onClick={input.action}>
      {input.label}
    </InputButton>
  ))

  return <div css={inputsStyles.container}>{renderedInputs}</div>
}

const inputsStyles = {
  container: css`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 20px;
    padding: 20px;
    background-color: #334446;
  `
}

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

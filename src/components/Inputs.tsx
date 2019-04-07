import css from "@emotion/css"
import { DigitInputModel } from "../models/DigitInputModel"
import { InputModel } from "../models/InputModel"
import { OperatorInputModel } from "../models/OperatorInputModel"
import { calculatorStore } from "../stores/calculatorStore"
import { BackspaceIcon } from "./icons/BackspaceIcon"
import { InputButton } from "./InputButton"

const inputModels: InputModel[] = [
  new InputModel("CE", () => calculatorStore.clearCurrentDigits()),
  new InputModel("C", () => calculatorStore.clearEverything()),
  new InputModel(<BackspaceIcon />, () => calculatorStore.removeDigit()),
  new OperatorInputModel("division"),
  new DigitInputModel(7),
  new DigitInputModel(8),
  new DigitInputModel(9),
  new OperatorInputModel("multiplication"),
  new DigitInputModel(4),
  new DigitInputModel(5),
  new DigitInputModel(6),
  new OperatorInputModel("subtraction"),
  new DigitInputModel(1),
  new DigitInputModel(2),
  new DigitInputModel(3),
  new OperatorInputModel("addition"),
  new InputModel("±", () => calculatorStore.negateCurrentDigits()),
  new DigitInputModel(0),
  new InputModel(",", () => {}),
  new InputModel("=", () => calculatorStore.calculate())
]

export const Inputs = () => {
  const renderedInputs = inputModels.map((inputModel, index) => (
    <InputButton key={index} model={inputModel} />
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

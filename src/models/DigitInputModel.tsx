import { calculatorStore } from "../stores/calculatorStore"
import { Digit } from "../types/Digit"
import { InputModel } from "./InputModel"

export class DigitInputModel extends InputModel {
  constructor(private digit: Digit) {
    super(digit)
  }

  public action = () => calculatorStore.addDigit(this.digit)
}

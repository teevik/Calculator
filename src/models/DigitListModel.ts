import { action, computed, observable } from "mobx"
import { isEmpty } from "ramda"
import { Digit } from "../types/Digit"

const isNegative = (number: number) => number < 0

export class DigitListModel {
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

import { action, computed, observable } from "mobx"
import { isEmpty, last } from "ramda"
import { NumberExpressionPart } from "../classes/NumberExpressionPart"
import { OperatorExpressionPart } from "../classes/OperatorExpressionPart"
import { DigitListModel } from "../models/DigitListModel"
import { Digit } from "../types/Digit"
import { ExpressionPart } from "../types/ExpressionPart"
import { Operator } from "../types/Operator"

class CalculatorStore {
  private finishedWithCurrentExpression = false

  private currentDigits = new DigitListModel()

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

  @computed
  public get currentlySettingOperator() {
    const lastExpressionPart = last(this.expression)
    if (!(lastExpressionPart instanceof OperatorExpressionPart)) return
    return lastExpressionPart.type
  }

  @action
  public clearExpression() {
    this.expression = []
  }

  public clearEverything() {
    this.clearCurrentDigits()
    this.clearExpression()
  }

  @computed
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
    if (!this.canAddOperator && !this.currentlySettingOperator) return
    if (this.currentlySettingOperator) this.expression.pop()

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

export const calculatorStore = new CalculatorStore()

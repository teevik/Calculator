import { ExpressionPart } from "../types/ExpressionPart"

export class NumberExpressionPart implements ExpressionPart {
  constructor(public number: number) {}

  public get displayValue() {
    return this.number.toString()
  }

  public get evalValue() {
    return this.number.toString()
  }
}

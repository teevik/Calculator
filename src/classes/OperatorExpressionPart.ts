import { operatorEvalCharacters } from "../constants/operatorEvalCharacters"
import { operatorLabels } from "../constants/operatorLabels"
import { ExpressionPart } from "../types/ExpressionPart"
import { Operator } from "../types/Operator"

export class OperatorExpressionPart implements ExpressionPart {
  constructor(public type: Operator) {}

  public get displayValue() {
    return operatorLabels[this.type]
  }

  public get evalValue() {
    return operatorEvalCharacters[this.type]
  }
}

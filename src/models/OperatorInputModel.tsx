import { computed } from "mobx"
import { operatorLabels } from "../constants/operatorLabels"
import { calculatorStore } from "../stores/calculatorStore"
import { Operator } from "../types/Operator"
import { InputModel } from "./InputModel"

export class OperatorInputModel extends InputModel {
  constructor(private type: Operator) {
    super(operatorLabels[type])
  }

  public action = () => calculatorStore.addOperator(this.type)
  public isMonospace = true

  @computed
  public get isActive() {
    return calculatorStore.currentlySettingOperator === this.type
  }
}

import { ReactNode } from "react"

export interface InputModel {
  isActive?: boolean
  isMonospace?: boolean
}

export class InputModel {
  constructor(public label: ReactNode, public action?: () => unknown) {}
}

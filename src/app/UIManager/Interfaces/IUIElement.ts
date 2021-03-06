import { IDependant } from "../../"

export interface IUIElement {
  elementReference: any
  dependants: Array<IDependant>
  
  AssignDependant(dep: IUIElement)
  SetStyle(prop: string, value: string)

}
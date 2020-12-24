import { Logger } from '../Logger/Logger'
import { Constants } from '../Constants'

export class Utils {
  private static instance: Utils
  private constructor() {}
  
  public static GetUtilsReference() {
    if (!Utils.instance) {
      Utils.instance = new Utils()
    }
    return Utils.instance
  }
  
  public static CreateElement(el: any): any {
    let tmp = document.createElement(el.elementName)
    tmp.setAttribute('id', el.id ?? '')
    tmp.classList.add(...el.classes)
    return tmp
  }  
  
  public static GetUIElement(str: string): any {
    return document.querySelector(str)
  }
  
  public static GetResourceList(par: any, prop: string): any {
    return par[prop]
  }
  
  public static GetElementTypeAndName(el: string) {
    return el.split('_')
  }
  
  static CheckValid(dependentId: string, propToCheck: string): boolean {
    let str = this.GBI(dependentId)[propToCheck].length
    
    return (document.querySelector(`#${dependentId}`) as HTMLElement)[propToCheck].length > 0
  }

  static CheckSum(testResults: Array<any>, scope: string): boolean {
    let filtered = testResults.filter(x => x.deepId == scope)
    let originalLength = filtered.length

    let tmp = testResults.filter(x => {
      return x.valid == true && x.deepId === scope
    })
    
    return (originalLength === tmp.length) 
  }

  public static Ability(elId: string, setting: boolean) {
    if(this.GBI(elId) === null) return
    ((this.GBI(elId)) as HTMLInputElement).disabled = !setting
  }

  public static ErrorReport(mess: string) {
    throw new Error(`ERROR: ${mess}`)
  }

  public static GBI(id: string): HTMLInputElement {
    return document.getElementById(id) as HTMLInputElement
  }
}

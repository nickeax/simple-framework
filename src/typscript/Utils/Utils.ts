import { IElementDescriptor } from '../Interfaces/IElementDescriptor'
import { Logger } from '../Logger/Logger'
export class Utils {
  private static instance: Utils
  private constructor() {}

  public static GetUtilsReference() {
    if (!Utils.instance) {
      Utils.instance = new Utils()
    }
    return Utils.instance
  }

  public static CreateElement(el: IElementDescriptor): HTMLElement {
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
    return el.split('_');
  }
}

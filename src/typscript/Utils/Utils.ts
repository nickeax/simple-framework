import { Logger } from '../Logger/Logger';
import { Constants } from '../Constants';

export class Utils {
  private static instance: Utils
  private constructor() {}
  
  public static GetUtilsReference() {
    if (!Utils.instance) {
      Utils.instance = new Utils()
    }
    return Utils.instance;
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
    return el.split('_');
  }
  
  static CheckValid(dependentId: string, propToCheck: string): boolean {
    let str = (document.querySelector(`#${dependentId}`) as HTMLInputElement)[propToCheck].length;
    console.log(str);
    
    return (document.querySelector(`#${dependentId}`) as HTMLElement)[propToCheck].length > 0;
  }

  public static ErrorReport(mess: string) {
    throw new Error(`ERROR: ${mess}`);
  }
}

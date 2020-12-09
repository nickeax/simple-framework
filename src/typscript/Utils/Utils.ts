import { IElementDescriptor } from '../Interfaces/IElementDescriptor';
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

  public static CreateElement(el: IElementDescriptor): HTMLElement {
    let tmp = document.createElement(el.elementName)
    tmp.setAttribute('id', el.id ?? '')
    tmp.classList.add(...el.classes)
    return tmp
  }

  static CreateHashKey(items: Array<string>): number {
    let count = 0;

    items.forEach(x => {
      for(let i = 0; i < x.length; i++) {
        count += x.charCodeAt(i);
      }
      console.log(`x: ${x} ${x.length} [count: ${count}]`);
      
    })

    // console.log(Constants.HASH_TABLE_SIZE % count);    

    return (count * 3) % Constants.HASH_TABLE_SIZE;
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

  public static ErrorReport(mess: string) {
    throw new Error(`ERROR: ${mess}`);
  }
}

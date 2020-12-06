import { IElementDescriptor } from "../Interfaces/IElementDescriptor";

export class Utils {
  CreateElement(el: IElementDescriptor): HTMLElement {
    let tmp = document.createElement(el.elementName);
    tmp.setAttribute('id', el.id ?? "")
    tmp.classList.add(...el.classes);
    return tmp;
  }
}
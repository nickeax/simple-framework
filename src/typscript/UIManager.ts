import { Logger } from './Logger/Logger'
import { Utils } from './Utils/Utils'
import { NODETYPE } from '../typscript/Enums/nodetype'
export class UIManager {
  dirtyCount: number = 0
  dirtyList: Array<string>
  ARE: any = null

  constructor(oe?: any) {
    this.ARE = oe // App Root Element
    this.BuildInteractionsHash(oe)
    this.dirtyList = []
  }

  BuildInteractionsHash(el?: any) {
    this.BuildHashTable(el)

    Logger.Print()
  }

  BuildHashTable(curr: Element) {
    let tmpArr = []
    if (curr.nodeName !== "#text") {
      for (let i = 0; i < curr.attributes.length; i++) {
        let tmp = curr.attributes[i].name.split('-')
        if (tmp.indexOf('dee') !== -1) {
          tmpArr.push(tmp);
        }
      }
      if (curr.hasChildNodes) {
        for (let index = 0; index < curr.childNodes.length; index++) {
          let op = (curr.childNodes[index].nextSibling);
          this.BuildHashTable((curr.childNodes.item(index) as Element))
        }
      }
    } else {
      console.log(`No tagName property: ${curr.nodeName}`);      
    }
    tmpArr.forEach(x => console.log(x));
    Logger.Print()
  }

  AddDirty(el: string): number {
    ++this.dirtyCount
    this.dirtyList.push(el)

    return this.dirtyCount
  }

  Handler() {}

  CreateHash() {}

  GetElementTypeAndName(el: string): Array<string> {
    return Utils.GetElementTypeAndName(el)
  }
}

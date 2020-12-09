import { Logger } from './Logger/Logger'
import { Utils } from './Utils/Utils'
import { NODETYPE } from '../typscript/Enums/nodetype'
import { Constants } from './Constants'
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
    if (curr.nodeName !== '#text') {
      for (let i = 0; i < curr.attributes.length; i++) {
        let currAttribute = curr.attributes[i]
        let tmp = curr.attributes[i].name.split('-')
        if (tmp.indexOf('dee') !== -1) {
          if (
            tmp.length >= Constants.MIN_ATT_LENGTH &&
            tmp.length <= Constants.MAX_ATT_LENGTH
          ) {
            let hash = this.CreateHashKey([
              tmp[tmp.length - 1],
              currAttribute.value,
            ])

            console.log(`hash: ${hash}`);
            
          }
        }
      }
      if (curr.hasChildNodes) {
        for (let index = 0; index < curr.childNodes.length; index++) {
          this.BuildHashTable(curr.childNodes.item(index) as Element)
        }
      }
    } else {
      // Later check for errors
    }
    tmpArr.forEach((x) => console.log(x))
    Logger.Print()
  }

  AddDirty(el: string): number {
    ++this.dirtyCount
    this.dirtyList.push(el)

    return this.dirtyCount
  }

  Handler() {}

  CreateHashKey(vals: Array<string>): number {
    return Utils.CreateHashKey(vals)
  }

  GetElementTypeAndName(el: string): Array<string> {
    return Utils.GetElementTypeAndName(el)
  }
}

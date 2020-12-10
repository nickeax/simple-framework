import { Logger } from './Logger/Logger';
import { Utils } from './Utils/Utils';
import { NODETYPE } from '../typscript/Enums/nodetype';
import { Constants } from './Constants';
import { DependantElement } from './Models/DependantElement';
import { HashTable } from './HashTable';
import { IHashEntry } from './Interfaces/IHashEntry'
export class UIManager {
  dirtyCount: number = 0;
  dirtyList: Array<string>;
  elements: Array<DependantElement> = [];
  hashTable: HashTable;
  ARE: any = null;

  constructor(h: HashTable, oe?: any) {
    this.hashTable = h;
    this.ARE = oe; // App Root Element
    this.BuildInteractionsHash(oe);
    this.dirtyList = [];
  }

  BuildInteractionsHash(el?: any) {
    this.BuildHashTable(el);
  }

  BuildHashTable(curr: Element) {
    let tmpScope = '';
    if (curr.nodeName !== '#text') {
      tmpScope = curr.id;
      for (let i = 0; i < curr.attributes.length; i++) {
        let currAttribute = curr.attributes[i];
        let tmp = curr.attributes[i].name.split('-');
        if (tmp.indexOf('dee') !== -1) {
          if (
            tmp.length >= Constants.MIN_ATT_LENGTH &&
            tmp.length <= Constants.MAX_ATT_LENGTH
          ) {
            this.elements.push(new DependantElement(curr.id, tmp[2]))
            this.hashTable.AddEntry(`${
              tmp[2]}`,
              <IHashEntry>{
                dependentId: curr.id,
                scope: tmpScope,
                dependeeType: tmp[2],
                dependeeId: currAttribute.value,
              })
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
  }

  ToggleState(key: string, deeId: string): string {
    let res = this.hashTable.GetEntry(key);

    for(let i = 0; i < res.length; i++) {
      if(!Utils.CheckValid(res[i].dependentId, "value")) {
        (document.querySelector(res[i].dependeeId) as HTMLInputElement).disabled = true; 
        return "Not Valid";
      }      
    }

    return "Valid";
  }

  AddDirty(el: string): number {
    ++this.dirtyCount
    this.dirtyList.push(el)

    return this.dirtyCount
  }

  Handler() {}

  GetElementTypeAndName(el: string): Array<string> {
    return Utils.GetElementTypeAndName(el)
  }
}

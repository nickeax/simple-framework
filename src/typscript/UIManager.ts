import { Logger } from './Logger/Logger'
import { Utils } from './Utils/Utils';
export class UIManager {
  dirtyCount: number = 0;
  dirtyList: Array<string>;
  ARE: any = null;

  constructor(oe?: any) {
    this.ARE = oe;
    this.BuildInteractionsHash();
    this.dirtyList = []; 
  }
  
  BuildInteractionsHash(el?: any) {
    
  }

  AddDirty(el: string): number {
    ++this.dirtyCount;
    this.dirtyList.push(el);
     
    return this.dirtyCount;
  }

  Handler() {

  }

  GetElementTypeAndName(el: string): Array<string>{
    return el.split('_');
  }
}
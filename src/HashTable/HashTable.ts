import { Constants } from '../typscript/Constants'
import { IHashEntry } from './Interfaces/IHashEntry'

export class HashTable {
  private _data: Array<any> = new Array<any>()

  constructor() {
    for (let i = 0; i < Constants.HASH_TABLE_SIZE; i++) {
      this._data[i] = new Array<IHashEntry>()
    }
  }

  AddEntry(key: string, data: IHashEntry): Array<Object> {
    let err = [{}]
    this._data[this.CreateHashKey(key)].push(data)
    return err
  }

  GetEntry(key: string): Array<IHashEntry> {
    return this._data[this.CreateHashKey(key)]
  }

  CreateHashKey(item: string): number {
    let count = 0

    for (let i = 0; i < item.length; i++) {
      count += item.charCodeAt(i)    
    }

    return count % Constants.HASH_TABLE_SIZE
  }

  DisplayAll() {
    this._data.forEach((x, i) => {
      x.forEach((entry) => {
        console.log(`KEY:${i} DepId: ${entry.dependentId}, Scope: ${entry.scope}, DeeType: ${entry.dependeeType}, DeeId: ${entry.dependeeId}`)
      })
    })
  }
}

import { Constants } from '../Constants'
import { IHashEntry } from './Interfaces/IHashEntry'

const l = console.log
const t = console.table

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

  GetDependents(targetId: string): Array<string> {
    let tmp = []

    this._data.forEach((x) => {
      if (x.length) {
        tmp = x.filter((y) => y.dependeeId === targetId)
      }
    })
    let tmp2 = tmp.map((x) => x.dependentId)
    l(tmp2)
    return tmp2
  }

  CreateHashKey(item: string): number {
    let count = 0

    for (let i = 0; i < item.length; i++) {
      count += item.charCodeAt(i)
    }

    return count % Constants.HASH_TABLE_SIZE
  }

  IsDependee(t: string): boolean {
    let tmp = []
    this._data.forEach((x) => {
      if (x.length) {
        tmp = x.filter((y) => {
          return y.dependeeId === t
        })
      }
    })

    return tmp.length > 0
  }

  DisplayAll() {
    this._data.forEach((x, i) => {
      x.forEach((entry) => {
        console.log(
          `KEY:${i} DepId: ${entry.dependentId}, Scope: ${entry.scope}, DeeType: ${entry.dependeeType}, DeeId: ${entry.dependeeId}`,
        )
      })
    })
  }
}

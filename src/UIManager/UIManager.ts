import { Logger } from '../typscript/Logger/Logger'
import { Utils } from '../typscript/Utils/Utils'
import { NODETYPE } from '../typscript/Enums/nodetype'
import { Constants } from '../typscript/Constants'
import { HashTable } from '../HashTable/HashTable'
import { IHashEntry } from '../HashTable/Interfaces/IHashEntry'
// import { Http2ServerRequest } from 'http2'

const l = console.log
const t = console.table
const c = console.clear
const stamp = Logger.ConsoleWithStamp

export class UIManager {
  private dirtyCount: number = 0
  private dirtyList: Array<string>
  private readonly scopeList: Array<string> = ['able', 'visi', 'bind']
  private hashTable: HashTable
  ARE: any = null

  constructor(h: HashTable, oe?: any) {
    this.hashTable = h
    this.ARE = oe // App Root Element
    this.ARE.addEventListener('click', (ev) => {
      return this.Handler(ev)
    })
    this.ARE.addEventListener('input', (ev) => {
      return this.Handler(ev)
    })
    this.BuildInteractionsHash(oe)
    this.InitUI()
    this.dirtyList = []
  }

  InitUI() {
    this.ResetScopes()
  }

  ResetScopes() {
    this.scopeList.forEach((scope) => {
      this.hashTable
        .GetEntry(scope)
        .forEach((x) => Utils.Ability(x.dependeeId, false))
    })
  }

  BuildInteractionsHash(el?: any) {
    this.BuildHashTable(el)
  }

  BuildHashTable(curr: Element) {
    let tmpScope = ''
    if (curr.nodeName !== '#text' && curr.nodeType !== 8) {
      tmpScope = curr.id
      for (let i = 0; i < curr.attributes.length; i++) {
        let currAttribute = curr.attributes[i]
        let tmp = curr.attributes[i].name.split('-')
        if (tmp.indexOf('dee') !== -1) {
          if (
            tmp.length >= Constants.MIN_ATT_LENGTH &&
            tmp.length <= Constants.MAX_ATT_LENGTH
          ) {
            this.hashTable.AddEntry(`${tmp[2]}`, <IHashEntry>{
              dependentId: curr.id,
              scope: currAttribute.value,
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

  Enable(key: string) {
    let scopes = Array<string>()
    let statuses = []
    let keys = this.hashTable.GetEntry(key)

    keys.forEach((x) => {
      if (scopes.indexOf(x.dependeeId) == -1) scopes.push(x.dependeeId)
    })

    keys.forEach((x) => {
      statuses.push({
        deepId: x.dependeeId,
        valid: Utils.CheckValid(x.dependentId, 'value'),
      })
    })

    scopes.forEach((scope) => {
      Utils.Ability(scope, Utils.CheckSum(statuses, scope))
    })
  }

  AddDirty(el: string): number {
    if (this.dirtyList.indexOf(el) == -1) {
      ++this.dirtyCount
      this.dirtyList.push(el)
    }

    return this.dirtyCount
  }

  ClearDirty(removeList: Array<string>) {
    this.dirtyList = this.dirtyList.filter((x) => {
      return removeList.indexOf(x) !== -1
    })
    l('ClearDirty() Dirty List: ', this.dirtyList)
  }

  Handler(ev) {
    let tarId = ev.target.id
    let tarEl = ev.target

    if (tarId) {
      switch (ev.type) {
        case 'input':
          this.AddDirty(ev.target.id)
          tarEl.disabled = this.Enable('able')

          break
        case 'click':
          l('Handler() Dirty List: ', this.dirtyList)
          // ignore any targets that have no dependees
          if (this.hashTable.IsDependee(tarId)) {
            this.ClearDirty(this.hashTable.GetDependents(tarId))
          }
          // find dependee type and grab a list of those
          //
          break

        default:
          break
      }
    }
  }

  GetElementTypeAndName(el: string): Array<string> {
    return Utils.GetElementTypeAndName(el)
  }
}

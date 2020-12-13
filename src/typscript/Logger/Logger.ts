import { O_EXCL } from 'constants'
import { ILoggerItem } from './Models/ILoggerItem'
import { Utils } from '../Utils/Utils'

export class Logger {
  private static buffer: Array<ILoggerItem> = []
  private static instance: Logger
  private static outputElement: any

  private constructor() {
    console.log("Logger()")    
    Logger.outputElement = document.querySelector('#log')
  }

  public static GetLoggerReference(): Logger {
    if(!Logger.instance) {
      Logger.instance = new Logger()
    }

    return Logger.instance
  }

  public static OutputElement(str: string) {
    this.outputElement = document.querySelector(str)
  }

  public static Log(str: string, imed: boolean=false) {
    let dt = new Date()
    let logItem: ILoggerItem = {
      stamp: `${dt.toISOString()}`,
      item: str,
    }
    Logger.buffer.push(logItem)
    if(imed) Logger.Print()
  }

  public static LogP(str: string) {
    let dt = new Date()
    let logItem: ILoggerItem = {
      stamp: `${dt.toISOString()}`,
      item: str,
    }
    Logger.buffer.push(logItem)
    Logger.Print()
  }  

  public static Print() {
    let outerDiv = Utils.CreateElement({
      id: 'outerDiv', 
      elementName: 'div',
      classes: ['outer'],
    })

    this.buffer.forEach((element, i) => {
      let tmp = Utils.CreateElement({
        id: element.item,
        elementName: 'span',
        classes: ['log-stamp'],
      })
      tmp.innerHTML = element.stamp
      
      let tmp2 = Utils.CreateElement({
        id: element.item,
        elementName: 'span',
        classes: ['log-item'],
      })
      tmp2.innerHTML = element.item + "<br>"
      outerDiv.appendChild(tmp)
      outerDiv.appendChild(tmp2)
    })
    
    Utils.GetUIElement("#log").appendChild(outerDiv)
  }

  public static ConsoleWithStamp(str: string) {
    console.log(`[${Date.now()}] ${str}`)
  }
}

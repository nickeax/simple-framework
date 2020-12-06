import { ILoggerItem } from '../Models/ILoggerItem';
import { Utils } from '../Utils/Utils';

export class Logger {
  outputElement: Element;
  buffer: Array<ILoggerItem> = [];
  utils: Utils;
  weekDays: Array<string> = ['Sunday', 'Monday', 'Tuesday', 'Thursday', 'Friday', 'Saturday']
  constructor(oe: Element) {
    this.outputElement = oe
    this.Init()
    this.utils = new Utils()
  }

  Init() {}

  Log(str: string) {
    let dt = new Date();
    let logItem: ILoggerItem = {
      stamp: `${dt.toISOString()}`,
      item: str,
    }
    this.buffer.push(logItem)
  }

  Print() {
    let outerDiv = this.utils.CreateElement({
      id: 'outerDiv',
      elementName: 'div',
      classes: ['outer'],
    })

    this.buffer.forEach((element, i) => {
      // let lineDiv = this.utils.CreateElement({
      //   id: `lineDiv-${i}`,
      //   elementName: "div",
      //   classes: ['lineDiv']
      // });

      let tmp = this.utils.CreateElement({
        id: element.item,
        elementName: 'span',
        classes: ['log-stamp'],
      });
      tmp.innerHTML = element.stamp
      
      let tmp2 = this.utils.CreateElement({
        id: element.item,
        elementName: 'span',
        classes: ['log-item'],
      })
      tmp2.innerHTML = element.item + "<br>";
      
      // tmp.classList = "log-stamp";
      // tmp2.classList = "log-"
      outerDiv.appendChild(tmp);
      outerDiv.appendChild(tmp2);
      // outerDiv.appendChild(lineDiv);
    })
    console.log(outerDiv)
    this.outputElement = null;
    this.outputElement = document.querySelector('#log');
    this.outputElement.appendChild(outerDiv);
  }
}

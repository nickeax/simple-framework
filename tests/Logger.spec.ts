import { expect } from "chai"
import { Logger } from '../src/typscript/Logger/Logger'

// describe('Operations of Logger class', () => {
//   describe('Log("text", false)', () => {
//     it('Should add the date and log text to buffer and print the buffer if flag true', ()=>{
//       let logger = new Logger()
//       logger.Log("Test log")
//       expect(logger.buffer.length)
//         .to
//         .equal(1)
//     })
//   })
  
//   describe('Log("text", true)', () => {
//     it('Should call Print()', ()=>{
//       const windowRef = global.window
//       let logger = new Logger()
//       logger.Log("#iLog", true)
//       expect(logger)
//       .to.respondTo("logger.Print")

//       global.window = windowRef
//     })
//   })
// })
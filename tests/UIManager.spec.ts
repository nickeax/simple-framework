import { UIManager } from '../src/typscript/UIManager';
import { Utils } from '../src/typscript/Utils/Utils'
import { expect } from 'chai'
let uim = new UIManager();

describe('Operations of UIManager class', () => {
  describe('GetElementTypeAndName()', () => {
    it('Should return a two element array from splitting the attribute ID', ()=>{
      expect(uim.GetElementTypeAndName("input_firstName"))
        .to
        .eql (["input", "firstName"]);
    })
  })
  
  describe('AddDirty()', () => {
    it('Should increase length of dirtyList[] to 1.', ()=>{
      uim.AddDirty("#input_lastName");
      expect(uim.dirtyCount)
        .to.be.equal(1)
    })
    
    it('Should add "#input_lastName" to dirtyList array.', ()=>{
      uim.AddDirty("#input_lastName");
      expect(uim.dirtyList[0])
        .to.be.eql("#input_lastName");
    })
  })

  describe('BuildInteractionsHash()', () => {
    it('Should build a hash table of the dependees', () => {

    })

    it('Should add key and value to appropriate hash table entry')
  })
})

import { Logger } from './Logger/Logger'
import { UIManager } from '../UIManager/UIManager'
import { Utils } from './Utils/Utils'
import { HashTable } from '../HashTable/HashTable'

const output = document.querySelector('#information')

let ht = new HashTable()
const uim = new UIManager(ht, document.querySelector('#appRoot'))

ht.DisplayAll()
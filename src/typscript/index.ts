import { Logger } from './Logger/Logger';
import { UIManager } from './UIManager'

const rootElement = document.querySelector("#appRoot");
const output = document.querySelector("#information");

const uim = new UIManager();
const logger = new Logger(document.querySelector('#log'));

logger.Log("Test 1");
logger.Log("Test 2");
logger.Log("Test 3");
logger.Log("Test 4");

logger.Print();

logger.Log("Test 5");
logger.Log("Test 6");
logger.Log("Test 7");
logger.Log("Test 8");

logger.Print();
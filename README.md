# Simple Framework

Simple Framework is an excercise designed to help beginners learn about DOM manipulation based on different data structures and algorithms. The source code is written in *Typescript* and will be capable of the following:
  - Recursively parse an HTML DOM structure 
  - Check for custom attributes that describe element relationships and monitor element interactions
  - Use a Hash Table to index interaction logic relating to UI Elements
  - Learn how to program to interfaces rather than to implementations (for scalablity, maintainablity and reusablity)

## Tech *(what you'll learn)*
 - How to parse an HTML document and record various details via a Hash Table
 - Implement a simple Hash Table
 - Use custom HTML Data attributes
 - Learn where Typescript is different to ES5/6
 - Design for resuablity and scalability

## What Does it Do?
## How Was it Designed?
## How Does it Work?
## Is it 'Useful'? 
## The Modules
### Logger.ts
I find it helpful to expand upon the features of console.log and console.table when working with a new project. Also, I was unable to get a suitable testing setup running in the initial stages, as I was learning a lot about **TypeScript** and **Parcel** at the same time as creating the project. 
The **Logger** module is a simple way to gather values to print later or immediately, but its true purpose is to show the beginnings of a useful logger module.

### Utils.ts
This collection of *static* methods provides common processing relating to the DOM. It may also be instantiatied as a singleton, but I prefer to use the class statically.
**CreateElement()**
Takes an object containing any information required to create a new element and returns that object.

**GetUIElement()**
This is general way to obtain a reference to an HTML Element, using **document.querySelector()**

**GetResourceList()**
Not used currently, but given an Element, will be a quick way to fetch a list of attrbutes

**GetElementTypeAndName()**
A very simple way to return an Array of hyphen separated strings. The custom data attributes use this method to break them into informational parts. 

**CheckValid()**
Send an Element ID and the property to check and this method will return the validity. At the time of writing, the method is not very versatile, but this will be improved upon as the framework is developed.

**CheckSum()**
Due to the format of the data structure passed in to this method, it returns **true** or **false** based on scoped *dependents* of a *dependee* having the required status. An array is filtered first on *scope* to find the total number of conditions, then filter the array on *conditions* to check if they are all true. This validitity is used to enable or disable the **dependee** element (don't worry it's not clear what those terms mean, they'll be explained in the *overview* section. 

**Ability()**
Quite a simple method, just for updating the 'ableness' of the selected element. As the framework develops, this method may take on a more general role or even be an implemented differently based on an Interface that **dependee** elements control themselves. It's yet to be seen!

**ErrorReport()**
Just a placeholder at this stage, but eventually will be used in conjunction with the Logger to display errors in a domain specific way.

**GBI()**
A wrapper for **document.querySelector()** that will need to become more general in order to handle different Element Nodes.

### HashTable.ts
**HashTable.constructor()**
The constructor initialises an empty array of **IHashEntry** arrays. The internal array of the **HashTable** is a fixed size which is important, as you'll see below.

**CreateHash()**
The **HashTable** stores items at locations based on the result of this method. The character code of each character of the string parameter is summed, The modulus of the **HashTable**'s internal array is applied on this summation of character code values. Because this modulas operation will only provide resulting numbers that are less than or equal to the total size of the internal array, the result can be used as an index.
The hashing process is not designed to produce *unique* indexes, but *indexed* indexers. In other words, the internal array will end up storing arrays of items grouped by a certain characteristic. In this case, it will be the 'class type' of the UI *dependee* element.

**AddEntry()/GetEntry()**
The class method **CreateHash()** is used to create the index at which to store the incoming item or retrieve an existing one.

### UIManagager.ts
**UIManager.constructor()
The constructor takes a reference to the root ELement Node of the application, which is selected by the instantiator. It also stores a reference to an externally created *HashTable* object that is intrinsic to the *UIManager*. Next in the constructor, two event listeners are attached to the method **Handler()**. 
Finally some initialisation methods are called.

**InitUI()**
Calls another class method, **ResetScopes()**

**ResetScopes()**
Iterates over every scope name (provided in a private class property) in order to clear every Hash Table entry.

**BuildHashTable()**
In order to find and register all the relevant *data* attributes, this method recursively checks every relevant **Node** in the DOM, ingoring non-HTML Element nodes. Once an appropriate Node has been found, another check finds any of the relevant **data-\*** attributes and places references to these elements into a Hash Table (described above). The **BuildHasTable()** method is recursive, in order to check the whole DOM tree under the **#rootElement**.

**Enable()**
When the design for the Framework is complete, **Enable()** may not be in this module or may not be used at all. At the time of writing, **Enable()** is central to the operation of the Framework as it uses the data from the HashTable to enable or disable various UI Elements, in conjunction with methods from the Hash Table.

**AddDirty()**
Initially designed as a way to check for shortcuts in the data processing, this method isn't effectively integrated into the overall design yet, but will be. Basically it will allow for less polling of the UI and act as a temporary flag holder. If a reference to a UI Element is on the list maintained by **AddDirty()** it will be worth checking that element for further information. If not, that UI Element hasn't been interacted with recently and we aren't going to bother checking its status.

**Handler()**
The **Handler()** method simply responds to events in a general way, then switches to call the relevant method, for type of event coming in.

**GetElementTypeAndName()**
This method wraps a call to a method of the **Utils** module to simply split a string.
## Installation
If you wish to play around with the framework, installation is easy. Provided is a basic UI with some styles.
## Development
## Todos
 - Add to this README

License: *MIT*
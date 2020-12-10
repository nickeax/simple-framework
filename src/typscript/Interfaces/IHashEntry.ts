export interface IHashEntry {
  dependentId: string; 
  scope: string;  // the method to call on the dependant
  dependeeType: string; // 
  dependeeId: string; // the affected UIElement
}
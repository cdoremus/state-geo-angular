

export const checkAdjacents = (adjacentStates, pickedStates) => {
    console.log('Selected adjacent states: ', pickedStates);
    if (pickedStates === undefined || pickedStates.length === 0) {
      throw new Error("No candidate adjacents have been picked");      
    }
  	let notAdjacents = [];
    for (let i = 0; i < pickedStates.length; i++) {
      let isFound = false;
      let pickedState = pickedStates[i].name;      
      for (let j =0; j < adjacentStates.length; j++) {
        var state = adjacentStates[j];
        if (state === pickedState) {
          isFound = true;
          break;
        }
      }
      if (!isFound) {
        notAdjacents.push(pickedState);
      }
       isFound = false;
    }
    return notAdjacents;  		
};


export const convertStateArrayToStateNameStringArray = stateObjArray => {
  if (stateObjArray === undefined || stateObjArray.length === 0) {
    return [];
  }
  let names = [];
  stateObjArray.forEach(state => names.push(state.name));
  return names;
}
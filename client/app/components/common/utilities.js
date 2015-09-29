import * as Constants from './constants';

/**
 * Checks adjacent states against a list of candidate adjacent states
 * (pickedStates) returning an array of states from the picked
 * states that are not in the adjacentStates array.
 *  
 * adjacentStates - known adjacent states
 * pickedStates - candidate adjacent states that are checked against
 *  the picked states
 */
export const extraPickedStates = (adjacentStates, pickedStates) => {
    console.log('Selected adjacent states: ', pickedStates);
    if (pickedStates === undefined || pickedStates.length === 0) {
      throw new Error(Constants.messages.CandidateAdjacentsNotPicked);      
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


/**
 * Checks candidate picked states against a list of adjacent states
 * returning an array of adjacent states that were not picked.
 *  
 * adjacentStates - known adjacent states
 * pickedStates - candidate adjacent states that are checked against
 *  the picked states
 */
export const missingPickedStates = ((adjacentStates, pickedStates) => {
    console.log('Selected adjacent states: ', pickedStates);
    if (pickedStates === undefined || pickedStates.length === 0) {
      throw new Error(Constants.messages.CandidateAdjacentsNotPicked);      
    }
  	let notAdjacents = [];
    for (let i = 0; i < adjacentStates.length; i++) {
      let isFound = false;
      let adjacentState = adjacentStates[i];
            
      for (let j =0; j < pickedStates.length; j++) {
        var state = pickedStates[j].name;
        if (state === adjacentState) {
          isFound = true;
          break;
        }
      }
      if (!isFound) {
        notAdjacents.push(adjacentState);
      }
       isFound = false;
    }
    return notAdjacents;  		  
});


export const sortAdjacentStateArray = function(adjacentStateArray) {
  if (adjacentStateArray === undefined || adjacentStateArray.length === 0) {
    return [];
  } else {
    let sorted = adjacentStateArray.sort((a,b) => { 
        if (a.name < b.name) {
          return -1;
        } else if (a.name > b.name) {
          return 1;
        } else {
          return 0;
        }
      });
      return sorted;
  }
}

export const convertStateArrayToStateNameStringArray = stateObjArray => {
  if (stateObjArray === undefined || stateObjArray.length === 0) {
    return [];
  }
  let names = [];
  stateObjArray.forEach(state => names.push(state.name));
  return names;
}

/**
 * Removes a single element from an array. If there are two elements
 * only the first one is removed.
 */
export const removeElementFromArray = (array, element) => {
  //check that array is an Array
  if (!( Object.prototype.toString.call( array ) === '[object Array]')) {
    throw new Error(Constants.messages.ObjectNotAnArray);
  }
  
  if (!element) {
    return array;
  }
  let index = array.indexOf(element);
  if (index > -1) {
    array.splice(index, 1);
  }
  return array.slice();

}

/**
 * Randomly selects an item from an array. Does
 * no checking of the array item types.
 */
export const randomArrayItem = array => {
  if (!array || !(array instanceof Array) || array.length === 0) {
    return new Object();
  } else {
    return array[Math.floor(Math.random()*array.length)];
  }
}

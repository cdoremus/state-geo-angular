import {Injectable, Inject} from "angular2/core";
import {Http, Response} from "angular2/http";
import {State} from '../common/state';
import * as Rx from "rxjs";
import * as constants from "./constants";


@Injectable()
export default class StateService {
  adjacentStates: State[];
  greeting: string;
  selectedStateSubject: Rx.BehaviorSubject<any>;

  constructor(private http: Http) {
    this.greeting = "StateService!";
    this.adjacentStates = [];
    this.populateAdjacentStates();
    // RxObservable on selectedState
    this.selectedStateSubject = new Rx.BehaviorSubject(null);
  }

  getGreeting() {
    return this.greeting;
  }

  /* Returns a promise from API call */
  queryStates() {
    return this.http.get(constants.webservice_url.states)
      .map(res => {
        // console.log("queryStates() results", res);
        return res.json();
      })
      .toPromise();
  }

  /* Returns a promise from API call */
  queryAdjacentStates() {
    return this.http.get(constants.webservice_url.adjacentStates)
      .map(res => {
        // console.log("queryAdjacentStates() results", res);
        return res.json();
      })
      .toPromise();
  }

  /**
   * Obtains all adjacent states
   */
  getAllAdjacentStates() {
    this.queryAdjacentStates()
      .then(result => {
        this.adjacentStates = result;
      })
      .catch(error => console.log("Error: ", error));
  }

  populateAdjacentStates() {
    if (this.adjacentStates.length === 0) {
      this.queryAdjacentStates()
        .then(result => {
          this.adjacentStates = result;
          // return this.adjacentStates;
        })
        .catch(error => console.log("ERROR", error));
    }
  }

  getAdjacentStates(state) {
    console.log("State to get adjacent states: ", state);
    let adjacents = [];
    this.populateAdjacentStates();
    let allAdjacents = this.adjacentStates;
    for (let i = 0; i < allAdjacents.length; i++) {
      if(allAdjacents[i].name === state) {
        adjacents = allAdjacents[i].adjacent;
        break;
      }
    }
    console.log("Adjacents of " + state  + ": ", adjacents);
    return adjacents;
  }

  checkSelectedCapital(selectedState: State, selectedCapital: string) {
    // console.log("Selected state: ", selectedState);
    // console.log("Selected capital: ", selectedCapital);
    let isSelectedCapital = false;
    if (selectedState.capital === selectedCapital) {
      isSelectedCapital = true;
    }
    return isSelectedCapital;
  }

  public selectedStateChanged(selectedState) {
    console.log(`selectedStateChanged() called with value: ${selectedState.name}`);
    this.selectedStateSubject.next(selectedState);
  }

  _contains(array, obj) {
    let i = array.length;
    while (i--) {
       if (array[i] === obj) {
           return true;
       }
    }
    return false;
  }
}

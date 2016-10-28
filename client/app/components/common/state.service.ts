import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { State } from '../common/state';
import { Observable, BehaviorSubject } from "rxjs";
import * as constants from "./constants";

export const STATE_COUNT: number = 50;

@Injectable()
export default class StateService {
  adjacentStates: State[];
  greeting: string;
  selectedStateSubject: BehaviorSubject<any>;

  constructor(private http: Http) {
    this.greeting = "StateService!";
    this.adjacentStates = [];
    this.populateAdjacentStates();
    // RxObservable on selectedState
    this.selectedStateSubject = new BehaviorSubject(undefined);
  }

  getGreeting(): string {
    return this.greeting;
  }

  /* Returns an Observable array of states from API call */
  queryStates(): Observable<Array<State>> {
    // let count: number = 0;
    // let index: number = Math.floor(Math.random() * STATE_COUNT);
    return this.http.get(constants.webservice_url.states)
      .map((res: Response) => res.json());
  }

  /* Returns a promise from API call */
  queryAdjacentStates(): Promise<Array<State>> {
    return this.http.get(constants.webservice_url.adjacentStates)
      .map((res: Response) => res.json())
      .toPromise();
  }

  /**
   * Obtains all adjacent states
   */
  getAllAdjacentStates(): void {
    this.queryAdjacentStates()
      .then((result: State[]) => {
        this.adjacentStates = result;
      })
      .catch((error: any) => console.log("Error: ", error));
  }

  populateAdjacentStates(): void {
    if (this.adjacentStates.length === 0) {
      this.queryAdjacentStates()
        .then((result: State[]) => {
          this.adjacentStates = result;
          // return this.adjacentStates;
        })
        .catch((error: any) => console.log("ERROR", error));
    }
  }

  getAdjacentStates(state: string): string[] {
    console.log("State to get adjacent states: ", state);
    let adjacents: string[] = [];
    this.populateAdjacentStates();
    let allAdjacents: State[] = this.adjacentStates;
    for (let i: number = 0; i < allAdjacents.length; i++) {
      if (allAdjacents[i].name === state) {
        adjacents = allAdjacents[i].adjacent;
        break;
      }
    }
    console.log("Adjacents of " + state  + ": ", adjacents);
    return adjacents;
  }

  checkSelectedCapital(selectedState: State, selectedCapital: string): boolean {
    // console.log("Selected state: ", selectedState);
    // console.log("Selected capital: ", selectedCapital);
    let checked: Observable<boolean>;
    if (selectedState.capital === selectedCapital) {
      checked = Observable.of(true);
      return true;
    } else {
      return false;
    }
  }

  public selectedStateChanged(selectedState: State): void {
    console.log(`StateService.selectedStateChanged() called with value:`, selectedState);
    this.selectedStateSubject.next(selectedState);
  }

  _contains(array: any[], obj: any): boolean {
    let i: number = array.length;
    while (i--) {
       if (array[i] === obj) {
           return true;
       }
    }
    return false;
  }
}

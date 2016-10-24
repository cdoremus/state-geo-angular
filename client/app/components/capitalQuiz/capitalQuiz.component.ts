import {Component, OnInit} from "@angular/core";
import StateService from '../common/state.service';
import {ResultsMessage, ResultsMessageType} from '../quizResultsMessage/resultsMessage';
import { Observable } from "rxjs";
import * as util from '../common/utilities';
import {State} from '../common/state';
@Component({
  selector: 'capital-quiz',
  styleUrls: ['./capitalQuiz.css'],
  templateUrl:  './capitalQuiz.html',
  })
export default class CapitalQuizComponent implements OnInit {
  title: string = 'Do you know the state capitals?';
  states: State[] = [];
  selectedState: State;
  capitals: string[];
  selectedCapital: string;
  resultsMessages: ResultsMessage[] = [];

  constructor(private service: StateService) {
 }

 ngOnInit(): void {
    this.populatePageData();
 }

  populatePageData(): void {
    let len: number = 50;
    let rand: number = Math.floor(Math.random() * len);
    let statesObs: Observable<State[]> = this.service.queryStates();
    statesObs.subscribe((states: State[]) => {
      this.states = [...states.slice(0, rand), Object.assign({}, states[rand], {selected: ""}), ...states.slice(rand + 1)];
      this.selectedState = states[rand];
      console.log("CapitalQuizComponent.populatePageData() random selectedState:", this.selectedState);
      this.populateCapitals();
    });
  }

  populateCapitals(): void {
    // map all state capitals and sort them
    this.capitals = this.states.map((state: State) => state.capital).sort();
  }

  populateStates(states: State[]): void {
    // sort states
    this.states = util.sortArrayByProperty(states, 'name');
  }


  selectedStateChanged(newSelectedState: State): void {
    // Set selectedState to new value
    this.selectedState = newSelectedState;
    this.resetSelectedCapital();
  }

  /**
   * Check selected capital against the selected state
   */
  checkSelected(selectedState: State, selectedCapital: string): void {
    let resultsMessages: ResultsMessage[] = [];
    try {
      this.selectedState = selectedState;
      this.selectedCapital = selectedCapital;
      let selectedCapitalCorrect: boolean = this.service.checkSelectedCapital(this.selectedState, this.selectedCapital);

      if (selectedCapitalCorrect) {
        resultsMessages.push(new ResultsMessage('Selected capital is correct', ResultsMessageType.success));
      } else {
        resultsMessages.push(new ResultsMessage('Selected capital is NOT correct', ResultsMessageType.failure));
      }

    } catch (error) {
      console.log("Error in CapitalQuizComponent.checkSelected(): ", error);
      resultsMessages.push(
        new ResultsMessage(
          'Error in CapitalQuizComponent.checkSelected(): ',
          ResultsMessageType.failure,
          error.message));
    }

    this.resultsMessages = resultsMessages;
  }

  resetSelectedCapital(): void {
    this.selectedCapital = '';
    this.resultsMessages = [];
  }

}

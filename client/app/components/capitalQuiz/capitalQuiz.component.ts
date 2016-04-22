import {Component, OnInit} from "angular2/core";
import StateService from '../common/state.service';
import {ResultsMessage, ResultsMessageType} from '../quizResultsMessage/resultsMessage';
import * as util from '../common/utilities';
import * as Rx from "rxjs";
import {State} from '../common/state';
import StateDropdownComponent from '../stateDropdown/stateDropdown.component';
import QuizResultsMessageComponent from '../quizResultsMessage/quizResultsMessage.component';

@Component({
  selector: 'capital-quiz',
  templateUrl:  'app/components/capitalQuiz/capitalQuiz.html',
  styleUrls: ['app/components/capitalQuiz/capitalQuiz.css'],
  providers: [StateService],
  directives: [QuizResultsMessageComponent, StateDropdownComponent]
  })
export default class CapitalQuizComponent implements OnInit {
  title: string;
  states: State[];
  selectedState: State;
  capitals: string[];
  selectedCapital: string;
  resultsMessages: ResultsMessage[];

  constructor(private service: StateService) {
    this.title = 'Do you know the state capitals?';
     this.states = [];
    this.resultsMessages = [];
 }

 ngOnInit(): void {
    this.populatePageData();
 }

  populatePageData(): void {
    let len = 50;
    let rand = Math.floor(Math.random() * len);
    let count = 0;
    let statesObs = this.service.queryStates();
    statesObs.subscribe(states => {
      this.states = [...states.slice(0, rand), Object.assign({}, states[rand], {selected: ""}), ...states.slice(rand + 1)];
      this.selectedState = states[rand];
      console.log("CapitalQuizComponent.populatePageData() random selectedState:", this.selectedState);
      this.populateCapitals();
    });
  }

  populateCapitals(): void {
    // map all state capitals and sort them
    this.capitals = this.states.map(state => state.capital).sort();
  }

  populateStates(states): void {
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
    let resultsMessages = [];
    try {
      this.selectedState = selectedState;
      this.selectedCapital = selectedCapital;
      let selectedCapitalCorrect = this.service.checkSelectedCapital(this.selectedState, this.selectedCapital);

      if (selectedCapitalCorrect) {
        resultsMessages.push(new ResultsMessage('Selected capital is correct', ResultsMessageType.success));
      } else {
        resultsMessages.push(new ResultsMessage('Selected capital is NOT correct', ResultsMessageType.failure));
      }

    } catch(error) {
      console.log("Error in CapitalQuizComponent.checkSelected(): ", error);
        resultsMessages.push(new ResultsMessage('Error in CapitalQuizComponent.checkSelected(): ', ResultsMessageType.failure, error.message));
    }

    this.resultsMessages = resultsMessages;
  }

  resetSelectedCapital() {
    this.selectedCapital = '';
    this.resultsMessages = [];
  }

}

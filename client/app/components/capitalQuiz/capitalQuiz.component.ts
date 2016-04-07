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
  statesObs: Rx.Observable<Array<State>>;
  states: State[];
  selectedState: State;
  capitals: string[];
  selectedCapital: string;
  resultsMessages: ResultsMessage[];

  constructor(private service: StateService) {
    this.title = 'Do you know the state capitals?';
    // this.selectedState = {code: undefined, name: undefined, capital: undefined, adjacent:[]};
    // this.states = [];
    // this.selectedCapital = '';
    this.resultsMessages = [];

    console.log("CapitalQuizComponent constructor end");
 }

 ngOnInit(): void {
    this.populatePageData();

      /**
       * Set capitals
       */


    /**
     * Register as an RxJs observer of selectedState changes
     */
    // this.service.selectedStateSubject.subscribe((newSelectedState) => {
    //   this.selectedStateChanged(newSelectedState);
    // });

    // let stateArr: State[] = states.toArray();
    // let len: number = stateArr.length;
    // let index: number = Math.floor(Math.random() * len);

    console.log("CapitalQuizComponent initialized");
 }

  populatePageData(): void {
    this.statesObs = this.service.queryStates();
    this.statesObs.subscribe(x => {
      this.states = x;
      this.populateCapitals();
    });
    //   .then(result => {
    //    let states = result;
    //    console.log("States data returned in populatePageData()", states);
    //    this.populateStates(states);
    //    this.populateCapitals(states);
    //   })
    // .catch(reason => console.error("Problem in populatePageData()", reason));
  }

  populateCapitals() {
    // map all state capitals and sort them
    this.capitals = this.states.map(state => state.capital).sort();
  }

  populateStates(states) {
    // sort states
    this.states = util.sortArrayByProperty(states, 'name');
    // select a random state from array
    // let len = this.states.length;
    // let randIndex = Math.floor(Math.random() * len);
    // this.selectedState = this.states[randIndex];
  }


  selectedStateChanged(newSelectedState): void {
    // Set selectedState to new value
    this.selectedState = newSelectedState;
    console.log("Selected state changed for capitals quiz: ", this.selectedState);
    this.resetSelectedCapital();
  }

  stateDropdownSelected(state) {
    this.selectedState = util.findStateByName(this.states, state);
  }

  /**
   * Check selected capital against the selected state
   *
   */
  checkSelected(selectedState: State, selectedCapital: string): void {
    // console.log("checkSelected() state". selectedState);
    // console.log("checkSelected() capital". selectedCapital);
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

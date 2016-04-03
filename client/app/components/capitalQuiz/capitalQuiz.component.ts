import {Component, OnInit} from "angular2/core";
import StateService from '../common/state.service';
import {ResultsMessage, ResultsMessageType} from '../quizResultsMessage/resultsMessage';
import * as util from '../common/utilities';
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
  selectedState: any;
  states: any[];
  selectedCapital: any;
  resultsMessages: ResultsMessage[];

  constructor(private service: StateService) {
    this.populatePageData();
    this.title = 'Do you know the state capitals?';
    this.selectedState = {};
    this.states = [];
    this.selectedCapital = {};
    this.resultsMessages = [];
    console.log("CapitalQuizComponent constructor end");
 }

 ngOnInit(): void {
    /**
     * Register as an RxJs observer of selectedState changes
     */
    this.service.selectedStateSubject.subscribe((newSelectedState) => {
      this.selectedStateChanged(newSelectedState);
    });
    console.log("CapitalQuizComponent initialized");
 }

  populatePageData(): void {
    this.service.queryStates()
      .then(result => {
      //  console.log("Data returned in populatePageData", result);
       this.states = result;
      })
    // select a random state from array
    .then(result => {
      this.selectedState = util.randomArrayItem(this.states);
      console.log("Selected state for capitals quiz: ", this.selectedState);
    })
    .catch(reason => console.error("Problem in populatePageData()", reason));
  }

  selectedStateChanged(newSelectedState): void {
    // Set selectedState to new value
    this.selectedState = newSelectedState;
    this.resetSelectedCapital();
  }

  /**
   * Check selected capital against the selected state
   *
   */
  checkSelected(): void {
    let resultsMessages = [];
    try {
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
    this.selectedCapital = {};
    this.resultsMessages = [];
  }

}

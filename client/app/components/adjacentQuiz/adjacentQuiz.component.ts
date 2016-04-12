import {Component, OnInit} from  "angular2/core";
import StateService from '../common/state.service';
import PicklistService from '../picklist/picklist.service';
import * as Rx from "rxjs";
import * as util from '../common/utilities';
import {State} from '../common/state';
import StateDropdownComponent from '../stateDropdown/stateDropdown.component';
import QuizResultsMessageComponent from '../quizResultsMessage/quizResultsMessage.component';
import PicklistComponent from '../picklist/picklist.component';
import {ResultsMessage, ResultsMessageType} from '../quizResultsMessage/resultsMessage';

@Component({
  selector: 'adjacent-quiz',
  templateUrl:  'app/components/adjacentQuiz/adjacentQuiz.html',
  styleUrls: ['app/components/adjacentQuiz/adjacentQuiz.css'],
  providers: [StateService, PicklistService],
  directives: [QuizResultsMessageComponent, StateDropdownComponent, PicklistComponent]
})
export default class AdjacentQuizComponent implements OnInit {
  selectedState: State;
  resultsMessages: ResultsMessage[];
  statesObs: Rx.Observable<Array<State>>;
  states: State[];

  constructor(
    private stateService: StateService,
    private picklistService: PicklistService) {

    this.selectedState = {name: undefined, code: undefined, capital: undefined, adjacent: [], selected: undefined};
    /**
     * Get notified when selected state is changed using
     * RxJs
     */
    // this.stateService.selectedStateSubject.subscribe((newSelectedState) => {
    //   this.selectedStateChanged(newSelectedState);
    // });

    this.resultsMessages = [];

    /**
     * Get notified when results messages are changed using
     * RxJs
     */
    this.picklistService.resultsMessageSubject.subscribe((newResultsMessages) => {
      this.resultsMessages = newResultsMessages;
    });
  }

   ngOnInit(): void {
    this.populatePageData();
   }

   populatePageData() {
    let len = 50;
    let rand = Math.floor(Math.random() * len);
    let count = 0;
    this.statesObs = this.stateService.queryStates();
    this.statesObs.subscribe(states => {
      this.states = [...states.slice(0, rand), Object.assign({}, states[rand], {selected: ""}), ...states.slice(rand + 1)];
    });
   }

  clearResultsMessages() {
      this.resultsMessages = [];
  }

  selectedStateChanged(newSelectedState) {
    this.selectedState = newSelectedState;
    this.clearResultsMessages();
  }
}

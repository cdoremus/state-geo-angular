import {Component, OnInit} from  "@angular/core";
import StateService from '../common/state.service';
import PicklistService from '../picklist/picklist.service';
import { Observable } from "rxjs";
import {State} from '../common/state';
import {ResultsMessage} from '../quizResultsMessage/resultsMessage';

@Component({
  selector: 'adjacent-quiz',
  styleUrls: ['./adjacentQuiz.css'],
  templateUrl:  './adjacentQuiz.html',
  providers: [PicklistService],
})
export default class AdjacentQuizComponent implements OnInit {
  selectedState: State;
  resultsMessages: ResultsMessage[];
  statesObs: Observable<Array<State>>;
  states: State[];

  constructor(
    private stateService: StateService,
    private picklistService: PicklistService) {

    this.selectedState = {name: undefined, code: undefined, capital: undefined, adjacent: [], selected: undefined};

    this.resultsMessages = [];

  }

   ngOnInit(): void {
    this.populatePageData();
    /**
     * Get notified when results messages are changed using
     * RxJs
     */
    this.picklistService.resultsMessageSubject.subscribe((newResultsMessages: ResultsMessage[]) => {
      this.resultsMessages = newResultsMessages;
    });
   }

   populatePageData(): void {
    let len: number = 50;
    let rand: number = Math.floor(Math.random() * len);
    this.statesObs = this.stateService.queryStates();
    this.statesObs.subscribe((states: State[]) => {
      let state: State = states[rand];
      console.log(`AdjacentQuizComponent.populatePageData() random selected state:  ${state.name}  with index ${rand}`);
      this.states = [...states.slice(0, rand), Object.assign({}, state, {selected: ""}), ...states.slice(rand + 1)];
      this.selectedStateChanged(state);
    });
   }

  clearResultsMessages(): void {
      this.resultsMessages = [];
  }

setResultsMessage(messages: ResultsMessage[]): void {
  this.resultsMessages = messages;
}

  selectedStateChanged(newSelectedState: State): void {
    this.selectedState = newSelectedState;
    this.clearResultsMessages();
  }
}

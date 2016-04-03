import {Component} from  "angular2/core";
import StateService from '../common/state.service';
import PicklistService from '../picklist/picklist.service';
import * as util from '../common/utilities';

@Component({
  selector: 'adjacent-quiz',
  templateUrl:  'app/components/adjacentQuiz/adjacentQuiz.html',
  styleUrls: ['app/components/adjacentQuiz/adjacentQuiz.css'],
  providers: [StateService, PicklistService]
})
export default class AdjacentQuizComponent {
  selectedState: any;
  resultsMessages: any[];

  constructor(private stateService: StateService, private picklistService: PicklistService) {
    this.selectedState = {};
    /**
     * Get notified when selected state is changed using
     * RxJs
     */
    this.stateService.selectedStateSubject.subscribe((newSelectedState) => {
      this.selectedStateChanged(newSelectedState);
    });

    this.resultsMessages = [];

    /**
     * Get notified when results messages are changed using
     * RxJs
     */
    this.picklistService.resultsMessageSubject.subscribe((newResultsMessages) => {
      this.resultsMessages = newResultsMessages;
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

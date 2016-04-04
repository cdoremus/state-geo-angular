import {Component, Input, OnInit} from "angular2/core";
import StateService from '../common/state.service';
import * as util from '../common/utilities';

@Component({
  selector: 'state-dropdown',
  templateUrl:  'app/components/stateDropdown/stateDropdown.html',
  styleUrls: ['app/components/stateDropdown/stateDropdown.css'],
  providers: [StateService]
})
export default class StateDropdownComponent implements OnInit {
      @Input() componentId: string;
      @Input() componentLabel: string;
      states: any[];
      selectedState: any;


  constructor(private service: StateService) {
    this.populatePageData();
    this.states = [];
    this.selectedState = {};
    console.log("StateDropdownComponent constructed");
  }

  ngOnInit(): void {
  }


  /** Fill states array, pick a random one to display in drop down
   * and notify Rx Observable in StateService that the selected
   * state has changed.
   */
  populatePageData() {
    this.service.queryStates()
      .then(result => {
        this.states = util.sortArrayByProperty(result, 'name');
        console.log("StateDropdownComponent.populatePageData() states", this.states);
      })
      .then(result => {
        // select a random state from array
        this.selectedState = util.randomArrayItem(this.states);
        // notify StateService RxObservable
        this.service.selectedStateChanged(this.selectedState);
      })
      .catch(reason => console.error("Problem in populatePageData()", reason));
;
  }

  /**
   * Notify Rx Observable in StateService that the selected
   * state has changed.
   */
  onClick() {
    this.service.selectedStateChanged(this.selectedState);
  }

  toString() {
    return `
      componentId: ${this.componentId},
      componentLabel: ${this.componentLabel},
      selectedState: ${this.selectedState},
      states: ${this.states}
      `
  }
}

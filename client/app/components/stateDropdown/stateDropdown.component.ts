import {Component, Input, Output, OnInit, AfterViewInit, EventEmitter} from "angular2/core";
import StateService from '../common/state.service';
import {State} from '../common/state';
import * as Rx from "rxjs";
import * as util from '../common/utilities';

@Component({
  selector: 'state-dropdown',
  templateUrl:  'app/components/stateDropdown/stateDropdown.html',
  styleUrls: ['app/components/stateDropdown/stateDropdown.css'],
  providers: [StateService]
})
export default class StateDropdownComponent implements OnInit, AfterViewInit {
      @Input() componentId: string;
      @Input() componentLabel: string;
      @Output() select = new EventEmitter<State>();
      @Input() states: Rx.Observable<Array<State>>;
      statesArr: State[];
      selectedState: State;


  constructor() {
    // this.states = [];
    this.selectedState = {
      code: undefined,
      name: undefined,
      capital: undefined,
      adjacent: [],
      selected: undefined
    };
    console.log("StateDropdownComponent constructed");
  }

  ngOnInit(): void {
    // let subscription = this.statesObs.subscribe(x => this.states = x);
    this.populatePageData();
  }

  ngAfterViewInit() {
    // select a random state from array
    // let len = this.states.length;
    // let randIndex = Math.floor(Math.random() * len);
    // this.selectedState = this.states[randIndex];
    // this.select.emit(this.selectedState);
    console.log("State ViewInitialized");
    console.log("States: ", this.states);
    console.log("States array: ", this.statesArr);
  }

  /** Fill states array, pick a random one to display in drop down
   * and notify Rx Observable in StateService that the selected
   * state has changed.
   */
  populatePageData() {
    // this.states = this.service.queryStates();
    this.states.subscribe(array => {
      this.statesArr = array;
    console.log("States array in populatePageData(): ", this.statesArr);
    });
//       .then(result => {
//         this.states = util.sortArrayByProperty(result, 'name');
//         // console.log("StateDropdownComponent.populatePageData() states", this.states);
//       })
//       .then(result => {
//         // select a random state from array
//         this.selectedState = util.randomArrayItem(this.states);
//         console.log("StateDropdownComponent.populatePageData() selectedState ", this.selectedState);
//         // notify StateService RxObservable
//         this.service.selectedStateChanged(this.selectedState);
//       })
//       .catch(reason => console.error("Problem in populatePageData()", reason));
// ;
  }

  /**
   * Notify Rx Observable in StateService that the selected
   * state has changed.
   */
  onClick(event) {
    let state = event.target.value;
    console.log("Selected state in onClick()", state);
    this.select.emit(state);
    // this.service.selectedStateChanged(util.findStateByName(this.statesArr, state));
  }

  toString() {
    return `
      componentId: ${this.componentId},
      componentLabel: ${this.componentLabel},
      selectedState: ${this.selectedState},
      states: ${this.statesArr}
      `;
  }
}

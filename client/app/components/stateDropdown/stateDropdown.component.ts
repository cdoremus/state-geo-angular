import {Component, Input, Output, OnInit, AfterViewInit, EventEmitter} from "@angular/core";
import {State} from '../common/state';
import StateService from '../common/state.service';

@Component({
  selector: 'state-dropdown',
  templateUrl:  './stateDropdown.html',
  styleUrls: ['./stateDropdown.css']
})
export default class StateDropdownComponent implements OnInit {
      @Input() componentId: string;
      @Input() componentLabel: string;
      @Output() select: EventEmitter<State> = new EventEmitter<State>();
      @Input() states: State[];
      @Input() selectedState: State;


  constructor(private stateService: StateService) {
    // this.selectedState = {
    //   code: undefined,
    //   name: undefined,
    //   capital: undefined,
    //   adjacent: [],
    //   selected: undefined
    // };
  }

  ngOnInit(): void {
    this.populatePageData();
  }


  populatePageData(): void {
    console.log("StateDropdownComponent.populatePageData() states: ", this.states);
    this.stateService.selectedStateSubject.subscribe(state => this.selectedState = state);
    ;
  }

  /**
   * Emit new selected state and notify Rx Observable in StateService that the selected
   * state has changed.
   */
  onChange(selectedState: State): void {
    console.log("Selected state in StateDropdownComponent.onClick()", selectedState);
    this.select.emit(selectedState);
    this.stateService.selectedStateChanged(selectedState);
    this.selectedState = selectedState;
    this.stateService.selectedStateSubject.next(selectedState);
  }

  toString(): string {
    return `
      componentId: ${this.componentId},
      componentLabel: ${this.componentLabel},
      selectedState: ${this.selectedState},
      states: ${this.states}
      `;

  }
}

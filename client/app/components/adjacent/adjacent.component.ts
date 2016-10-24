import {Component, OnInit} from  "@angular/core";
import {State} from '../common/state';
import StateService from '../common/state.service';

@Component({
  selector: 'adjacent',
  styleUrls: ['./adjacent.css'],
  templateUrl:  './adjacent.html',
})
export default class AdjacentComponent implements OnInit {
  greeting: string;
  adjacentStates: State[];

  constructor(private stateService: StateService) {
    this.greeting = 'AdjacentComponent!';

  }

  ngOnInit(): void {
    this.stateService.queryAdjacentStates()
        .then((result: State[]) => this.adjacentStates = result);
  }

}



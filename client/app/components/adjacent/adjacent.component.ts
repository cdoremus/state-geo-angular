import {Component, OnInit} from  "@angular/core";
import {State} from '../common/state';
import StateService from '../common/state.service';

@Component({
  selector: 'adjacent',
  templateUrl:  './adjacent.html',
  styleUrls: ['./adjacent.css']
})
export default class AdjacentComponent implements OnInit {
  greeting: string;
  adjacentStates: State[];

  constructor(private stateService: StateService) {
    this.greeting = 'AdjacentComponent!';

  }

  ngOnInit() {
    this.stateService.queryAdjacentStates()
        .then(result => this.adjacentStates = result);
  }

}



import {Component} from  "angular2/core";
import StateService from '../common/state.service';

@Component({
  selector: 'adjacent',
  templateUrl:  'app/components/adjacent/adjacent.html',
  styleUrls: ['app/components/adjacent/adjacent.css'],
  providers: [StateService]
})
export default class AdjacentComponent {
  greeting: string;
  adjacentStates: any[];

  constructor(private stateService: StateService) {
    this.greeting = 'AdjacentComponent!';

    stateService.queryAdjacentStates()
        .then(result => this.adjacentStates = result.data);
  }

}



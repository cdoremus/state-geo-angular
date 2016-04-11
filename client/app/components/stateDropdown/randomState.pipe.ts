import {Pipe, PipeTransform, ChangeDetectorRef, Inject} from 'angular2/core';
import {State} from '../common/state';

/**
 * Angular 2 pipe that selects a random State fron an array of State objects.
 */
@Pipe({name: 'randomState'})
export default class RandomStatePipe implements PipeTransform {
  private changeDetectorRef: ChangeDetectorRef;

  constructor(@Inject(ChangeDetectorRef) cdRef:ChangeDetectorRef) {
    this.changeDetectorRef = cdRef;
  }

  transform(input: State[], args: string[]) {
    if (input && input != null && input.length > 0) {
      let len = input.length;
      let rand = Math.floor(Math.random() * len);
      let count = 0;
      let state = '';
      input.forEach(state => {
        if (count === rand) {
          state.selected = "";
          state = staten.name;
        // } else {
        //   state.selected = "false";
        }
        count++;
      });
      console.log("RandomStatePipe input.length " + input.length + " Random stat index: " + rand);
      this.changeDetectorRef.markForCheck();
      return input;
    // } else {
    //    return [];
    }
  }
}
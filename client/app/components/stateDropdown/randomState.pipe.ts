import {Pipe, PipeTransform, ChangeDetectorRef, Inject} from 'angular2/core';
import {State} from '../common/state';

/**
 * Angular 2 pipe that selects a random State fron an array of State objects
 * and changes its selected property to 'selected'.
 */
@Pipe({name: 'randomState', pure: false})
export default class RandomStatePipe implements PipeTransform {
  // private selectedStates: State[] = [];
  private changeDetectorRef: ChangeDetectorRef;

  constructor(@Inject(ChangeDetectorRef) cdRef:ChangeDetectorRef) {
    this.changeDetectorRef = cdRef;
  }

  transform(input: State[], args: string[]) {
    if (input && input != null && input.length > 0) {

      let len = input.length;
      let rand = Math.floor(Math.random() * len);
      let count = 0;
      input.forEach(state => {
        if (count === rand) {
          state.selected = 'selected';
        }
        count++;
      });
      console.log("RandomStatePipe random state: " + input[rand].name + ' with index ' + rand);
      // this.selectedStates.push(...input);

      // patch together a new array wfrom the old one with the random one having the selected property set
      // let newInput = [...input.slice(0, rand), Object.assign({}, input[rand], {selected: ""}), ...input.slice(rand + 1)];
      // console.log("New array from RandomStatePipe with selected index " + rand, newInput);
      // this.changeDetectorRef.markForCheck();
      // return newInput;

      this.changeDetectorRef.markForCheck();
      return input;
    }
  }
}
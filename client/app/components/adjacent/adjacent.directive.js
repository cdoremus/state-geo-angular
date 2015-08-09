import './adjacent.styl';
import {AdjacentController as controller} from './adjacent.controller';
import template from './adjacent.html';

//export const adjacentDirective = ()=> {
export const adjacentDirectiveOld = ()=> {
  return {
    controller,
    template,
    controllerAs: 'vm',
    scope: {},
    replace: true,
    restrict: 'E'
  }
};

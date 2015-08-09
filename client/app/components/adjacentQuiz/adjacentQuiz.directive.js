import './adjacentQuiz.styl';
import {AdjacentQuizController as controller} from './adjacentQuiz.controller';
import template from './adjacentQuiz.html';

export const adjacentQuizDirective = ()=> {
  return {
    controller,
    template,
    controllerAs: 'vm',
    scope: {},
    replace: true,
    restrict: 'E'
  }
};

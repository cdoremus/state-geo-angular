//import {adjacentQuizDirective} from './adjacentQuiz.directive';
import {adjacentQuizDirective} from './adjacentQuiz.component';
import angular from 'angular';
import uiRouter from 'angular-ui-router';


export const adjacentQuiz = angular.module('adjacentQuiz', [uiRouter])
  .config(($stateProvider) => {
    $stateProvider.state('adjacentQuiz', {
      url: '/adjacentQuiz',
      template: '<adjacent-quiz></adjacent-quiz>' 
    })
  })
  .directive('adjacentQuiz', adjacentQuizDirective);

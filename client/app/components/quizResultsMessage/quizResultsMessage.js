//import {quizResultsMessageDirective} from './quizResultsMessage.directive';
import {quizResultsMessageDirective} from './quizResultsMessage.component';
import angular from 'angular';
import uiRouter from 'angular-ui-router';


export const quizResultsMessage = angular.module('quizResultsMessage', [uiRouter])
  .config(($stateProvider) => {
    $stateProvider.state('quizResultsMessage', {
      url: '/quizResultsMessage',
      template: '<quiz-results-message></quiz-results-message>' 
    })
  })
  .directive('quizResultsMessage', quizResultsMessageDirective);

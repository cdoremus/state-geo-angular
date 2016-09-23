import {capitalQuizDirective} from './capitalQuiz.component';
import {CapitalQuizService as capitalQuizService} from './capitalQuiz.service';
import angular from 'angular';
import uiRouter from 'angular-ui-router';


export const capitalQuiz = angular.module('capitalQuiz', [uiRouter])
  .config(($stateProvider) => {
    $stateProvider.state('capitalQuiz', {
      url: '/capitalQuiz',
      template: '<capital-quiz></capital-quiz>' 
    })
  })
  .component('capitalQuiz', capitalQuizDirective)
  .service('capitalQuizService', capitalQuizService);

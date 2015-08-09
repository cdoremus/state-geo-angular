//import {adjacentDirective} from './adjacent.directive';
import {adjacentDirective} from './adjacent.component';
import angular from 'angular';
import uiRouter from 'angular-ui-router';


export const adjacent = angular.module('adjacent', [uiRouter])
  .config(($stateProvider) => {
    $stateProvider.state('adjacent', {
      url: '/adjacent',
      template: '<adjacent></adjacent>'
    });
  })
  .directive('adjacent', adjacentDirective);

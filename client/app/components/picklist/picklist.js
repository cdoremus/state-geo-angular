import {picklistComponent} from './picklist.component';
import {PicklistService as picklistService} from './picklist.service';
import angular from 'angular';
import uiRouter from 'angular-ui-router';


export const picklist = angular.module('picklist', [uiRouter])
  .config(($stateProvider) => {
    $stateProvider.state('picklist', {
      url: '/picklist',
      template: '<picklist></picklist>' 
    })
  })
  .component('picklist', picklistComponent)
  .service('picklistService', picklistService);

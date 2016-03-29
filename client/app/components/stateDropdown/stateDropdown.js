import {stateDropdownComponent} from './stateDropdown.component';
import {StateDropdownService as stateDropdownService} from './stateDropdown.service';
import angular from 'angular';
import uiRouter from 'angular-ui-router';


export const stateDropdown = angular.module('stateDropdown', [uiRouter])
  .config(($stateProvider) => {
    $stateProvider.state('stateDropdown', {
      url: '/stateDropdown',
      template: '<state-dropdown></state-dropdown>' 
    })
  })
  .component('stateDropdown', stateDropdownComponent)
  .service('stateDropdownService', stateDropdownService);

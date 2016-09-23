import angular from 'angular';
import {homeComponent} from './home.component';

export const home = angular.module('home', [])
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider.state('home', {
    url: '/',
    template: '<home></home>'
  });
})
.component('home', homeComponent);

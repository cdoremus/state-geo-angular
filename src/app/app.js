// we don't need to use a variable
// or the from keyword when importing a css/styl file
// thanks the the styles loader it gets added as a
// <style> tag in the head by default but can be changed
import 'normalize.css';
import {appDirective} from './app.directive';
// the angular libs are just common js
// and therefore we can assume they were
// exported using the default keyword in ES2015
// so we can import each module
// with any name we see fit.
// Note that the actual value are just strings except angular itself
// because that's how angular decided to export
// their auxillary modules
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
// because we exported a named variable
// without using default keyword
// we must import it with the brackets
import {home} from './components/home/home';
import {adjacent} from './components/adjacent/adjacent';
import {adjacentQuiz} from './components/adjacentQuiz/adjacentQuiz';
import {capitalQuiz} from './components/capitalQuiz/capitalQuiz';
import {stateDropdown} from './components/stateDropdown/stateDropdown';
import {quizResultsMessage} from './components/quizResultsMessage/quizResultsMessage';
import {login} from './components/login/login';
import {picklist} from './components/picklist/picklist';

import {StateService as stateService} from './components/common/state.service';
import {UserService as userService} from './components/common/user.service';


angular.module('app', [
  uiRouter,
  ngAnimate,
  ngCookies,
  // home is the module, the angular module
  // because that's what we exported in home.js
  // all angular modules have a name
  // property who's value is the name you set the
  // module to be
  home.name,
  adjacent.name,
  adjacentQuiz.name,
  capitalQuiz.name,
  picklist.name,
  quizResultsMessage.name,
  stateDropdown.name,
  login.name
])
.component('app', appDirective)
.service('stateService', stateService)
.service('userService', userService);

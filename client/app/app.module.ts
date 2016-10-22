import { NgModule, ApplicationRef } from '@angular/core';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import AppComponent from './app';
import HomeComponent from './components/home/home.component';
import AdjacentComponent from './components/adjacent/adjacent.component';
import AdjacentQuizComponent from './components/adjacentQuiz/adjacentQuiz.component';
import CapitalQuizComponent  from './components/capitalQuiz/capitalQuiz.component';
import QuizResultsMessageComponent  from './components/quizResultsMessage/quizResultsMessage.component';
import LoginComponent from './components/login/login.component';
import PicklistComponent from './components/picklist/picklist.component';
import StateDropdownComponent from './components/stateDropdown/stateDropdown.component';
import StateService from './components/common/state.service';

import { routing } from './app.routing';

import { removeNgStyles, createNewHosts } from '@angularclass/hmr';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing
  ],
  declarations: [
    AppComponent,
    AdjacentComponent,
    AdjacentQuizComponent,
    HomeComponent,
    CapitalQuizComponent,
    QuizResultsMessageComponent,
    LoginComponent,
    PicklistComponent,
    StateDropdownComponent
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    StateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {}
  hmrOnInit(store) {
    console.log('HMR store', store);
  }
  hmrOnDestroy(store) {
    let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    removeNgStyles();
  }
  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}

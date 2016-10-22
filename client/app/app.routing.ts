import { RouterModule, Routes } from '@angular/router';

import AdjacentComponent from './components/adjacent/adjacent.component';
import AdjacentQuizComponent from './components/adjacentQuiz/adjacentQuiz.component';
import HomeComponent from './components/home/home.component';
import CapitalQuizComponent from './components/capitalQuiz/capitalQuiz.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: '/home', component: HomeComponent },
  { path: '/capitalQuiz', component: CapitalQuizComponent },
  { path: '/adjacentQuiz', component: AdjacentQuizComponent },
  { path: '/adjacent', component: AdjacentComponent }

];

export const routing = RouterModule.forRoot(routes);

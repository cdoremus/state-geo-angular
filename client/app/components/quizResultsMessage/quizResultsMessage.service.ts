import {Injectable} from "@angular/core";

@Injectable()
export default class QuizResultsMessageService {
  greeting: string;
  constructor() {
    this.greeting = 'QuizResultsMessageService!';
  }

  getGreeting() {
    return this.greeting;
  }
}

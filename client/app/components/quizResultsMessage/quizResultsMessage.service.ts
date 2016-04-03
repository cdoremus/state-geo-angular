import {Injectable} from "angular2/core";

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

import {Injectable} from "angular2/core";

@Injectable()
class CapitalQuizService {
  greeting: string;

  constructor() {
    this.greeting = 'CapitalQuizService!';
  }

  getGreeting() {
    return this.greeting;
  }
}

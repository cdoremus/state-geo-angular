import {Injectable} from "@angular/core";

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

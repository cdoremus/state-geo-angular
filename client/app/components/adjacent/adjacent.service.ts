import {Injectable} from "@angular/core";

@Injectable()
export default class AdjacentService {
  greeting: string;
  constructor() {
    this.greeting = "AdjacentService!";
  }

  getGreeting() {
    return this.greeting;
  }
}
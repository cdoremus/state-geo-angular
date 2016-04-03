import {Http, Headers} from "angular2/http";
import {Injectable} from "angular2/core";

@Injectable()
export default class UserService {
  users: any[];
  currentUser: any;

  constructor(private http: Http) {
    /* Array of user objects */
    this.users = [];
    /* Current user object with the following structure:
     * {username:string, password:string, displayName:string, roles:Array<string>}
    */
    this.currentUser = undefined;

  }

  findUser(username) {
    return this.http.get(`/user/${username}`);
  }

  /**
  * Checks that a user is authenticated by checking for the user in the MongoDB 
  * database, returning a currentUser object. If the user is not found, undefined
  * is returned.
  */
  login(username, password) {
    // TODO
  }

  isAllowed(allowedRoles, userRoles) {
  let i = userRoles.length;
    while (i--) {
       if (this._contains(allowedRoles, userRoles[i])) {
           return true;
       }
    }
    return false;
  }

  _contains(array, obj) {
    let i = array.length;
    while (i--) {
       if (array[i] === obj) {
           return true;
       }
    }
    return false;
  }
}

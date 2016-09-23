import {$inject, $http} from 'angular';

class UserService {
  constructor($http, $state, $cookies) {
  	// console.log('LoginService constructor');
    this.http = $http;
    this.state = $state;
    this.cookies = $cookies;
    /* Array of user objects */
    this.users = [];
    /* Current user object with the following structure:
     * {username:string, password:string, displayName:string, roles:Array<string>}
    */
    this.currentUser = undefined;

  }
  
  findUser(username) {
    return this.http.get('/user/' + username);
  }

  /**
  * Checks that a user is authenticated by checking for the user in the MongoDB 
  * database, returning a currentUser object. If the user is not found, undefined
  * is returned.
  */
  login(username, password) {
    console.log('Logging in with user ' + username + " and pwd: " + password);
    this.findUser(username)
    .then(result => {
      this.currentUser = result.data;
      console.log('User: ' + this.currentUser);
      if (this.currentUser !== undefined 
        && this.currentUser !== ''
        && this.currentUser.password === password) {
        console.log('Login OK');
        this.cookies.put('username', this.currentUser.username);
        this.cookies.put('roles', this.currentUser.roles);
        this.state.go("home");
      } else {
        console.log('Login failure');
        this.state.go("login");      
      }
      return this.currentUser;
    })
    .catch(error => console.log("ERROR", error))
    .finally(results => { return results })
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

UserService.$inject = ['$http', '$state', '$cookies'];

export {UserService};

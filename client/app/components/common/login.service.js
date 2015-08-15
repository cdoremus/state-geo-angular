import {$inject, $http} from 'angular';

class LoginService {
  constructor($http, $state, $cookies) {
  	// console.log('LoginService constructor');
    this.http = $http;
    this.state = $state;
    this.cookies = $cookies;
    this.users = [];
    this.currentUser = {};

  }
  
  findUser(username) {
    return this.http.get('/user/' + username);
  }


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

LoginService.$inject = ['$http', '$state', '$cookies'];

export {LoginService};

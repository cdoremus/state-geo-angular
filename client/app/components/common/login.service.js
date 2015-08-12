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
  
  populateUsers() {
    return this.http.get('/users.json');
  }

  login(username, password) {
    console.log('Logging in with user ' + username + " and pwd: " + password);
    this.populateUsers()
    .then(result => {
      this.users = result.data;
      console.log('Users: ' + this.users + ' of length ' + this.users.length);
      let found = false;
      let len = this.users.length;
      for (let i = 0; i < len; i++) {
        this.currentUser = this.users[i];
        // console.log("User: '" + this.currentUser.username + "'");
        // console.log("Pwd: '" + this.currentUser.password + "'");
         if (this.currentUser.username.trim() == username.trim() 
            && this.currentUser.password.trim() == password.trim()) {
            console.log("User found!!");
            found = true;
            break;
         }
      }
      if (found) {
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

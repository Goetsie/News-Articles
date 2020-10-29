import { Component, OnInit } from '@angular/core';
import { UserLogin } from '../models/user-login.model';
import { User } from '../models/user.model';
import { AuthenticateService } from '../services/authenticate.service';
import { UserService } from '../services/user.service';
import { Role } from '../models/role.model';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  submitted = false;

  // newUser: User = new User('', '');
  newUser: User = new User(0, '', '', '', '', '', 1);
  // userLogin: UserLogin = new UserLogin(this.newUser.username, this.newUser.password);


  constructor(private _userService: UserService, private _authenticateService: AuthenticateService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    // Add new user
    this.submitted = true;
    console.log("A new user wants to create an account", this.newUser);

    this._userService.addUser(this.newUser).subscribe(); // Add the new user

    // // Automaticallly log the new user in
    // this._authenticateService.authenticate(this.userLogin).subscribe(result => {
    //   localStorage.setItem("token", result.token);
    //   console.log("Token is:", result.token);
    // });

    // // If the user is logged in --> logged in true
    // this._authenticateService.authenticate(this.userLogin).subscribe(result => {
    //   this._authenticateService.isLoggedin.next(result.token ? true : false);
    // });

  }

}

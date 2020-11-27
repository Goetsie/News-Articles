import { Component, OnInit } from '@angular/core';
import { UserLogin } from '../models/user-login.model';
import { User } from '../models/user.model';
import { AuthenticateService } from '../services/authenticate.service';
import { UserService } from '../services/user.service';
import { Role } from '../models/role.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  submitted = false;

  newUser: User = new User(0, '', '', '', '', '', 1);

  constructor(private _userService: UserService, private _authenticateService: AuthenticateService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  // Add new user & login
  onSubmit() {

    this.submitted = true;
    console.log("A new user wants to create an account", this.newUser);

    this._userService.addUser(this.newUser).subscribe(
      result => {
        console.log("User is added:", result);
        // Login the user
        this.loginUser(new UserLogin(result.username, result.password));
      }
    );
  }

  loginUser(userLogin) {
    // Automaticallly log the new user in
    this._authenticateService.authenticate(userLogin).subscribe(
      result => {

        console.log("Token is:", result.token);

        if (result.token) {
          // Save in localStorage before setting the user as logged in!
          localStorage.setItem("token", result.token);
          localStorage.setItem("loggedUser", result.username);
          localStorage.setItem("userID", result.userID.toString());
          localStorage.setItem("userRole", result.role.name);
          this._authenticateService.isLoggedin.next(result.token ? true : false);
          this.router.navigate(['']); // Redirect to home page after signup
          this.snackBar.open("Welcome " + result.username + "!", "", { duration: 5000 });
        } else {
          this.snackBar.open("Something went wrong, please try again!", "", { duration: 7000 });
        }

      });

  }

}

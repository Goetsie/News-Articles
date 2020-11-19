import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../services/authenticate.service';
import { UserLogin } from '../models/user-login.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})
export class SecurityComponent implements OnInit {

  submitted = false;

  userLogin: UserLogin = new UserLogin('', '');
  username = "test";

  // loggedIn = false;

  loggedIn = this._authenticateService.isLoggedIn();

  constructor(private _authenticateService: AuthenticateService, private router: Router, private snackBar: MatSnackBar) {
    this._authenticateService.isLoggedin.subscribe(e => {
      //Do something with the value of this BehaviorSubject
      //Every time the value changes this code will be triggered
      console.log("Changed isLoggedIn", this._authenticateService.isLoggedIn());
      if (this._authenticateService.isLoggedIn()) {
        this.loggedIn = this._authenticateService.isLoggedIn();
        this.username = localStorage.getItem("loggedUser");
      }
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;
    console.log("user tries to login!!", this.userLogin);

    this._authenticateService.authenticate(this.userLogin).subscribe(

      result => {
        console.log("Token is:", result.token);

        localStorage.setItem("token", result.token);

        this._authenticateService.isLoggedin.next(result.token ? true : false);
        localStorage.setItem("loggedUser", result.username);
        localStorage.setItem("userID", result.userID.toString());
        localStorage.setItem("userRole", result.role.name);
        this.router.navigate(['']); // Redirect to home page after logging in
        this.snackBar.open("Welcome " + this.userLogin.username + "!", "", { duration: 5000 });
      },
      error => {
        console.log("OOOOOOPs", error);
        this.snackBar.open("Check your username and password!", "", { duration: 7000 });
        this.submitted = false;
        this.userLogin = new UserLogin('', '');
      }
      // () => {
      //   console.log("Login completed");
      //   this.router.navigate(['']); // Redirect to home page after logging in
      //   this.snackBar.open("Welcome " + this.userLogin.username + "!", "", { duration: 5000 });
      // }

    );


  }

  // Logout
  clearLocalStorage() {
    console.log("Logout, remove token");
    localStorage.removeItem("token");
    localStorage.removeItem("loggedUser");
    localStorage.removeItem("userID");
    this._authenticateService.isLoggedin.next(false);
    this.router.navigate(['']); // Redirect to home page after logout
  }

}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticateService } from '../security/services/authenticate.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @Output() sidenavClose = new EventEmitter();

  username = null;
  loggedIn = false;
  userRole = this._authenticateService.ifUser();

  constructor(private _authenticateService: AuthenticateService, private router: Router, private snackBar: MatSnackBar) {
    this.loggedIn = this._authenticateService.isLoggedIn();
    this.username = localStorage.getItem('loggedUser');

    this._authenticateService.isLoggedin.subscribe(e => {
      if (this._authenticateService.isLoggedIn()) {
        this.username = localStorage.getItem('loggedUser');
        this.loggedIn = this._authenticateService.isLoggedIn();
      } else {
        this.username = null;
        this.loggedIn = this._authenticateService.isLoggedIn();
      };

      this._authenticateService.user.subscribe(e => {
        if (this._authenticateService.ifUser()) {
          this.userRole = localStorage.getItem('userRole');
        } else {
          this.userRole = null;
        }
      })
    })
  }

  ngOnInit(): void {
    this.loggedIn = this._authenticateService.isLoggedIn();
    this.username = localStorage.getItem('loggedUser');
    this.userRole = localStorage.getItem("userRole");
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }

  logout() {
    console.log("User wants to logout");
    localStorage.clear();
    this.snackBar.open("See you later " + this.username + "!", "", { duration: 5000 });
    this._authenticateService.isLoggedin.next(false);
    this.router.navigate(['']); // Redirect to home page after logout
  }

}

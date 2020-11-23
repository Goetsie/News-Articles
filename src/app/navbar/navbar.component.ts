import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from '../security/services/authenticate.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();

  username = null;
  // loggedIn = this._authenticateService.isLoggedIn();
  loggedIn = false;

  // userRole = localStorage.getItem("userRole");
  userRole = this._authenticateService.ifUser();

  constructor(private _authenticateService: AuthenticateService, private router: Router) {

    this.loggedIn = this._authenticateService.isLoggedIn();
    this.username = localStorage.getItem('loggedUser');
    // this.userRole = localStorage.getItem("userRole");

    this._authenticateService.isLoggedin.subscribe(e => {
      if (this._authenticateService.isLoggedIn()) {
        this.username = localStorage.getItem('loggedUser');
        this.loggedIn = this._authenticateService.isLoggedIn();
        console.log("CHANGEDDDDDD", localStorage.getItem('loggedUser'));
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

  logout(){
    console.log("User wants to logout");
    // localStorage.removeItem("token");
    // localStorage.removeItem("loggedUser");
    // localStorage.removeItem("userRole");
    localStorage.clear();
    console.log("User logged out");
    this._authenticateService.isLoggedin.next(false);
    this.router.navigate(['']); // Redirect to home page after logout
  }


  ngOnInit(): void {
    this.loggedIn = this._authenticateService.isLoggedIn();
    this.username = localStorage.getItem('loggedUser');
    // this.userRole = localStorage.getItem("userRole");
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

}

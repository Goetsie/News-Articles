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
  loggedIn = this._authenticateService.isLoggedIn();

  constructor(private _authenticateService: AuthenticateService, private router: Router) {

    this._authenticateService.isLoggedin.subscribe(e => {
      if (this._authenticateService.isLoggedIn()) {
        this.username = localStorage.getItem('loggedUser');
        this.loggedIn = this._authenticateService.isLoggedIn();
      } else {
        this.username = null;
        this.loggedIn = this._authenticateService.isLoggedIn();
      }
    })
  }

  logout(){
    console.log("User wants to logout");
    localStorage.removeItem("token");
    localStorage.removeItem("loggedUser");
    this._authenticateService.isLoggedin.next(false);
    this.router.navigate(['']); // Redirect to home page after logout
  }


  ngOnInit(): void {
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

}

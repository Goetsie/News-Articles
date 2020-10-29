import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthenticateService } from '../security/services/authenticate.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();

  loggedUser = null;

  constructor(private _authenticateService: AuthenticateService) {

    this._authenticateService.isLoggedin.subscribe(e => {
      if (this._authenticateService.isLoggedIn()) {
        this.loggedUser = localStorage.getItem('loggedUser');
      } else {
        this.loggedUser = null;
      }
    })
  }



  ngOnInit(): void {
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

}

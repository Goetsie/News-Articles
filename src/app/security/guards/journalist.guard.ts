import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticateService } from '../services/authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class JournalistGuard implements CanActivate {
  constructor(private _authenticateService: AuthenticateService, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // If an admin can do everything that a journalist can, it should be added in the journalist guard
    if (this._authenticateService.ifUser() === "Journalist" || this._authenticateService.ifUser() === "Admin") {
      return true;
    } else {
      this.router.navigate(['/login']); // Redirect user to home page if he is not authenticated
    }
  }
  
}

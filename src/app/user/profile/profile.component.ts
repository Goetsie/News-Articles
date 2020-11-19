import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/security/models/user.model';
import { UserService } from 'src/app/security/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

user: User;
submitted = false;

  constructor(private _userService: UserService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this._userService.getUser(parseInt(localStorage.getItem('userID'))).subscribe(
      result =>{
        console.log("Result:", result)
        this.user = result;
      }
    )
  }

  onSubmit(){
    this.submitted = true;
    console.log("User wants to change his profile");

    this._userService.updateUser(this.user.userID, this.user).subscribe(
      result => {
        console.log("Udated profile:", result);
        this.snackBar.open(this.user.firstName + ", your changes are saved!", "", { duration: 5000 });
        this.submitted = false;
      }
    )

  }

}

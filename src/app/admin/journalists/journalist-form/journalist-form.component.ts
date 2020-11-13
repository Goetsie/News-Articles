import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/security/models/user.model';
import { UserService } from 'src/app/security/services/user.service';

@Component({
  selector: 'app-journalist-form',
  templateUrl: './journalist-form.component.html',
  styleUrls: ['./journalist-form.component.scss']
})
export class JournalistFormComponent implements OnInit {


  submitted = false;

  journalist: User = new User(0, '', '', '', '', '', 2);

  constructor(private _userService: UserService, private snackBar: MatSnackBar) { }

  onSubmit() {
    // Add new journalist
    this.submitted = true;
    console.log("The admin wants to add this journalist:", this.journalist);

    this._userService.addUser(this.journalist).subscribe(
      result => {
        // Handle result
        console.log("Add journalist result:", result);
        if (result) {
          this.journalist.userID = result.userID; // Save the real ID
          console.log("Journamist is added");
          this.openSnackBar(("Journalist '" + this.journalist.firstname + " " + this.journalist.lastname + "' is saved!"), "Undo")
        }

      }
      // () => {
      //   console.log("Journamist is added");
      //   this.openSnackBar(("Journalist '" + this.journalist.firstname + "' is saved!"), "Undo")
      // }
    );
  }

  // Snackbar
  openSnackBar(message, action) {
    let snackBarRef = this.snackBar.open(message, action, { duration: 5000 });

    snackBarRef.afterDismissed().subscribe(() => {
      console.log("The snackbar was dimissed");
    });

    snackBarRef.onAction().subscribe(() => {
      console.log("The snackbar action was triggerd");

      if (action != "Dismiss") {

        // Undo the action --> delete the newly created journalist
        this._userService.deleteUser(this.journalist.userID).subscribe(
          () => {
            console.log("Action is undone, new journalist is deleted");
            this.snackBar.open("Action is undone", 'Dismiss', { duration: 3000 });
          }
        );
      }
    });

  }

  ngOnInit(): void {
  }

}

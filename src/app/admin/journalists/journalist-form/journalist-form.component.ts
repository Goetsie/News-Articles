import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/security/models/user.model';
import { UserService } from 'src/app/security/services/user.service';

@Component({
  selector: 'app-journalist-form',
  templateUrl: './journalist-form.component.html',
  styleUrls: ['./journalist-form.component.scss']
})
export class JournalistFormComponent implements OnInit {

  submitted = false;
  update = false;

  journalist: User = new User(0, '', '', '', '', '', 2);

  constructor(private _userService: UserService, private snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router) {
    if (this.route.snapshot.paramMap.get('id')) {
      this.update = true;
      const journalistID = this.route.snapshot.paramMap.get('id');
      console.log("Parameter in link --> update journalist with id:", journalistID);
      this._userService.getUser(journalistID).subscribe(
        result => {
          console.log("Result:", result);
          this.journalist = result;
        }
      );
    }
  }

  onSubmit() {
    if (!this.update) {
      // Add new journalist
      this.submitted = true;
      console.log("The admin wants to add this journalist:", this.journalist);

      this._userService.addUser(this.journalist).subscribe(
        result => {
          console.log("Add journalist result:", result);
          if (result) {
            this.journalist.userID = result.userID; // Save the real ID
            console.log("Journalist is added");
            this.openSnackBar(("Journalist '" + this.journalist.firstName + " " + this.journalist.lastName + "' is saved!"), "Undo");
            this.router.navigate(['/journalists']);
          }

        }
      );
    } else {
      // Update journalist
      this.submitted = true;
      console.log("The admin wants to update this journalist:", this.journalist);
      this._userService.updateUser(this.journalist.userID, this.journalist).subscribe(
        result => {
          console.log("Update journalist result:", result);
          console.log("Journalist is updated");
          this.openSnackBar(("Journalist '" + this.journalist.firstName + " " + this.journalist.lastName + "' is saved!"), "")
          this.router.navigate(['/journalists']);
        },
        error => {
          console.log("Error:", error);
        }
      );
    }
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
        if (!this.update) {
          // Undo the action --> delete the newly created journalist
          this._userService.deleteUser(this.journalist.userID).subscribe(
            () => {
              console.log("Action is undone, new journalist is deleted");
              this.snackBar.open("Action is undone", 'Dismiss', { duration: 3000 });
            }
          );
        }

      }
    });
  }

  ngOnInit(): void {
  }

}

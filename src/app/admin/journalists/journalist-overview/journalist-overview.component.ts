import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { User } from 'src/app/security/models/user.model';
import { UserService } from 'src/app/security/services/user.service';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-journalist-overview',
  templateUrl: './journalist-overview.component.html',
  styleUrls: ['./journalist-overview.component.scss']
})
export class JournalistOverviewComponent implements OnInit {

  journalists: User[];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['lastName', 'firstName', 'username', 'email', 'actions'];


  constructor(private _userService: UserService, private router: Router, private route: ActivatedRoute, public dialog: MatDialog, private snackBar: MatSnackBar) {
    this._userService.getUsers()
      .pipe(
        map(users => users.filter(user => user.role.name == "Journalist")), // Only get the journalists
        tap(t => console.log("All journalists:", t))
      )
      .subscribe(
        result => {
          this.journalists = result;

          this.dataSource = new MatTableDataSource(this.journalists);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log("Filter value:", filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  newJournalist() {
    console.log("The admin wants to create a new journalist");
    this.router.navigate(['/journalist-form']);
  }

  deleteJournalist(journalist: User) {
    console.log("The admin wants to delete the journalist with ID:", journalist.userID);
    this.openDialog(journalist);
  }

  editJournalist(journalistID: number) {
    console.log("Admin wants to edit the journalist with id:", journalistID);
    this.router.navigate(['/journalist-form', { id: journalistID }]);
  }

  openDialog(journalist) {
    console.log("Open dialog", journalist);
    let dialogRef = this.dialog.open(ConfirmDialogComponent, { data: { journalist: journalist } });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Dialog result:", result);
      if (result) {
        // Delete journalist
        console.log("Admin wants to delete the journalist");
        this._userService.deleteUser(journalist.userID).subscribe(
          result => {
            if (result) {
              console.log("Journalist is deleted");

              let index = this.journalists.findIndex(
                (item, index) => item.userID === journalist.userID);
              console.log("Index:", index);
              this.trackByFn(index);
              this.dataSource = this.journalists.filter(item => item.userID !== journalist.userID); // Remove the journalist from html table
              this.trackByFn(index);

              this.openSnackBar("'" + journalist.firstName + " " + journalist.lastName + "' is deleted", "Dismiss", journalist);
            }
          }
        );
      } else {
        // Nothing
        console.log("Admin canceled the delete");
        this.openSnackBar("'" + journalist.firstName + " " + journalist.lastName + "' is not deleted", "Dismiss");
      }
    });
  }

  // Snackbar
  openSnackBar(message, action, journalist?) {
    let snackBarRef = this.snackBar.open(message, action, { duration: 5000 });

    snackBarRef.afterDismissed().subscribe(() => {
      console.log("The snackbar was dimissed");
      if (journalist) {
        console.log("New journalists list:", this.journalists);
      }
    });

    snackBarRef.onAction().subscribe(() => {
      if (action != "Dismiss") {
        console.log("The snackbar action was triggerd");
      }
    });

  }

  trackByFn(i: number) {
    return i
  }

  ngOnInit(): void {
  }

}

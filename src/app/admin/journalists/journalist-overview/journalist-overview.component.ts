import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { User } from 'src/app/security/models/user.model';
import { UserService } from 'src/app/security/services/user.service';

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


  constructor(private _userService: UserService, private router: Router, private route: ActivatedRoute) {
    this._userService.getUsers()
      .pipe(
        map(users => users.filter(user => user.role.name == "Journalist")), // Only get the journalists
        tap(t => console.log("All journalists:", t))
      )
      .subscribe(
        result => {
          if (result.length == 0) {
            this.journalists = null;
          } else {
            this.journalists = result;
          }

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

  newJournalist(){
    console.log("The admin wants to create a new journalist");
    this.router.navigate(['/journalist-form']);
    // Navigate to journalist form
  }

  ngOnInit(): void {
  }

}

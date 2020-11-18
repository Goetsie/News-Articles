import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { Reaction } from 'src/app/articles/models/reaction.model';
import { ReactionService } from 'src/app/articles/services/reaction.service';

@Component({
  selector: 'app-my-reactions',
  templateUrl: './my-reactions.component.html',
  styleUrls: ['./my-reactions.component.scss']
})
export class MyReactionsComponent implements OnInit {

  reactions: Reaction[];

  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['article.title', 'content', 'date', 'actions'];

  constructor(private _reactionService: ReactionService, private router: Router, private snackBar: MatSnackBar) {
    console.log("UserID:", parseInt(localStorage.getItem("userID")));
    this._reactionService.getReactions()
      .pipe(
        map(reactions => reactions.filter(reaction => reaction.userID == parseInt(localStorage.getItem("userID")))), // Get all the reactions of the user that is logged in
        
        tap(t => console.log("All my reactions:", t))
      )
      .subscribe(
        result => {
          if (result.length == 0) {
            this.reactions = null;
          } else {
            this.reactions = result;
          }
          this.dataSource = new MatTableDataSource(this.reactions);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          // Change the colums where the filter must filter
          this.dataSource.filterPredicate = function (data, filter: string): boolean {
            return  data.article.title.toLowerCase().includes(filter) || data.content.toLowerCase().includes(filter) || data.date.toLowerCase().includes(filter) ;
          }
          console.log("Datasource", this.dataSource);
        });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log("Filter value:", filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  showArticle(id: number) {
    console.log("Show article:", id);
    this.router.navigate(['/articles', id]);
  }

  ngOnInit(): void {
    // this.dataSource.filterPredicate = function (data, filter: string): boolean {
    //   return data.content.toLowerCase().includes(filter);
    //   // return data.content.toLowerCase().includes(filter) || data.symbol.toLowerCase().includes(filter) || data.position.toString().includes(filter);

    // };
  }


}

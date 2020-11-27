import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/security/models/user.model';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {


  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    console.log("Data:", data.journalist)
  }

  ngOnInit(): void {
  }

}

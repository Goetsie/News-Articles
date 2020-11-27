import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog-tag',
  templateUrl: './confirm-dialog-tag.component.html',
  styleUrls: ['./confirm-dialog-tag.component.scss']
})
export class ConfirmDialogTagComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    console.log("Data:", data.tag)
  }

  ngOnInit(): void {
  }
}

import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {
  public message: String;
  public progress: number;
  @Output() public onUploadFinished = new EventEmitter();


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    } else {

      console.log("Upload File");

      let fileToUpload = <File>files[0];
      console.log("File name:", fileToUpload.name);
      const formData = new FormData();
      formData.append('file', fileToUpload, fileToUpload.name);

      console.log(formData.get('file'));

      this.http.post("https://localhost:44348/api/Upload", formData, { reportProgress: true, observe: 'events' })
        .subscribe(event => {
          if (event.type == HttpEventType.UploadProgress) {
            console.log("Uploading file");
            this.progress = Math.round(100 * event.loaded / event.total);
          } else if (event.type === HttpEventType.Response) {
            console.log("Upload completed!");
            this.message = 'Upload completed!';
            this.onUploadFinished.emit(event.body); // event body = database path
          }
        },
        error => console.log('oops', error)
        )
    }

  }

}

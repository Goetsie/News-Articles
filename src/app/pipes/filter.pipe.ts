import { identifierModuleUrl } from '@angular/compiler';
import { Pipe, PipeTransform } from '@angular/core';
import { empty } from 'rxjs';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, sName: string, tagID: number): any {
    console.log("sName:", sName);
    console.log("tagID:", tagID);
    if (value) {

      console.log("value:", value);

      // No filter applied
      if (sName == "" && tagID == 0) {
        console.log("Return value", value);
        return value;
      }

      var articleArray = [];
      for (let i = 0; i < 22; i++) {
        // Where to search in
        let searchIn: string = value[i].title + value[i].body;

        // Zoeken op tagID en string
        if(sName !== "" && tagID != 0 ){
          console.log("Search string and tag");
          if (searchIn.includes(sName) && value[i].tagID == tagID) {
            articleArray.push(value[i]);
          }
        }
        // Enkel zoeken op een string
        else if (sName != "") {
          console.log("Search string");
          if (searchIn.includes(sName)) {
            articleArray.push(value[i]);
          }
          
        }
        // Enkel zoeken op tagID 
        else if (tagID !== 0) {
          console.log("Search tag");
          console.log("TagID is not 0");
          if (value[i].tagID == tagID) {
            articleArray.push(value[i]);
          }
        }

      }
      console.log("article array:", articleArray);
      return articleArray;
    }
  }

}

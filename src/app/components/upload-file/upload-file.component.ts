import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {
  private image:ImageSelected =  null;
  userID=localStorage.getItem('myId');
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  onUploadFinish(event) {
    console.log(event);
    this.image = new ImageSelected;
    this.image.image = event.src;
    this.image.name = event.file.name;
  }

  sendImage(){
    if(this.image != null){
      console.log('send image');
      console.log(this.image.image.split(',')[1]);
      this.http.post('https://tallerjdpautos.herokuapp.com/user/agregarfoto/'+this.userID, {
        imgUrl: this.image.image.split(',')[1],
        name: this.image.name
      }).subscribe((d) => {
        console.log(d);
      })
      window.location.reload();
    }
  }

}

class ImageSelected {
  public name: String;
  public image: String;
}

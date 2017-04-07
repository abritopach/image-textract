import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Transfer } from 'ionic-native';

import { Environment } from '../../environments/environment'

/*
  Generated class for the UploadImageService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UploadImageService {

  imageURL: any;
  environment: Environment;

  constructor(public http: Http) {
    //console.log('Hello UploadImageService Provider');
    this.environment = new Environment("DEVELOPMENT");
  }

  upload(imagePath: any, imageNewPath: any) {

    let filename = imagePath.split('/').pop();
    console.log("filename: " + filename);

    let options = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "image/jpg",
    };

    const fileTransfer = new Transfer();

    // Don't have the data yet
    return new Promise(resolve => {
      fileTransfer.upload(imageNewPath, this.environment.getURL() + 'upload-image', options).then((data) => {
        //console.log(data);
        this.imageURL = data.response;
        resolve(this.imageURL);
      }, (err) => {
        console.log(JSON.stringify(err));
      });
    });
  }

}

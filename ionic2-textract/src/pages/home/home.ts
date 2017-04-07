import { Component } from '@angular/core';
import { NavController, Platform, ActionSheetController, LoadingController, AlertController } from 'ionic-angular';

import { Camera, File} from 'ionic-native';

import {ExtractTextService} from '../../providers/extract-text-service/extract-text-service';
import {UploadImageService} from '../../providers/upload-image-service/upload-image-service';

declare var cordova: any;

@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
    providers: [ExtractTextService, UploadImageService]
})
export class HomePage {

    imgURI: any;
    imagePath: any;
    imageNewPath: any;
    result: any;

    constructor(public navCtrl: NavController, public actionsheetCtrl: ActionSheetController, public platform: Platform,
                public extractTextService: ExtractTextService, public loadingCtrl: LoadingController,
                public alertCtrl: AlertController, public uploadImageService: UploadImageService) {

    }

    optionsForType(type: any) {
        let source;
        let destination;
        switch (type) {
            case 0:
                console.log("Cámara.");
                source = Camera.PictureSourceType.CAMERA;
                destination = Camera.DestinationType.FILE_URI;
                break;
            case 1:
                console.log("Galería.");
                source = Camera.PictureSourceType.PHOTOLIBRARY;
                destination = Camera.DestinationType.FILE_URI;
                break;
        }
        // Return options object.
        return {
            destinationType: destination, // URI path in local filesystem.
            sourceType: source,
            allowEdit: false,
            encodingType: Camera.EncodingType.JPEG,
            saveToPhotoAlbum: false,
            correctOrientation:true,
            quality : 100
        };
    }

    getPicture(type: any) {
        let options = this.optionsForType(type);
        Camera.getPicture(options).then((file_uri) => {

            this.imgURI = file_uri;

             var sourceDirectory = file_uri.substring(0, file_uri.lastIndexOf('/') + 1);
             var sourceFileName = file_uri.substring(file_uri.lastIndexOf('/') + 1, file_uri.length);
             sourceFileName = sourceFileName.split('?').shift();
             File.copyFile(sourceDirectory, sourceFileName, cordova.file.externalApplicationStorageDirectory, sourceFileName).then((result: any) => {
             this.imagePath = file_uri;
             //console.log("this.imagePath: " + this.imagePath);
             this.imageNewPath = result.nativeURL;
             //console.log("this.imageNewPath: " + this.imageNewPath);
             this.processImage(this.imagePath, this.imageNewPath);
             }, (err) => {
             console.log("ERROR -> " + JSON.stringify(err));
             })

        }, (err) => {
            console.log("ERROR -> " + JSON.stringify(err))
            this.showAlert('ERROR', JSON.stringify(err) + " Test in mobile phone.");
        });
    }

    openMenu() {
        let actionSheet = this.actionsheetCtrl.create({
            title: 'Choose image',
            cssClass: 'action-sheets-basic-page',
            buttons: [
                {
                    text: 'Camera',
                    icon: !this.platform.is('ios') ? 'camera' : null,
                    handler: () => {
                        //onsole.log('Take Picture Clicked');
                        this.getPicture(0);
                    }
                },
                {
                    text: 'Gallery',
                    icon: !this.platform.is('ios') ? 'image' : null,
                    handler: () => {
                        //console.log('Select picture clicked');
                        this.getPicture(1);
                    }
                }
            ]
        });
        actionSheet.present();
    }

    processImage(imagePath: any, imageNewPath: any){
        let loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loader.present();

        // Upload image to Cloudinary.
        this.uploadImageService.upload(imagePath, imageNewPath)
            .then(data => {
                var imageURL = data;

                // Extract text from image.
                this.extractTextService.getText(imageURL)
                    .then(data => {
                        this.result = data;
                        if (this.result.success == false) this.showAlert('ERROR', this.result.message);
                        else {
                            console.log(this.result.text);
                            this.showAlert('Texto', this.result.message + ': ' + this.result.text);
                        }
                        loader.dismiss();
                        this.imagePath = '';
                    });
            });
    }

    showAlert(title: any, subTitle: any) {
        let alert = this.alertCtrl.create({
            title: title,
            subTitle: subTitle,
            buttons: ['OK']
        });
        alert.present();
    }


}

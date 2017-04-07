import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

import { Environment } from '../../environments/environment'

/*
  Generated class for the ExtractTextService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ExtractTextService {

    data: any;
    environment: Environment;

    constructor(public http: Http) {
        //console.log('Hello ExtractTextService Provider');
        this.environment = new Environment("DEVELOPMENT");
    }

    getText(imageURL: any) {

        // Don't have the data yet
        return new Promise(resolve => {

            let params: URLSearchParams = new URLSearchParams();
            params.set('imageURL', imageURL);

            // We're using Angular HTTP provider to request the data,
            // then on the response, it'll map the JSON data to a parsed JS object.
            // Next, we process the data and resolve the promise with the new data.
            this.http.get(this.environment.getURL() + 'extract-image-text', { search: params })
                .map(res => res.json())
                .subscribe(data => {
                    // We've got back the raw data, now generate the core schedule data
                    // and save the data for later reference
                    //console.log(data);
                    this.data = data;
                    resolve(this.data);
                },
                err => {
                    console.log("ERROR -> " + JSON.stringify(err));
                });
            });

    }

}

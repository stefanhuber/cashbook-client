import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

@Injectable()
export class ProjectProvider {

    constructor(public http:Http, protected storage:Storage) {    
    }

    listProjects() : Promise<any> {
        return new Promise<any> ((resolve, reject) => {            
            this.storage.get('token').then(token => {
                let headers = new Headers();
                headers.append('Authorization', 'Bearer ' + token);

                this.http.get('/api/projects', {
                    headers : headers
                }).map(response => response.json()).subscribe((response) => {
                    resolve(response);
                }, (e) => {
                    reject(e);
                });
            });
        });
    }

}

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';

@Injectable()
export class MemberProvider {

    constructor(public http: Http, protected storage:Storage, protected alertController:AlertController) {    
    }

    presentAlert() {
        let alert = this.alertController.create({
            title : 'Login failed' ,
            subTitle : 'Login failed, please try again!' ,
            buttons : ['Ok']
        });
        alert.present();
    }

    login(username:string, password:string) : Promise<any> {
        return new Promise<any> ((resolve, reject) => {
            this.http.post('/api/members/login', {
                username : username ,
                password : password
            }).map(response => {
                return response.json();
            }).subscribe(response => {
                this.storage.set('token', response.token + ":" + response.password);
                resolve();
            }, (e) => {
                this.presentAlert();
                reject(e);
            });
        });
    }

}

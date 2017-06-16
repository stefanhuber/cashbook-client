import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';

@Injectable()
export class MemberProvider {

    public static URI_ENDPOINT = "";

    constructor(public http: Http, protected storage:Storage, protected alertController:AlertController) {    
    }

    presentAlert() {
        let alert = this.alertController.create({
            title : 'Login fehlgeschlagen' ,
            subTitle : 'Der Login ist fehlgeschlagen, bitte versuchen Sie es erneut!' ,
            buttons : ['Ok']
        });
        alert.present();
    }

    login(username:string, password:string) : Promise<any> {
        return new Promise<any> ((resolve, reject) => {
            this.http.post(MemberProvider.URI_ENDPOINT + '/members/login', {
                username : username ,
                password : password
            }).map(response => {
                return response.json();
            }).subscribe(response => {
                this.storage.set('username', username);
                this.storage.set('token', response.token + ":" + response.password);
                resolve();
            }, (e) => {
                this.presentAlert();
                reject(e);
            });
        });
    }

}

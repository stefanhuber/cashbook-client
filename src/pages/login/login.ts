import { MemberProvider } from './../../providers/member/member';
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage({
    name : 'login'
})
@Component({
    templateUrl: 'login.html',
})
export class LoginPage {

    username:string;
    password:string;

    constructor(
        public navCtrl: NavController ,
        protected memberProvider: MemberProvider
    ) {}

    login() {
        this.memberProvider
            .login(this.username, this.password)
            .then(() => {
                this.navCtrl.setRoot('project-list');
            }).catch((e) => {
                console.error(e);
            });
    }

}

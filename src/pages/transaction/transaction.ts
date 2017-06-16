import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { TransactionProvider } from './../../providers/transaction/transaction';

@IonicPage({
    name : 'transaction' ,
    segment : 'transaction/:projectId' ,
    defaultHistory : ['project']
})
@Component({
    selector: 'page-transaction',
    templateUrl: 'transaction.html',
})
export class TransactionPage {

    projectId:string = "";
    amount:any = "";
    description:string = "";
    deposit:any = false;

    constructor(
        protected transactionProvider: TransactionProvider,
        protected alertController: AlertController,
        protected navParams: NavParams,
        public navCtrl: NavController) {
            this.projectId = this.navParams.data.projectId;
    }

    presentAlert() {
        this.alertController.create({
            title : 'Eingabefehler' ,
            subTitle : 'Bitte Überprüfen Sie Ihre Eingabe!' ,
            buttons : ['Ok']
        }).present();
    }

    save() {
        let amount = parseFloat(this.amount);

        if (amount > 0 && this.description.length > 0) {
            this.transactionProvider.initProject(this.projectId);
            this.transactionProvider.addTransaction(amount, this.description, this.deposit)
                .then(() => {
                    this.navCtrl.pop();
                }).catch((e) => {
                    this.presentAlert();
                });
        } else {
            this.presentAlert();
        }
    }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TransactionProvider } from './../../providers/transaction/transaction';

@IonicPage({
    name : 'project' ,
    segment : 'project/:projectId' ,
    defaultHistory : ['project-list']
})
@Component({
    selector: 'page-project',
    templateUrl: 'project.html',
})
export class ProjectPage {

    projectId:string;
    project:any = { name : '' , owner: '' };
    transactions:any[] = [];

    constructor(
        protected storage: Storage , 
        protected transactionProvider: TransactionProvider ,
        public navCtrl: NavController ,        
        public navParams: NavParams) {
            this.projectId = navParams.data.projectId;            
    }

    ionViewDidEnter() {
        this.storage.get(this.projectId)
            .then((data) => {
                this.project = data;
                return this.transactionProvider.initProject(this.projectId);                
            }).then(() => {
                return this.transactionProvider.syncProject();
            }).then(() => {
                return this.transactionProvider.listTransactions()                    
            }).then(transactions => {
                this.transactions = transactions;
            });   
    }

    addTransaction() {
        this.navCtrl.push('transaction', {projectId:this.projectId});
    }

}

import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';

declare var PouchDB;
PouchDB.plugin(PouchDBFind);

@Injectable()
export class TransactionProvider {

    public static DB_ENDPOINT = "";

    getEndpoint(token:string, projectId:string) : string {
        return TransactionProvider.DB_ENDPOINT.replace('TOKEN', token).replace('PROJECTID', projectId);
    }

    pouchdb:any;
    projectId:string;

    constructor(protected storage:Storage) {
    }

    initProject(projectId:string) {
        return new Promise<any> ((resolve, reject) => {
            this.projectId = projectId;
            this.pouchdb = new PouchDB(projectId);
            this.pouchdb.createIndex({
                index : {
                    fields : ['timestamp','type']
                }
            }).then(() => {
                resolve();
            }).catch((e) => {
                console.error(e);
                reject();
            });
        });

    }

    listTransactions() {
        return new Promise<any> ((resolve, reject) => {
            this.pouchdb.find({
                selector : {
                    timestamp : {$gte: null} ,
                    type : 'transaction'
                } ,
                sort: ['timestamp']
            }).then(result => {
                resolve(result.docs);
            }).catch(e => {
                console.error(e);
                reject(e);
            });
        });        
    }

    syncProject() {
        return new Promise<any> ((resolve, reject) => {
            this.storage.get('token')
                .then(token => {
                    return this.pouchdb.sync(this.getEndpoint(token, this.projectId));
                }).then(() => {
                    resolve();
                }).catch(e => {
                    console.error(e);
                    reject(e);
                });
        });
    }

    addTransaction(amount:number, description:string, deposit:boolean = false) {
        return new Promise<any> ((resolve, reject) => {
            this.storage.get('username')
                .then(username => {
                    this.pouchdb.post({
                        type        : 'transaction' ,
                        amount      : amount ,
                        description : description ,
                        timestamp   : Math.round((new Date()).getTime() / 1000) ,
                        member      : username ,
                        deposit     : deposit
                    }).then(response => {
                        resolve(response);                    
                    }).catch((e) => {
                        reject(e);
                    });
                });
        });                
    }

}

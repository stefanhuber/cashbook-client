import { ProjectProvider } from './../../providers/project/project';
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, AlertController } from 'ionic-angular';

@IonicPage({
    name : 'project-list'
})
@Component({
    templateUrl: 'project-list.html',
})
export class ProjectListPage {

    projects:any[] = [];

    constructor(
        public navCtrl: NavController ,
        protected storage: Storage ,
        protected alertController: AlertController ,
        protected projectProvider: ProjectProvider) {
    }

    openProject(project:any) {
        this.navCtrl.push('project', { projectId: project._id });
    }

    openMemberPrompt(projectId:any) {
        this.alertController.create({
            title : 'Member hinzufügen' ,
            message : 'Fügen Sie einen Member zu ihrem Projekt hinzu' ,
            inputs : [
                {
                    name : 'name' ,
                    placeholder : 'Name'
                }
            ] ,
            buttons : [
                {
                    text : 'Ok' ,
                    handler : data => {
                        if (data.name) {
                            this.projectProvider.addMemberToProject(projectId, data.name)
                                .then(() => {
                                    console.log("success");
                                }).catch((e) => {
                                    console.error(e);
                                });
                        }
                    }
                }, 
                {
                    text : 'Abbrechen' ,
                    handler : data => {
                    }   
                }
            ]
        }).present();
    }

    openProjectPrompt() {
        this.alertController.create({
            title : 'Projekt anlegen' ,
            message : 'Geben Sie einen Projektnamen an und erstellen Sie eine neues Projekt' ,
            inputs : [
                {
                    name : 'name' ,
                    placeholder : 'Name'
                }
            ] ,
            buttons : [
                {
                    text : 'Ok' ,
                    handler : data => {
                        if (data.name) {
                            this.projectProvider.createProject(data.name)
                                .then(() => {
                                    this.loadProjects();
                                });
                        }
                    }
                }, 
                {
                    text : 'Abbrechen' ,
                    handler : data => {
                    }   
                }
            ]
        }).present();
    }

    loadProjects() {
        Promise.all([
            this.projectProvider.listProjects() ,
            this.storage.get('username')
        ]).then((promised) => {
            this.projects = promised[0].map((item) => {
                item.doc.isOwner = item.doc.owner == promised[1];                    
                return item.doc;
            });
        });
    }

    ionViewDidLoad() {     
        this.loadProjects();
    }

}

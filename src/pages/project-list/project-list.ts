import { ProjectProvider } from './../../providers/project/project';
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage({
    name : 'project-list'
})
@Component({
    templateUrl: 'project-list.html',
})
export class ProjectListPage {

    projects:any[];

    constructor(public navCtrl: NavController, protected projectProvider:ProjectProvider) {
    }

    ionViewDidLoad() {     
        this.projectProvider.listProjects()
            .then((projects:any[]) => {
                this.projects = projects.map((item) => {
                    return item.doc;
                });
            });
    }

}

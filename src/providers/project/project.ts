import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

@Injectable()
export class ProjectProvider {

    public static URI_ENDPOINT = "";

    constructor(public http:Http, protected storage:Storage) {    
    }

    listProjects() : Promise<any> {
        return new Promise<any> ((resolve, reject) => {            
            this.storage.get('token').then(token => {
                let headers = new Headers();
                headers.append('Authorization', 'Bearer ' + token);

                this.http.get(ProjectProvider.URI_ENDPOINT + '/projects', {
                    headers : headers
                }).map(response => response.json()).subscribe((response) => {
                    let projectIds = [];
                    for (let item of response) {
                        projectIds.push(item.doc._id);
                        this.storage.set(item.doc._id, { name : item.doc.name , owner : item.doc.owner });
                    }
                    this.storage.set('project-list', projectIds);
                    resolve(response);
                }, (e) => {
                    reject(e);
                });
            });
        });
    }

    createProject(projectName:string) : Promise<any> {
        return new Promise<any> ((resolve, reject) => {            
            this.storage.get('token').then(token => {
                let headers = new Headers();
                headers.append('Authorization', 'Bearer ' + token);

                this.http.post(ProjectProvider.URI_ENDPOINT + '/projects', {
                    name:projectName,  
                }, {headers: headers}).map(response => response.json()).subscribe((response) => {
                    resolve(response);
                }, (e) => {
                    reject(e);
                });
            });
        });
    }

    addMemberToProject(projectId:string, memberName:string) : Promise<any> {
        return new Promise<any> ((resolve, reject) => {            
            this.storage.get('token').then(token => {
                let headers = new Headers();
                headers.append('Authorization', 'Bearer ' + token);

                this.http.post(ProjectProvider.URI_ENDPOINT + '/projects/'+projectId+'/members', {
                    member:memberName,  
                }, {headers: headers}).map(response => response.json()).subscribe((response) => {
                    resolve(response);
                }, (e) => {
                    reject(e);
                });
            });
        });
    }

    getProjectFromStorage(projectId) : Promise<any> {
        return this.storage.get(projectId);
    }

}

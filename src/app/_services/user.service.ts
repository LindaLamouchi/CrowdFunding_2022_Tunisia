import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8090/api/test/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }
  /*********************************************Users************************ */
  //Users Manipul.
  getAllUsers( ): Observable<any> {
    return this.http.get('http://localhost:8090/api/users/all',{responseType:'json'});
  }
  updateProfile(profile:any,id: number){
    this.http.put("http://localhost:8090/api/users/Profile/"+id, {
      "username": profile.username,
      "password": profile.password,
      "email": profile.email
   })
   .subscribe(
     () => {
      console.log('mise a jour effectuée avec succes!');
     },
     (error) => {
       console.log('Erreur ! : ' + error);
     }
   );
  }
  /*********************************Categories/domaines**************************** */
  getAllDomaines( ): Observable<any> {
    return this.http.get('http://localhost:8090/domaines/All',{responseType:'json'});
  }
  nouvDom(nom:String):Observable<any>{
    return this.http.post('http://localhost:8090/domaines/nouveauDomaine/',{"libelle":nom});
  }
/***************************************Projets************************************** */
getAllProjects( ): Observable<any> {
  return this.http.get('http://localhost:8090/projets/all/',{responseType:'json'});
}
getProjects( id:number): Observable<any> {
  return this.http.get('http://localhost:8090/projets/all/'+id,{responseType:'json'});
}
newProject(form:any,domId:number,responId:number):Observable<any>{
  return this.http.post("http://localhost:8090/projets/nouveauProjet/"+domId+'/'+responId, {
    "titre": form.titre,
    "contexte": form.contexte,
    "etat": "actif",
    "budget_But":form.budget_But,
    "budget_collecte":0
 })
 ;
}
getProject(id:number){
  return this.http.get('http://localhost:8090/projets/ById/'+id,{responseType:'json'});
}

deleteProject(id:number){
 return this.http.delete("http://localhost:8090/projets/delete/"+id).subscribe(data=>{
   alert(data);
 },
 err => {
   alert(err.error.message)
   location.reload();
 })
}
/************************************Contrat***********************/
getContrats( id:number): Observable<any> {
  return this.http.get('http://localhost:8090/purchase/all/'+id+'/',{responseType:'json'});
}
}


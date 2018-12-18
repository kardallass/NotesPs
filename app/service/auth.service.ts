import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import {LoadingController} from '@ionic/angular';
let apiUrl = 'https://www.drps-ofppt.ma/notes/mobile/';


export interface User {
  name: string;
  nom: string;

  role: number;
  id: string;
  efp: string;
  groupe: string;
  annee: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
currentUser: User;
  constructor(public loadingCtrl: LoadingController, public alertController: AlertController, private router: Router, private http: Http) { }
  async presentLoadingDefault() {
    let loading = await this.loadingCtrl.create({
      spinner: 'circles',
      message: `Connexion en cours ...`,
    });

    await loading.present();
  }




  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Problème d\'accès',
      subHeader: '',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
    }
    async serverAlert() {
      const alert = await this.alertController.create({
        header: 'Problème de Connexion',
        subHeader: '',
        message: 'Problème de connexion Internet où Pas de connexion avec le Serveur OFPPT. ',
        buttons: ['OK']
      });

      await alert.present();
      }
  login(name: string, pw: string){

    let headers = new Headers();
     headers.append('Content-Type', 'application/json');
     let datasend = '{"cef":"'+name+'","password":"'+pw+'"}';
       this.http.post(apiUrl+'retrieve-data.php', datasend, {headers: headers})
  .subscribe(data => {

data = JSON.parse(data["_body"]);
this.loadingCtrl.dismiss();

  if (data[0]['resultat'] === 'success') {
    this.currentUser = {
      name: name,
      id: data[0]['id'],
      nom: data[0]['nom'],
      efp: data[0]['efp'],
      groupe: data[0]['groupe'],
      annee: data[0]['annee'],
      role: 0
    };
    this.router.navigate(['/home']);
  } else
  if(data[0]['resultat'] === 'error') {
      this.presentAlert(data[0]['message']);
  }


  }, (err) => {
      this.loadingCtrl.dismiss();
      this.serverAlert();


});

  }
  RegisterUser(name: string, pw: string, code: string){
this.loadingCtrl.dismiss();
    let headers = new Headers();
     headers.append('Content-Type', 'application/json');
     let datasend = '{"cef":"'+name+'","password":"'+pw+'","code":"'+code+'"}';
       this.http.post(apiUrl+'inscription.php', datasend, {headers: headers})
  .subscribe(data => {

data = JSON.parse(data["_body"]);
this.loadingCtrl.dismiss();
  if (data[0]['resultat'] === 'success') {
    this.currentUser = {
      name: name,
      id: data[0]['id'],
      nom: data[0]['nom'],
      efp: data[0]['efp'],
      groupe: data[0]['groupe'],
      annee: data[0]['annee'],
      role: 0
    };
    this.router.navigate(['/home']);
  } else
  if(data[0]['resultat'] === 'error') {
      this.presentAlert(data[0]['message']);
  }


  }, (err) => {
      this.loadingCtrl.dismiss();
      this.serverAlert();


});

  }
  isLoggedIn() {
    return this.currentUser != null;
  }

  isAdmin() {
    return this.currentUser.role === 0;
  }

  logout() {
    this.currentUser = null;
    this.router.navigate(['/login']);

  }
}

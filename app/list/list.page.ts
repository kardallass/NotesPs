import { Component, OnInit } from '@angular/core';
import { AuthService } from './../service/auth.service';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import {LoadingController} from '@ionic/angular';
import { AlertController } from '@ionic/angular';
let apiUrl = 'https://www.drps-ofppt.ma/notes/mobile/get-note.php';
let  showSubmenu: boolean = false;


@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  languageShow: boolean = true;
  languageHide: boolean = false;
  private selectedItem: any;
  information: any;
public items: Array<{ title: string; note: string}> = [];

  constructor(private AuthService: AuthService, public alertController: AlertController, public loadingCtrl: LoadingController, private router: Router, private http: Http) { }

  toggleSection(i) {
    this.information[i].open = !this.information[i].open;
  }
  menuItemHandler(i){
    this.information[i].open = !this.information[i].open;

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
  async presentLoadingDefault() {
    let loading = await this.loadingCtrl.create({
      spinner: 'circles',
      message: `Chargement en cours ...`,
    });

    await loading.present();
  }

  ionViewWillEnter(){
    if(!this.AuthService.isLoggedIn()){
      this.router.navigate(['/login']);
    }else{
      this.presentLoadingDefault();
      this.listenotes(this.AuthService.currentUser.id);
    }
}

  listenotes(idstag: string){
    let headers = new Headers();
     headers.append('Content-Type', 'application/json');
     let datasend = '{"id":"'+idstag+'"}';
       this.http.post(apiUrl, datasend, {headers: headers})
  .subscribe(data => {
console.log(data);
this.loadingCtrl.dismiss();
data = JSON.parse(data["_body"]);

    this.information = data;


  }, (err) => {
      this.loadingCtrl.dismiss();
      this.serverAlert();


});

  }
  ngOnInit() {
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}

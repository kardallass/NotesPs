import { Component, OnInit } from '@angular/core';
import { AuthService } from './../service/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  user = {
    name: '',
    pw: ''
  };

  constructor(public alertController: AlertController, private router: Router, private AuthService: AuthService, public menuCtrl: MenuController) { }
  ionViewWillEnter(){
    this.menuCtrl.enable(false);
    if(this.AuthService.isLoggedIn()){
      this.router.navigate(['/home']);
    }

  }
  ionViewWillLeave(){
    this.menuCtrl.enable(true);
  }


  async presentAlert() {
      const alert = await this.alertController.create({
        header: 'Problème de connexion',
        subHeader: '',
        message: 'Vérifier votre CEF et/où Mot de passe.',
        buttons: ['OK']
      });

      await alert.present();
    }
    async connexionAlert() {
        const alert = await this.alertController.create({
          header: 'Problème de connexion',
          subHeader: '',
          message: 'Vérifier votre Connexion Internet.',
          buttons: ['OK']
        });

        await alert.present();
      }
      loginUser() {
        this.AuthService.presentLoadingDefault();
        this.AuthService.login(this.user.name, this.user.pw);

      }


}

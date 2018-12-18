import { Component } from '@angular/core';
import { AuthService } from './../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  user = {
    cef: '',
    name: '',
    nom: ''
  };
constructor(private router: Router, private AuthService: AuthService) {}
ionViewWillEnter(){
  if(!this.AuthService.isLoggedIn()){
    this.router.navigate(['/login']);
  }

  this.user.name = this.AuthService.currentUser.name;
  this.user.nom = this.AuthService.currentUser.nom;
}



}

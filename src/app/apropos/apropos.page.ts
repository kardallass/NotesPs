import { Component, OnInit } from '@angular/core';
import { AuthService } from './../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-apropos',
  templateUrl: './apropos.page.html',
  styleUrls: ['./apropos.page.scss'],
})
export class AproposPage implements OnInit {

  constructor(private router: Router, private AuthService: AuthService) { }
  ionViewWillEnter(){
    if(!this.AuthService.isLoggedIn()){
      this.router.navigate(['/login']);
    }


}
ngOnInit() {
}
}

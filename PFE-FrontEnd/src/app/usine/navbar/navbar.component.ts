import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/Models/user';
import { AuthService } from 'src/app/Services/auth.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedin?: boolean ;
  user?:User;

  cin?:number;
  tel?:number;
  prenom?:String;
  nom?:String;
  lang?: any;

  constructor(
    private translateService :TranslateService,
  public authService: AuthService,
  private userService:UserService,
   private router: Router) {

    this.translateService.setDefaultLang('en');
    this.translateService.use(localStorage.getItem('lang') || 'en')
   } 

  ngOnInit(): void {
    this.lang = localStorage.getItem('lang') || 'en';
  this.userService.getUser(JSON.parse(localStorage.getItem('IdUser') || '[]') || []).subscribe(o=>{
    this.cin = o.cin;
    this.tel = o.tel;
    this.nom = o.nom;
    this.prenom = o.prenom;
    console.log("#################################################");
    console.log(o);
    console.log(o.idU);
    console.log("#################################################");
  });
  }


  changeLang(){
    if (this.lang=="en") {
      localStorage.setItem("lang","fr");
      location.reload();
    }    
    if (this.lang=="fr") {
      localStorage.setItem("lang","en");
      location.reload();
    }
  }


  onLogout(){
    this.authService.logout();
    
  }

}


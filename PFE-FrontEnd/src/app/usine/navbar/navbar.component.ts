import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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


  constructor(
  public authService: AuthService,
  private userService:UserService,
   private router: Router) {} 

  ngOnInit(): void {
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

  onLogout(){
    this.authService.logout();
    
  }

}


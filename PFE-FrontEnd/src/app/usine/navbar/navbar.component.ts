import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/Models/user';
import { AuthService } from 'src/app/Services/auth.service';
import { UserService } from 'src/app/Services/user.service';
import { ethers } from 'ethers';
import { OperationTank } from 'src/app/Models/operationTank';
declare let require: any;
declare let window: any;
let RemplissageUsineAdress = require('/build/contracts/RemplissageUsine.json');
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedin?: boolean;
  user?: User;
  connected !: boolean;
  con?:String;
  cin?: number;
  tel?: number;
  prenom?: String;
  nom?: String;
  lang?: any;

  constructor(
    private translateService: TranslateService,
    public authService: AuthService,
    private userService: UserService,
    private router: Router) {

    this.translateService.setDefaultLang('en');
    this.translateService.use(localStorage.getItem('lang') || 'en')
  }

  ngOnInit(): void {
    this.reloadDataUinseRemplissage01()
    this.lang = localStorage.getItem('lang') || 'en';
    this.userService.getUser(JSON.parse(localStorage.getItem('IdUser') || '[]') || []).subscribe(o => {
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


  OpTankRemplissageUsineTabs!: OperationTank[];
  async reloadDataUinseRemplissage01() {
    if (typeof window.ethereum !== 'undefined') {
      try {  
      const depKEY = Object.keys(RemplissageUsineAdress.networks)[0];
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        RemplissageUsineAdress.networks[depKEY].address,
        RemplissageUsineAdress.abi,
        signer
      );
      this.OpTankRemplissageUsineTabs = await contract.getOperationTanksUsine();
      this.connected =true 
      this.con = "connected"
      localStorage.setItem("state",JSON.stringify(this.con));
    } catch (error) {
      this.connected = false
      this.con = "notconnected"
      localStorage.setItem("state",JSON.stringify(this.con));
    }

    }
  }

  async requestAccount() {
    if (typeof window.ethereum !== 'undefined') {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      location.reload();
    }
    console.log("it does work ")
  }









  changeLang() {
    if (this.lang == "en") {
      localStorage.setItem("lang", "fr");
      location.reload();
    }
    if (this.lang == "fr") {
      localStorage.setItem("lang", "en");
      location.reload();
    }
  }


  onLogout() {
    this.authService.logout();

  }

}


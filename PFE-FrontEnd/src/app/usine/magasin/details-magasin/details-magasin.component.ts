import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Magasin } from 'src/app/Models/magasin';
import { MagasinService } from 'src/app/Services/magasin.service';

@Component({
  selector: 'app-details-magasin',
  templateUrl: './details-magasin.component.html',
  styleUrls: ['./details-magasin.component.css']
})
export class DetailsMagasinComponent implements OnInit {

  id!: number;
  idM!: any;
  magasin?:Magasin = new Magasin();

  constructor(
    private translateService :TranslateService,
    private dialogClose: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private magasinService: MagasinService) {
      this.translateService.setDefaultLang('en');
      this.translateService.use(localStorage.getItem('lang') || 'en')
     }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
  
    this.magasinService.getMagasin(JSON.parse(localStorage.getItem('IdMag') || '[]') || []).subscribe(o =>{
      this.magasin = o;
      this.idM=this.magasin?.idMag;
      //console.log(typeof this.OneOffer);
      console.log(this.magasin);
      console.log(this.idM);
  });
}

  closeDetails(){
    this.dialogClose.closeAll();
  }

}

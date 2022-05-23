import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Centre } from 'src/app/Models/centre';
import { CentreCollecteService } from 'src/app/Services/centre-collecte.service';

@Component({
  selector: 'app-details-centre-collecte',
  templateUrl: './details-centre-collecte.component.html',
  styleUrls: ['./details-centre-collecte.component.css']
})
export class DetailsCentreCollecteComponent implements OnInit {

  id!: number;
  idC!: any;
  centre?:Centre = new Centre();

  constructor(
    private translateService :TranslateService,
    private dialogClose: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private centreCollecteService: CentreCollecteService) {
      this.translateService.setDefaultLang('en');
      this.translateService.use(localStorage.getItem('lang') || 'en')
     }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
  
    this.centreCollecteService.getCentre(JSON.parse(localStorage.getItem('IdCentre') || '[]') || []).subscribe(o =>{
      this.centre = o;
      this.idC=this.centre?.idCentre;
      //console.log(typeof this.OneOffer);
      console.log(this.centre);
  });
}

  closeDetails(){
    this.dialogClose.closeAll();
  }

}

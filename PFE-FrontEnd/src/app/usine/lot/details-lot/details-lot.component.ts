import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Lot } from 'src/app/Models/lot';
import { LotService } from 'src/app/Services/lot.service';

@Component({
  selector: 'app-details-lot',
  templateUrl: './details-lot.component.html',
  styleUrls: ['./details-lot.component.css']
})
export class DetailsLotComponent implements OnInit {

  id!: number;
  idC!: any;
  lot?:Lot = new Lot();

  constructor(
    private translateService :TranslateService,
    private dialogClose: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private lotService: LotService) { 
      this.translateService.setDefaultLang('en');
      this.translateService.use(localStorage.getItem('lang') || 'en')
    }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
  
    this.lotService.getLot(JSON.parse(localStorage.getItem('IdLot') || '[]') || []).subscribe(o =>{
      this.lot = o;
      this.idC=this.lot?.idL;
      //console.log(typeof this.OneOffer);
      console.log(this.lot);
  });
}

  closeDetails(){
    this.dialogClose.closeAll();
  }

}

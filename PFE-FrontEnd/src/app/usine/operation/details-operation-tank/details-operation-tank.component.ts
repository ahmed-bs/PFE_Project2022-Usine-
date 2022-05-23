import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { OperationTank } from 'src/app/Models/operationTank';
import { OperationService } from 'src/app/Services/operation.service';
@Component({
  selector: 'app-details-operation-tank',
  templateUrl: './details-operation-tank.component.html',
  styleUrls: ['./details-operation-tank.component.css']
})
export class DetailsOperationTankComponent implements OnInit {

  id!: number;
  idO!: any;
  operation?:OperationTank = new OperationTank();

  constructor(
    private translateService :TranslateService,
    private dialogClose: MatDialog,
    private route: ActivatedRoute,private router: Router,
    private operationService: OperationService) { 
      this.translateService.setDefaultLang('en');
      this.translateService.use(localStorage.getItem('lang') || 'en')
    }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
  
    this.operationService.getOperationTank(JSON.parse(localStorage.getItem('IdOperationTank') || '[]') || []).subscribe(o =>{
      this.operation = o;
      this.idO=this.operation?.idOpTank;
      //console.log(typeof this.OneOffer);
      console.log(this.operation);
  });
}

  closeDetails(){
    this.dialogClose.closeAll();
  }

}

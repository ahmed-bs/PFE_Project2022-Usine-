import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {Lot } from 'src/app/Models/lot';
import { DetailsLotComponent } from '../details-lot/details-lot.component';
import { UpdateLotComponent } from '../update-lot/update-lot.component';
import { CreateLotComponent } from '../create-lot/create-lot.component';
import { LotService } from 'src/app/Services/lot.service';
import { TankService } from 'src/app/Services/tank.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-liste-lot',
  templateUrl: './liste-lot.component.html',
  styleUrls: ['./liste-lot.component.css']
})
export class ListeLotComponent implements OnInit {


  @ViewChild('paginator') paginator!:MatPaginator;
  // AddForSotedData
  @ViewChild(MatSort) matSort!:MatSort;

  intervalId?:any;
  idContenu?: string;
  idTitle?: string;
  Toast!: string[];
  counter: number = 0;
  ShowToast: string = 'hide';

  ELEMENT_DATA?:Lot[];
  // Lot?:Lot;
  dataSource!:MatTableDataSource<any>;
  displayedColumns: string[] = ['idL','produit','qteLot','tank','qtePriseTank','date','action'];

  constructor(
    private translateService :TranslateService,
    private lotService: LotService,
    private tankService:TankService,
    private router: Router,
    private dialog:MatDialog) {
      this.translateService.setDefaultLang('en');
      this.translateService.use(localStorage.getItem('lang') || 'en')
     }


    ngOnInit() {
      this.reloadData();

      this.idContenu = 'TostSuccessContenu';
      this.idTitle = 'TostSuccessTile';
  
      this.Toast = JSON.parse(localStorage.getItem('Toast') || '[]') || [];
      if (this.Toast[0] == 'Success') {
        console.log('Toast est n est pas vide');
        this.showToast();
      } else {
        console.log('Toast Vide');
      }
  
     
    }
  
    reloadData() {
        this.lotService.getLots().subscribe(o =>{
        this.ELEMENT_DATA= o;
        this.dataSource = new MatTableDataSource(o);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort =this.matSort;
        console.log(this.dataSource);
        console.log(this.ELEMENT_DATA);});
      
    }
  
   

    deleteLot(id:number){
      let confirmation =confirm("Êtes-vous sûr de supprimer le Lot numero :"+id+" ??")
      if(confirmation)
      this.lotService.deleteLot(id).subscribe(()=>{
        this.Toast[0] = 'Success';
        this.Toast[1] ='Lot a été supprimé avec succès';
        localStorage.setItem('Toast', JSON.stringify(this.Toast));
        window.location.reload();
      },
      (error) => {
        this.idContenu = 'TostDangerContenu';
        this.idTitle = 'TostDangerTile';
        this.Toast[0] = 'Failed';
        this.Toast[1] ='Échec de la suppression du Lot !!';
        this.showToast();
      }
    );
  }
  
  
  
    detailsLot(lot:Lot){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      localStorage.setItem('IdLot', JSON.stringify(lot.idL));
      this.dialog.open(DetailsLotComponent, dialogConfig);
      //this.router.navigate(['employees/admin/detailemployee', id]);
    }
  
    updateLot(Lot:Lot){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      localStorage.setItem('IdLot', JSON.stringify(Lot.idL));
      this.dialog.open(UpdateLotComponent, dialogConfig);
      //this.router.navigate(['employees/admin/updateemployee', id]);
    }
  
    onOpenDialogCreate():void{
      this.tankService.getQteG().subscribe(i =>{

    if(i>0){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      this.dialog.open(CreateLotComponent, dialogConfig);
    }
    else{
      this.idContenu = 'TostDangerContenu';
      this.idTitle = 'TostDangerTile';
      this.Toast[0] = 'Failed';
      this.Toast[1] ='Vous ne pouvez pas effectuer cette operation car la qte dans les tanks est zero !!';
      this.showToast();
    }
    });
    }
  
  
  
    filterData($event:any){
      this.dataSource.filter = $event.target.value;
    }

    showToast() {
      if (this.ShowToast == 'hide') {
        setTimeout(() => {
          this.ShowToast = 'show';
          console.log(this.ShowToast);
        }, 1);
      }
  
      setTimeout(() => {
        this.ShowToast = 'hide';
        this.Toast = [];
        localStorage.setItem('Toast', JSON.stringify(this.Toast));
        console.log(this.ShowToast);
      }, 6100);
      this.intervalId = setInterval(() => {
        this.counter = this.counter + 1;
        console.log(this.counter);
        if (this.counter === 6)
        clearInterval(this.intervalId);
      }, 1000);
      this.counter=0
  
    }
  
  }

import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UpdateMagasinComponent } from '../update-magasin/update-magasin.component';
import { DetailsMagasinComponent } from '../details-magasin/details-magasin.component';
import { CreateMagasinComponent } from '../create-magasin/create-magasin.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Magasin } from 'src/app/Models/magasin';
import { MagasinService } from 'src/app/Services/magasin.service';
import {Location} from "@angular/common";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-liste-magasin',
  templateUrl: './liste-magasin.component.html',
  styleUrls: ['./liste-magasin.component.css']
})
export class ListeMagasinComponent implements OnInit {

  @ViewChild('paginator') paginator!:MatPaginator;
  // AddForSotedData
  @ViewChild(MatSort) matSort!:MatSort;

  intervalId?:any;
  idContenu?: string;
  idTitle?: string;
  Toast!: string[];
  counter: number = 0;
  ShowToast: string = 'hide';

  ELEMENT_DATA?:Magasin[];
  magasin?:Magasin;
  dataSource!:MatTableDataSource<any>;
  displayedColumns: string[] = ['idMag','nomMag','adresse','ville','tel','action'];

  constructor(
    private translateService :TranslateService,
    private location:Location,
    private magasinService: MagasinService,
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
        this.magasinService.getMagasins().subscribe(o =>{
        this.ELEMENT_DATA= o;
        this.dataSource = new MatTableDataSource(o);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort =this.matSort;
        console.log(this.dataSource);
        console.log(this.ELEMENT_DATA);});
      
    }
  
   

    deleteMagasin(id:number){
      let confirmation =confirm("Êtes-vous sûr de supprimer le magasin où son id est egale à : "+id+" ??")
      if(confirmation)
      this.magasinService.deleteMagasin(id).subscribe(()=>{
        this.Toast[0] = 'Success';
        this.Toast[1] ='magasin a été supprimé avec succès';
        localStorage.setItem('Toast', JSON.stringify(this.Toast));
        // window.location.reload();
        this.onClose();
      },
      (error) => {
        this.idContenu = 'TostDangerContenu';
        this.idTitle = 'TostDangerTile';
        this.Toast[0] = 'Failed';
        this.Toast[1] ='Échec de la suppression du magasin !!';
        this.showToast();
      }
    );
  }
  
  
  
    detailsMagasin(magasin:Magasin){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      localStorage.setItem('IdMag', JSON.stringify(magasin.idMag));
      this.dialog.open(DetailsMagasinComponent, dialogConfig);
      //this.router.navigate(['employees/admin/detailemployee', id]);
    }
  
    updateMagasin(magasin:Magasin){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      localStorage.setItem('IdMag', JSON.stringify(magasin.idMag));
      this.dialog.open(UpdateMagasinComponent, dialogConfig);
      //this.router.navigate(['employees/admin/updateemployee', id]);
    }
  
    onOpenDialogCreate():void{
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      this.dialog.open(CreateMagasinComponent, dialogConfig);
    }
  

  
    onReload(){
      // this.router.navigate([this.router.url]);
      this.router.navigateByUrl("/'agriculteur/bon/listeFournisseur",{skipLocationChange: true}).then( response=> {
       this.router.navigate([decodeURI(this.location.path())]);
     })
    }
    
    
    onClose() {
      this.dialog.closeAll();
      // this.gotoList();
      this.onReload();
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


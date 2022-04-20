import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CentreCollecteService } from 'src/app/Services/centre-collecte.service';
import { Centre } from 'src/app/Models/centre';
import { DetailsCentreCollecteComponent } from '../details-centre-collecte/details-centre-collecte.component';
import { UpdateCentreCollecteComponent } from '../update-centre-collecte/update-centre-collecte.component';
import { CreateCentreCollecteComponent } from '../create-centre-collecte/create-centre-collecte.component';
import {Location} from "@angular/common";

@Component({
  selector: 'app-liste-centre-collecte',
  templateUrl: './liste-centre-collecte.component.html',
  styleUrls: ['./liste-centre-collecte.component.css']
})
export class ListeCentreCollecteComponent implements OnInit {

  @ViewChild('paginator') paginator!:MatPaginator;
  // AddForSotedData
  @ViewChild(MatSort) matSort!:MatSort;

  intervalId?:any;
  idContenu?: string;
  idTitle?: string;
  Toast!: string[];
  counter: number = 0;
  ShowToast: string = 'hide';

  ELEMENT_DATA?:Centre[];
  // Centre?:Centre;
  dataSource!:MatTableDataSource<any>;
  displayedColumns: string[] = ['idCentre','nomCentre','adresse','ville','action'];

  constructor(
    private location:Location,
    private centreCollecteService: CentreCollecteService,
    private router: Router,
    private dialog:MatDialog) { }


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
        this.centreCollecteService.getCentres().subscribe(o =>{
        this.ELEMENT_DATA= o;
        this.dataSource = new MatTableDataSource(o);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort =this.matSort;
        console.log(this.dataSource);
        console.log(this.ELEMENT_DATA);});
      
    }
  
   

    deleteCentre(id:number){
      let confirmation =confirm("Êtes-vous sûr de supprimer le Centre numero :"+id+" ??")
      if(confirmation)
      this.centreCollecteService.deleteCentre(id).subscribe(()=>{
        this.Toast[0] = 'Success';
        this.Toast[1] ='Centre a été supprimé avec succès';
        localStorage.setItem('Toast', JSON.stringify(this.Toast));
        this.onClose();
      },
      (error) => {
        this.idContenu = 'TostDangerContenu';
        this.idTitle = 'TostDangerTile';
        this.Toast[0] = 'Failed';
        this.Toast[1] ='Échec de la suppression du Centre !!';
        this.showToast();
      }
    );
  }
  
  
  
    detailsCentre(centre:Centre){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      localStorage.setItem('IdCentre', JSON.stringify(centre.idCentre));
      this.dialog.open(DetailsCentreCollecteComponent, dialogConfig);
      //this.router.navigate(['employees/admin/detailemployee', id]);
    }
  
    updateCentre(centre:Centre){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      localStorage.setItem('IdCentre', JSON.stringify(centre.idCentre));
      this.dialog.open(UpdateCentreCollecteComponent, dialogConfig);
      //this.router.navigate(['employees/admin/updateemployee', id]);
    }
  
    onOpenDialogCreate():void{
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      this.dialog.open(CreateCentreCollecteComponent, dialogConfig);
    }
  

    // onReload(){
    //   this.router.navigate([this.router.url]);
    // }

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



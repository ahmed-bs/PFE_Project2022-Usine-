import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Operation } from 'src/app/Models/operation';
import { OperationService } from 'src/app/Services/operation.service';
import { TankService } from 'src/app/Services/tank.service';
import { ProduitService } from 'src/app/Services/produit.service';
import { CreateOperationRetraitComponent } from '../create-operation-retrait/create-operation-retrait.component';
import { CreateOperationComponent } from '../create-operation/create-operation.component';
// import { DetailsOperationRetraitComponent } from '../details-operation-retrait/details-operation-retrait.component';
import { DetailsOperationRetraitComponent } from '../details-operation-retrait/details-operation-retrait.component';
import {Location} from "@angular/common";
// import { UpdateOperationRetraitComponent } from '../update-operation-retrait/update-operation-retrait.component';

@Component({
  selector: 'app-liste-operation-retrait',
  templateUrl: './liste-operation-retrait.component.html',
  styleUrls: ['./liste-operation-retrait.component.css']
})
export class ListeOperationRetraitComponent implements OnInit {

  @ViewChild('paginator') paginator!:MatPaginator;
  // AddForSotedData
  @ViewChild(MatSort) matSort!:MatSort;

  intervalId?:any;
  idContenu?: string;
  idTitle?: string;
  Toast!: string[];
  counter: number = 0;
  ShowToast: string = 'hide';
  erreur =0;

  ELEMENT_DATA?:Operation[];
  operation?:Operation;
  dataSource!:MatTableDataSource<any>;
  v=0;
  q=0;
  p=0;
  displayedColumns: string[] = ['idOperation','qtePrise','code', 'dateOperation','magasin','produit', 'action'];
  constructor(private operationService: OperationService,
    private tankService:TankService,
    private location:Location,
    private produitService:ProduitService,
    private router: Router, private dialog:MatDialog) { }


    ngOnInit() {
      this.reloadData();
      console.log(this.tankService.getTanksQteLibre());

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
        this.operationService.getOperationsRetraits().subscribe(o =>{
        this.ELEMENT_DATA= o;
        this.dataSource = new MatTableDataSource(o);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort =this.matSort;
        console.log(this.dataSource);
        console.log(this.ELEMENT_DATA);});
      
    }
  
     deleteOperation(id: number) {
      this.operationService.getOperation(id).subscribe(o =>{
        this.ELEMENT_DATA= o;});
        console.log(this.ELEMENT_DATA);
        //console.log(this.id);
      let confirmation =confirm("Êtes-vous sûr de supprimer le Operation où son id est egale à : "+id+" ??")
      if(confirmation)
      this.operationService.deleteOperationR(id).subscribe(data => {
        this.Toast[0] = 'Success';
        this.Toast[1] ='Operation a été supprimé avec succès';
        localStorage.setItem('Toast', JSON.stringify(this.Toast));
        // window.location.reload();
        this.onClose();
      },
      (error) => {
        this.idContenu = 'TostDangerContenu';
        this.idTitle = 'TostDangerTile';
        this.Toast[0] = 'Failed';
        this.Toast[1] ='Échec de la suppression du Operation !!';
        this.showToast();
      }
    );
  }
  

  deleteOp(id: number){

    this.tankService.getTanksQteLibre().subscribe(o=>{
      console.log(o);
      this.q=o;
      this.operationService.getOperation(id).subscribe(a=>{
        console.log(a.poidsLait);
        this.p=a.poidsLait;

        if(this.p<=this.q){
          this.deleteOperation(id);
        }else{
          this.idContenu = 'TostDangerContenu';
          this.idTitle = 'TostDangerTile';
          this.Toast[0] = 'Failed';
          this.Toast[1] ='Vous ne pouvez pas supprimer cette opereation, car la quantite restante est inferieur a la quantite que vous voulez la supprimer !!';
          this.showToast();
        }
      });
  
      });
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


    detailsOperation(operation:Operation){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      localStorage.setItem('IdOperation', JSON.stringify(operation.idOperation));
      this.dialog.open(DetailsOperationRetraitComponent, dialogConfig);
      //this.router.navigate(['employees/admin/detailemployee', id]);
    }
  
    // updateOperationR(operation:Operation){
    //   const dialogConfig = new MatDialogConfig();
    //   dialogConfig.disableClose = true;
    //   dialogConfig.autoFocus = true;
    //   localStorage.setItem('IdOperation', JSON.stringify(operation.idOperation));
    //   this.dialog.open(UpdateOperationRetraitComponent, dialogConfig);
    //   //this.router.navigate(['employees/admin/updateemployee', id]);
    // }
  
    onOpenDialogCreate():void{
      this.produitService.getQteProduitsG().subscribe(o=>{
        console.log(o);
        if(o>0){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      this.dialog.open(CreateOperationRetraitComponent, dialogConfig);
    }
    else{
        this.erreur=1;
        this.idContenu = 'TostDangerContenu';
        this.idTitle = 'TostDangerTile';
        this.Toast[0] = 'Erreur';
        this.Toast[1] ='Le stock est vide !! \n Vous ne pouvez pas effectuer l\'operation de retrait !!';
        this.showToast();
    }
    });
}
  
    onOpenDialogCreate2():void{
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      this.dialog.open(CreateOperationRetraitComponent, dialogConfig);
    }
  
  
    filterData($event:any){
      this.dataSource.filter = $event.target.value;
    }
    showToast() {
      if (this.ShowToast == 'hide') {
        setTimeout(() => {
          this.ShowToast = 'show';
        }, 1);
      }
  
      setTimeout(() => {
        this.ShowToast = 'hide';
        this.Toast = [];
        localStorage.setItem('Toast', JSON.stringify(this.Toast));
      }, 9100);
      this.intervalId = setInterval(() => {
        this.counter = this.counter + 1;
        if (this.counter === 9)
        clearInterval(this.intervalId);
      }, 1000);
      this.counter=0
  
    }
  
  }



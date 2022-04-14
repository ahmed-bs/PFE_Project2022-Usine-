import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Operation } from 'src/app/Models/operation';
import { OperationService } from 'src/app/Services/operation.service';
import { TankService } from 'src/app/Services/tank.service';
import { CreateOperationTransformationComponent } from '../create-operation-transformation/create-operation-transformation.component';
import { CreateOperationComponent } from '../create-operation/create-operation.component';
import { DetailsOperationTransformationComponent } from '../details-operation-transformation/details-operation-transformation.component';
import { UpdateOperationComponent } from '../update-operation/update-operation.component';

@Component({
  selector: 'app-liste-operation-transformation',
  templateUrl: './liste-operation-transformation.component.html',
  styleUrls: ['./liste-operation-transformation.component.css']
})
export class ListeOperationTransformationComponent implements OnInit {

  @ViewChild('paginator') paginator!:MatPaginator;
  // AddForSotedData
  @ViewChild(MatSort) matSort!:MatSort;

  intervalId?:any;
  idContenu?: string;
  idTitle?: string;
  Toast!: string[];
  counter: number = 0;
  ShowToast: string = 'hide';

  ELEMENT_DATA?:Operation[];
  operation?:Operation;
  dataSource!:MatTableDataSource<any>;
  v=0;
  erreur=0;
  err="";
  p=0;
  q=0;
  displayedColumns: string[] = ['idOperation','poidsLait','tank','qtePrise','produit', 'dateOperation', 'action'];
  constructor(private operationService: OperationService,
    private tankService:TankService,
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
        this.operationService.getOperationsTransfs().subscribe(o =>{
        this.ELEMENT_DATA= o;
        this.dataSource = new MatTableDataSource(o);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort =this.matSort;
        console.log(this.dataSource);
        console.log(this.ELEMENT_DATA);});
        

    }

    deleteOperation(id: number) {
      let confirmation =confirm("Êtes-vous sûr de supprimer l'Operation où son id est egale à : "+id+" ??")
      if(confirmation)
      this.operationService.deleteOperationT(id).subscribe(()=>{
        this.Toast[0] = 'Success';
        this.Toast[1] ='Operation a été supprimé avec succès';
        localStorage.setItem('Toast', JSON.stringify(this.Toast));
        window.location.reload();
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

    // this.tankService.getTanksQteGenerale().subscribe(o=>{
    //   console.log(o);
    //   this.q=o;
      this.operationService.getOperation(id).subscribe(a=>{
        console.log(a.poidsLait);
        console.log(a.tank.idTank);
        console.log(a.produit.idProduit);
        this.tankService.getTank(a.tank.idTank).subscribe(b=>{
          console.log(b.poidActuel);
          console.log(b);
      
        this.p=a.poidsLait+b.poidActuel;

       if(this.p<=b.poidVide){
          this.deleteOperation(id);
        }else{
          this.idContenu = 'TostDangerContenu';
          this.idTitle = 'TostDangerTile';
          this.Toast[0] = 'Failed';
          this.Toast[1] ='Vous ne pouvez pas supprimer cette opereation , car la quantité du tank concerné a été reinitialisé !! voici la novelle quantité :'+b.poidActuel;
          this.showToast();
        }
      });
  // 
});

    
  }



    detailsOperation(operation:Operation){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      localStorage.setItem('IdOperation', JSON.stringify(operation.idOperation));
      this.dialog.open(DetailsOperationTransformationComponent, dialogConfig);
      //this.router.navigate(['employees/admin/detailemployee', id]);
    }

    updateOperation(operation:Operation){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      localStorage.setItem('IdOperation', JSON.stringify(operation.idOperation));
      this.dialog.open(UpdateOperationComponent, dialogConfig);
      //this.router.navigate(['employees/admin/updateemployee', id]);
    }

    onOpenDialogCreate():void{
      this.tankService.getQteG().subscribe(

        o=>{
        console.log(o);
        if(o>0){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      this.dialog.open(CreateOperationTransformationComponent, dialogConfig);
      this.erreur=0;
        }
        else{
            this.erreur=1;
            this.idContenu = 'TostDangerContenu';
            this.idTitle = 'TostDangerTile';
            this.Toast[0] = 'Erreur';
            this.Toast[1] ='Les tanks sont vides !!';
            this.showToast();
        }
        });
    }

    onOpenDialogCreate2():void{
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      this.dialog.open(CreateOperationComponent, dialogConfig);
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
      }, 12100);
      this.intervalId = setInterval(() => {
        this.counter = this.counter + 1;
        console.log(this.counter);
        if (this.counter === 15)
        clearInterval(this.intervalId);
      }, 1000);
      this.counter=0

    }

  }



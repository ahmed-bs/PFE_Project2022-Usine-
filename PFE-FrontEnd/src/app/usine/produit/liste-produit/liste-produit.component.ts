import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Produit } from 'src/app/Models/produit';
import { ProduitService } from 'src/app/Services/produit.service';
import { CreateProduitComponent } from '../create-produit/create-produit.component';
import { DetailsProduitComponent } from '../details-produit/details-produit.component';
import { UpdateProduitComponent } from '../update-produit/update-produit.component';

@Component({
  selector: 'app-liste-produit',
  templateUrl: './liste-produit.component.html',
  styleUrls: ['./liste-produit.component.css']
})
export class ListeProduitComponent implements OnInit {


  @ViewChild('paginator') paginator!:MatPaginator;
  // AddForSotedData
  @ViewChild(MatSort) matSort!:MatSort;

  intervalId?:any;
  idContenu?: string;
  idTitle?: string;
  Toast!: string[];
  counter: number = 0;
  ShowToast: string = 'hide';


  ELEMENT_DATA?:Produit[];
  produit?:Produit;
  dataSource!:MatTableDataSource<any>;
  displayedColumns: string[] = ['idProduit','intitule','qte', 'libelle','action'];
  constructor(private produitService: ProduitService,
    private router: Router, private dialog:MatDialog) { }


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
        this.produitService.getProduits().subscribe(o =>{
        this.ELEMENT_DATA= o;
        this.dataSource = new MatTableDataSource(o);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort =this.matSort;
        console.log(this.dataSource);
        console.log(this.ELEMENT_DATA);});
      
    }
  
    //  deleteProduit(id: number) {
    //   this.produitService.getProduit(id).subscribe(o =>{
    //     this.ELEMENT_DATA= o;});
    //     console.log(this.ELEMENT_DATA);
    //     //console.log(this.id);
    //   let confirmation =confirm("Êtes-vous sûr de supprimer le produit où son id est egale à : "+id+" ??")
    //   if(confirmation)
    //   this.produitService.deleteProduit(id).subscribe(data => {
    //         console.log(data);
    //         window.location.reload();
    //   });
    // }
  
    deleteProduit(id: number) {
      let confirmation =confirm("Êtes-vous sûr de supprimer le produit où son id est egale à : "+id+" ??")
      if(confirmation)
      this.produitService.deleteProduit(id).subscribe(()=>{
        this.Toast[0] = 'Success';
        this.Toast[1] ='Produit a été supprimé avec succès';
        localStorage.setItem('Toast', JSON.stringify(this.Toast));
        // window.location.reload();
        this.onClose();
      },
      (error) => {
        this.idContenu = 'TostDangerContenu';
        this.idTitle = 'TostDangerTile';
        this.Toast[0] = 'Failed';
        this.Toast[1] ='Échec de la suppression du produit !!';
        this.showToast();
      }
    );
  }
  

  onReload(){
    this.router.navigate([this.router.url]);
  }
  
  
  onClose() {
    this.dialog.closeAll();
    // this.gotoList();
    this.onReload();
  }


  
    detailsProduit(produit:Produit){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      localStorage.setItem('IdP', JSON.stringify(produit.idProduit));
      this.dialog.open(DetailsProduitComponent, dialogConfig);
      //this.router.navigate(['employees/admin/detailemployee', id]);
    }
  
    updateProduit(produit:Produit){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      localStorage.setItem('IdP', JSON.stringify(produit.idProduit));
      this.dialog.open(UpdateProduitComponent, dialogConfig);

      //this.router.navigate(['employees/admin/updateemployee', id]);
    }
  
    onOpenDialogCreate():void{
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      this.dialog.open(CreateProduitComponent, dialogConfig);
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



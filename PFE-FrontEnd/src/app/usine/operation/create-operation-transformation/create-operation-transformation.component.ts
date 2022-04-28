import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Operation } from 'src/app/Models/operation';
import { Tank } from 'src/app/Models/tank';
import { Lot } from 'src/app/Models/lot';
import { Produit } from 'src/app/Models/produit';
import { Magasin } from 'src/app/Models/magasin';
import { OperationService } from 'src/app/Services/operation.service';
import { TankService } from 'src/app/Services/tank.service';
import { ProduitService } from 'src/app/Services/produit.service';
import { MagasinService } from 'src/app/Services/magasin.service';
import { LotService } from 'src/app/Services/lot.service';
import { DatePipe } from '@angular/common';
import {Location} from "@angular/common";

@Component({
  selector: 'app-create-operation-transformation',
  templateUrl: './create-operation-transformation.component.html',
  styleUrls: ['./create-operation-transformation.component.css']
})
export class CreateOperationTransformationComponent implements OnInit {

  operation:Operation = new Operation();
  t:Tank=new Tank();
  submitted = false;
  msg="";
  msgErreur=0;
  qteActLaitTank=0;
  qteMax=0;
  q=0;
  som=0;
  myForm=new  FormGroup({
    poidsLait : new FormControl(null,[Validators.required,Validators.min(1)]),
    qtePrise : new FormControl(null,[Validators.required,Validators.min(1)]),
    produit : new FormControl(null,[Validators.required ]),
    tank : new FormControl(null,[Validators.required ]),
    
  })
  tanks!:Observable<Tank[]>;
  magasins!:Observable<Magasin[]>;
  lots!:Observable<Lot[]>;
  produits!:Observable<Produit[]>;


  maDate = new Date();


  constructor(
    private location:Location,
    private operationService: OperationService,
    private tankService:TankService,
    private lotService:LotService,
    private produitService:ProduitService,
    private router: Router,
    private magasinService:MagasinService, 
    private dialogClose: MatDialog) { }

  ngOnInit() {
    this.produits=this.produitService.getProduits();
    this.tanks=this.tankService.getTanksDispo();
  }

  newEmployee(): void {
    this.submitted = false;
    this.operation = new Operation();
  }

  save() {

    if(this.myForm.get('produit')?.value==null || this.myForm.get('poidsLait')?.value==null ||
      this.myForm.get('qtePrise')?.value==null || this.myForm.get('tank')?.value==null){
      this.msg="vous devez remplir le formulaire !!";
     }
     else{
      this.msg="";
     }
  
  
    if(this.myForm.get('produit')?.value!=null && this.myForm.get('qtePrise')?.value!=null
     && this.myForm.get('poidsLait')?.value!=null && this.myForm.get('tank')?.value!=null 
     && this.myForm.get('poidsLait')?.value>=1 && this.myForm.get('qtePrise')?.value>=1 ){

    this.operationService
    .createOperationTransf(
      {
        "produit":{
          "idProduit":this.myForm.get('produit')?.value,
       },
       "tank":{
        "idTank":this.myForm.get('tank')?.value,
     },
         "poidsLait":this.myForm.get('poidsLait')?.value,
         "qtePrise":this.myForm.get('qtePrise')?.value,
        },
      
    )
    .subscribe(o =>{
      // window.location.reload();
      console.log(this.operation);   
      console.log("nourrrrrrrr");
      console.log(this.operation);
      console.log("nourrrrrrrr");  
      localStorage.setItem('Toast', JSON.stringify(["Success","Une operation a été ajouté avec succès"]));
    //  window.location.reload(); 
    this.onClose();     
    },
    (error) => {
      console.log("Failed")
    }
  );

     }
    
  }


  onSubmit() {
    if(this.myForm.get('produit')?.value==null || this.myForm.get('poidsLait')?.value==null ||
    this.myForm.get('qtePrise')?.value==null || this.myForm.get('tank')?.value==null){
    this.msg="vous devez remplir le formulaire !!";
   }
   else{
    this.msg="";
   }

    this.tankService.getTank(this.myForm.get('tank')?.value).subscribe( i=>{
      console.log(i.poidActuel);
  
      console.log(this.myForm.get('poidsLait')?.value);
      if(this.myForm.get('poidsLait')?.value <=i.poidActuel){
        this.save();
      }else{
        this.msgErreur=1;
        this.qteMax=i.poidActuel;
      }
      });
  }

  gotoList() {
    this.router.navigate(['chef/operation/listeOperationRetrait']);
  }


  onReload(){
    // this.router.navigate([this.router.url]);
    this.router.navigateByUrl("/'agriculteur/bon/listeFournisseur",{skipLocationChange: true}).then( response=> {
     this.router.navigate([decodeURI(this.location.path())]);
   })
 }
  
  
  onClose() {
    this.dialogClose.closeAll();
    // this.gotoList();
    this.onReload();
  }

  get produit(){
    return this.myForm.get('produit') ;
  }
  
  get poidsLait(){
    return this.myForm.get('poidsLait') ;
  }
  
  get qtePrise(){
    return this.myForm.get('qtePrise') ;
  }
  
  get tank(){
    return this.myForm.get('tank') ;
  }
  
  }
  


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
import { MagasinService } from 'src/app/Services/magasin.service';
import { ProduitService } from 'src/app/Services/produit.service';
import { DatePipe } from '@angular/common';
import {Location} from "@angular/common";
import { ethers } from 'ethers';
declare let require: any;
declare let window: any;
let Remplissage = require('../../../../../build/contracts/RetraitUsine.json');
@Component({
  selector: 'app-create-operation-retrait',
  templateUrl: './create-operation-retrait.component.html',
  styleUrls: ['./create-operation-retrait.component.css']
})
export class CreateOperationRetraitComponent implements OnInit {

 
  operation:any;
  t:Tank=new Tank();
  submitted = false;
  msg="";
  msgErreur=0;
  qteActLaitTank=0;
  qteMax=0;
  q=0;
  som=0;
  myForm=new  FormGroup({
      qtePrise : new FormControl(null,[Validators.required, Validators.min(5)]),
      produit : new FormControl(null,[Validators.required ]),
      magasin : new FormControl(null,[Validators.required ]),
    
  })
  tanks!:Observable<Tank[]>;
  magasins!:Observable<Magasin[]>;
  lots!:Observable<Lot[]>;
  produits!:Observable<Produit[]>;
  tab!: any[];

  maDate = new Date();


  constructor(
    private location:Location,
    private operationService: OperationService,
    private tankService:TankService,
    private produitService:ProduitService,
    private router: Router,
    private magasinService:MagasinService, 
    private dialogClose: MatDialog) { }

  ngOnInit() {
    //this.ValidatedForm();
    this.tanks=this.tankService.getTanksFiltres();
    this.magasins=this.magasinService.getMagasins();
    this.produits=this.produitService.getProduitsDispo();

    this.operationService.getNbOp().subscribe(o=>{
    console.log(o);
    this.som=20000000+o+1;  
    });

    console.log(this.maDate);
    // var transformDate = DatePipe.transform(this.maDate, 'yyyy-MM-dd');

  }

  newEmployee(): void {
    this.submitted = false;
    this.operation = new Operation();
  }

  save() {

    if(this.myForm.get('qtePrise')?.value==null ||this.myForm.get('magasin')?.value==null || this.myForm.get('produit')?.value==null  ){
      this.msg="vous devez remplir le formulaire !!";
    }
    else{
      this.msg="";
     }

     if(this.myForm.get('qtePrise')?.value!=null && this.myForm.get('magasin')?.value!=null &&
      this.myForm.get('produit')?.value!=null && this.myForm.get('qtePrise')?.value>=5 ){

    this.operationService
    .createOperation(
      {
        "qtePrise":this.myForm.get('qtePrise')?.value,
        "magasin":{
          "idMag":this.myForm.get('magasin')?.value,
       },
       "produit":{
        "idProduit":this.myForm.get('produit')?.value,
     },
       "code":this.som,
        },
      
    )
    .subscribe(o =>{    
      this.magasinService.getMagasin(this.myForm.get('magasin')?.value).subscribe(
      b=>{
        console.log(b)
        localStorage.setItem('magasin',JSON.stringify(b))
      })
      this.produitService.getProduit(this.myForm.get('produit')?.value).subscribe(
        v=>{
          console.log(v)
          localStorage.setItem('produit',JSON.stringify(v))
        })
      // window.location.reload();
      this.tab=Object.values(o);
      console.log(o);
      localStorage.setItem('operation',JSON.stringify(this.tab))
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




  async  requestAccount() {
    if (typeof window.ethereum !== 'undefined') {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    }
  }


  count!: number;
//elem0!: Operation;
elem0: Operation[]=[];
elem2: Operation=new Operation();
  async saveInBc(){
    const depKEY=Object.keys(Remplissage.networks)[0];
    await this.requestAccount()
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()
    const contract = new ethers.Contract(Remplissage.networks[depKEY].address, Remplissage.abi, signer)
    this.elem0=JSON.parse(localStorage.getItem('operation') || '[]')|| []  ;
    console.log(this.elem0);


   
    this.elem0[6]= JSON.parse(localStorage.getItem('magasin') || '[]') || []  ;
    this.elem0[7]=JSON.parse(localStorage.getItem('produit') || '[]') || []  ;
  
    console.log("222222222222222222222222222222222222222");
    console.log(this.elem0[0]);
    const transaction = await contract.RetraitOperationTank(this.elem0);
    await transaction.wait() ; 
    }

  onSubmit() {
    if(this.myForm.get('qtePrise')?.value==null ||this.myForm.get('magasin')?.value==null || this.myForm.get('produit')?.value==null  ){
      this.msg="vous devez remplir le formulaire !!";
    }
    else{
      this.msg="";
     }
     
    this.produitService.getProduit(this.myForm.get('produit')?.value).subscribe(a=>{
      this.q=a.qte;
      console.log(this.q);
 
      if(this.myForm.get('qtePrise')?.value<=this.q  ){
      this.save();
      this.msgErreur=0;
      this.saveInBc()
    }
      else{
      this.msgErreur=1;
      // this.qteActLaitTank=o;
       this.qteMax=this.q;
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

 get qtePrise(){
  return this.myForm.get('qtePrise') ;
}


get magasin(){
  return this.myForm.get('magasin') ;
}

get produit(){
  return this.myForm.get('produit') ;
}

}


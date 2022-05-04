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

import { ethers } from 'ethers';
declare let require: any;
declare let window: any;
let Remplissage = require('../../../../../build/contracts/Transformation.json');
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
  tab!: any[];
  tabTankId!: any[];

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
    
    this.operationService.getNbOp().subscribe(o=>{
      console.log(o);
      this.som=100000000000+o+1;  
      });
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
         "code":this.som,
        },
        
    )
    .subscribe(o =>{
      this.tab=Object.values(o);
      // window.location.reload();
      console.log(o);
      console.log(this.tab);    
      console.log("nourrrrrrrr");
      localStorage.setItem('operation',JSON.stringify(this.tab))
      localStorage.setItem('Toast', JSON.stringify(["Success","Une operation a été ajouté avec succès"]));
      this.tankService.getTank(this.myForm.get('tank')?.value).subscribe(o => {
        console.log(o);
        localStorage.setItem('tabTank', JSON.stringify(o));
      });
      this.produitService.getProduit(this.myForm.get('produit')?.value).subscribe(
        a=>{
          console.log(a);
          this.prrod = a;
          console.log(this.prrod);
          localStorage.setItem('prod', JSON.stringify(a));
        });
    // this.tankService.getTank(kk).subscribe((i) => {
    //   this.tabTankId = Object.values(i);
    //   // this.length=this.ELEMENT_DATA?.length;
    //   localStorage.setItem('tabTankId', JSON.stringify(i.idTank));
    //   console.log('///////////////////////////////////////////000000');
    //   // this.tankService.getTank(i.idTank).subscribe(
    //   //   a=>{
    //   //     console.log(a);
    //   //     this.ttank = a;
    //   //     console.log(this.ttank);
    //   //    
    //   //     this.onReload();
    //   //   }
    //   // )
    //   this.onReload();
    // });

    //  window.location.reload(); 



    this.onReload();     
    },
    (error) => {
      console.log("Failed")
    });
  this.onReload();
     }
     this.onReload();
  }

  async  requestAccount() {
    if (typeof window.ethereum !== 'undefined') {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    }
  }
  ttank: Tank=new Tank() ;
  prrod: Produit=new Produit() ;
  elem0: Operation[]=[];
  elem2: Operation=new Operation();
    async saveInBc(){
      const depKEY=Object.keys(Remplissage.networks)[0];
      await this.requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()
      const contract = new ethers.Contract(Remplissage.networks[depKEY].address, Remplissage.abi, signer)
      console.log(this.elem0);
      this.elem0= JSON.parse(localStorage.getItem('operation') || '[]')|| []  ;

      console.log("222222222222222222222222222222222222222");
      console.log(this.elem0);
   
      console.log(JSON.parse(localStorage.getItem('prod') || '[]')|| []);
      this.elem0[8]=  this.elem0[6];
      this.elem0[6]=  JSON.parse(localStorage.getItem('tabTank') || '[]')|| []  ;
      this.elem0[7]=  JSON.parse(localStorage.getItem('prod') || '[]')|| []  ;
      
      this.elem0[10]=  this.elem0[6];
      // this.elem0[9]= JSON.parse(localStorage.getItem('tabTankId') || '[]')|| []  ;  
      console.log("222222222222222222222222222222222222222");
      console.log(this.elem0);
      const transaction = await contract.RetraitOperationTank(this.elem0);
      await transaction.wait() ; 
      window.localStorage.removeItem("prod");
      window.localStorage.removeItem("tabTank");
      this.onClose();
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
        this.saveInBc();
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
  


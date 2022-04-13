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
import { LotService } from 'src/app/Services/lot.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-create-operation-retrait',
  templateUrl: './create-operation-retrait.component.html',
  styleUrls: ['./create-operation-retrait.component.css']
})
export class CreateOperationRetraitComponent implements OnInit {

 
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
      qtePrise : new FormControl(null,[Validators.required]),
      lot : new FormControl(null,[Validators.required ]),
      magasin : new FormControl(null,[Validators.required ]),
    
  })
  tanks!:Observable<Tank[]>;
  magasins!:Observable<Magasin[]>;
  lots!:Observable<Lot[]>;
  produits!:Observable<Produit[]>;


  maDate = new Date();


  constructor(
    private operationService: OperationService,
    private tankService:TankService,
    private lotService:LotService,
    // private produitService:ProduitService,
    private router: Router,
    private magasinService:MagasinService, 
    private dialogClose: MatDialog) { }

  ngOnInit() {
    //this.ValidatedForm();
    this.tanks=this.tankService.getTanksFiltres();
    this.magasins=this.magasinService.getMagasins();
    this.lots=this.lotService.getLotsDispo();

    this.operationService.getNbOp().subscribe(o=>{
    console.log(o);
    this.som=10000+o+1;  
    });

    console.log(this.maDate);
    // var transformDate = DatePipe.transform(this.maDate, 'yyyy-MM-dd');

  }

  newEmployee(): void {
    this.submitted = false;
    this.operation = new Operation();
  }

  save() {

    if(this.myForm.get('qtePrise')?.value==null){
      this.msg="vous devez remplir le formulaire !!";
    }
    else{
      this.msg="";
     }
  
     if(this.myForm.get('magasin')?.value==null){
      this.msg="vous devez remplir le formulaire !!";
    }
    else{
      this.msg="";
     }

     if(this.myForm.get('lot')?.value==null){
      this.msg="vous devez remplir le formulaire !!";
    }
    else{
      this.msg="";
     }


     if(this.myForm.get('qtePrise')?.value!=null && this.myForm.get('magasin')?.value!=null && this.myForm.get('lot')?.value!=null ){

    this.operationService
    .createOperation(
      {
        "qtePrise":this.myForm.get('qtePrise')?.value,
        "magasin":{
          "idMag":this.myForm.get('magasin')?.value,
       },
       "lot":{
        "idL":this.myForm.get('lot')?.value,
     },
       "code":this.som,
        },
      
    )
    .subscribe(o =>{
      window.location.reload();
      console.log(this.operation);   
      console.log("nourrrrrrrr");
      console.log(this.operation);
      console.log("nourrrrrrrr");  
      localStorage.setItem('Toast', JSON.stringify(["Success","Une operation a été ajouté avec succès"]));
     window.location.reload();      
    },
    (error) => {
      console.log("Failed")
    }
  );

     }
    
  }


  onSubmit() {
    this.lotService.getLot(this.myForm.get('lot')?.value).subscribe(a=>{
      this.q=a.qte;
      console.log(this.q);
 
      if(this.myForm.get('qtePrise')?.value<=this.q  ){
      this.save();
      this.msgErreur=0;
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


  onClose() {
    this.dialogClose.closeAll();
    this.gotoList();
  }

 get qtePrise(){
  return this.myForm.get('qtePrise') ;
}


get magasin(){
  return this.myForm.get('magasin') ;
}

get lot(){
  return this.myForm.get('lot') ;
}

}


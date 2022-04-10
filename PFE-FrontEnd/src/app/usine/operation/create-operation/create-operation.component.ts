import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Operation } from 'src/app/Models/operation';
import { OperationTank } from 'src/app/Models/operationTank';
import { Tank } from 'src/app/Models/tank';
import { OperationService } from 'src/app/Services/operation.service';
import { TankService } from 'src/app/Services/tank.service';
import { Centre } from 'src/app/Models/centre';
import { CentreCollecteService } from 'src/app/Services/centre-collecte.service';

@Component({
  selector: 'app-create-operation',
  templateUrl: './create-operation.component.html',
  styleUrls: ['./create-operation.component.css']
})
export class CreateOperationComponent implements OnInit {

  operation:Operation = new Operation();
  submitted = false;
  msg="";
  t:Tank=new Tank();
  msgErreur=0;
  msgErreur2=0;
  // qte de lait restante pour chaque vache
  qteRsetLait=0;
  //qte restante de lait pour un tank
  qteRsetLaitTank=0;
  valeur1=0;
  valeur2=0;
  myForm=new  FormGroup({
      poidsLait : new FormControl(null,[Validators.required]),
      code : new FormControl(null,[Validators.required ]),
      centreCollecte : new FormControl(null,[Validators.required ]),
     

  })

  tanks!:Observable<Tank[]>;
  centres!:Observable<Centre[]>;

  length=0;

  ELEMENT_DATA?:OperationTank[];
  elem?:OperationTank;

  constructor(
    private operationService: OperationService,
    private tankService:TankService,
    private centreCollecteService:CentreCollecteService,
    private router: Router,
    private dialogClose: MatDialog) { }

  async ngOnInit() {
    //this.ValidatedForm();
    this.tanks=this.tankService.getTanks();
    this.centres=this.centreCollecteService.getCentres();

    this.tankService.getTanksQteLibre().subscribe(
      o=>{
      console.log(o);
      if(this.myForm.get('poidsLait')?.value<=o)
      this.msgErreur=0;
      else{
      this.msgErreur=1;
      this.qteRsetLait=o;
      }

      this.operationService.getOpTank(JSON.parse(localStorage.getItem('IdOperation') || '[]') || []).subscribe(async i=>{
         this.ELEMENT_DATA=await i;
       // this.length=this.ELEMENT_DATA?.length;
        console.log(i.idOpTank);
        console.log(this.ELEMENT_DATA);
        //console.log(this.ELEMENT_DATA?.idOpTank);
  
      });

    


  });

  }

  newEmployee(): void {
    this.submitted = false;
    this.operation = new Operation();
  }

  save() {


  if(this.myForm.get('poidsLait')?.value==null){
    this.msg="vous devez remplir le formulaire !!";
  }
  else{
    this.msg="";
   }

   if(this.myForm.get('centreCollecte')?.value==null){
    this.msg="vous devez remplir le formulaire !!";
  }
  else{
    this.msg="";
   }

   
   if(this.myForm.get('code')?.value==null){
    this.msg="vous devez remplir le formulaire !!";
  }
  else{
    this.msg="";
   }

    if(this.myForm.get('poidsLait')?.value!=null && this.myForm.get('centreCollecte')?.value!=null && this.myForm.get('code')?.value!=null ){

    this.operationService
        .createOperationRemplissage(
          {
            "poidsLait":this.myForm.get('poidsLait')?.value,
            "code":this.myForm.get('code')?.value,
            "centreCollecte":{
              "idCentre":this.myForm.get('centreCollecte')?.value,
           },

          }
        )
        .subscribe(o=>{
          window.location.reload();
          console.log(this.operation);

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
    //this.submitted = true;
    this.tankService.getTanksQteLibre().subscribe(
      o=>{
      console.log(o);
      if(this.myForm.get('poidsLait')?.value<=o){
      this.save();
      this.msgErreur=0;
      }
      else{
      this.msgErreur=1;
      this.qteRsetLait=o;
      }


  });

  }

  gotoList() {
    this.router.navigate(['chef/operation/listeOperation']);
  }


  onClose() {
    this.dialogClose.closeAll();
    this.gotoList();
  }

 get poidsLait(){
  return this.myForm.get('poidsLait') ;
}


get centreCollecte(){
  return this.myForm.get('centreCollecte') ;
}


get code(){
  return this.myForm.get('code') ;
}


}


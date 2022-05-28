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
import { Location } from '@angular/common';
import { ethers } from 'ethers';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/Services/auth.service';
declare let require: any;
declare let window: any;
let Remplissage = require('../../../../../build/contracts/RemplissageUsine.json');
@Component({
  selector: 'app-create-operation',
  templateUrl: './create-operation.component.html',
  styleUrls: ['./create-operation.component.css'],
})
export class CreateOperationComponent implements OnInit {
  operation: Operation = new Operation();
  submitted = false;
  msg = '';
  t: Tank = new Tank();
  msgErreur = 0;
  msgErreur2 = 0;
  // qte de lait restante pour chaque vache
  qteRsetLait = 0;
  //qte restante de lait pour un tank
  qteRsetLaitTank = 0;
  valeur1 = 0;
  valeur2 = 0;
  msg1 = 0;
  qte = 0;
  msg4=0;
  myForm = new FormGroup({
    poidsLait: new FormControl(null, [Validators.required, Validators.min(1)]),
    code: new FormControl(null, [Validators.required]),
    centreCollecte: new FormControl(null, [Validators.required]),
    cgu: new FormControl(false, Validators.requiredTrue),
  });

  tanks!: Observable<Tank[]>;
  centres!: Observable<Centre[]>;

  length = 0;
  kk!: any;
  ELEMENT_DATA?: OperationTank[];
  elem?: OperationTank;
  tab!: any[];
  tabTankId!: any[];
  constructor(
    private translateService: TranslateService,
    private location: Location,
    private operationService: OperationService,
    private tankService: TankService,
    private centreCollecteService: CentreCollecteService,
    private router: Router,
    private dialogClose: MatDialog
  ) {
    this.translateService.setDefaultLang('en');
    this.translateService.use(localStorage.getItem('lang') || 'en');
  }

  async ngOnInit() {
    //this.ValidatedForm();
    this.tanks = this.tankService.getTanks();
    this.centres = this.centreCollecteService.getCentres();

    this.tankService.getTanksQteLibre().subscribe((o) => {
      console.log(o);
      if (this.myForm.get('poidsLait')?.value <= o) this.msgErreur = 0;
      else {
        this.msgErreur = 1;
        this.qteRsetLait = o;
      }
      this.onReload();
    });
  }

  newEmployee(): void {
    this.submitted = false;
    this.operation = new Operation();
  }

  save() {
    environment.wating = 'startwaiting';
    this.onReload();
    if (
      this.myForm.get('poidsLait')?.value == null ||
      this.myForm.get('centreCollecte')?.value == null ||
      this.myForm.get('code')?.value == null
    ) {
      this.msg = 'vous devez remplir le formulaire !!';
    } else {
      this.msg = '';
    }

    this.operationService
      .getOpCodeUtilise(this.myForm.get('code')?.value)
      .subscribe((t) => {
        console.log(t);
        if (t == 1) {
          this.msg1 = 1;
        } else {
          this.msg1 = 0;
        }

        if (
          this.myForm.get('poidsLait')?.value != null &&
          this.myForm.get('centreCollecte')?.value != null &&
          this.myForm.get('code')?.value != null &&
          this.myForm.get('poidsLait')?.value >= 1 &&
          this.myForm.get('cgu')?.value==true &&
          t == 0 &&
          this.myForm.get('code')?.value.toString().length >= 5 &&
          this.msg == ''
        ) {
          this.operationService
            .createOperationRemplissage({
              poidsLait: this.myForm.get('poidsLait')?.value,
              code: this.myForm.get('code')?.value,
              centreCollecte: {
                idCentre: this.myForm.get('centreCollecte')?.value,
              },
            })
            .subscribe(
              (o) => {
                this.tab = Object.values(o);
                this.operationService.getOpTank(this.tab[0]).subscribe( async(i)  => {
                  this.tabTankId = Object.values(i);
                await  this.saveInBc(this.tabTankId, this.tabTankId.length);
                  if (this.confirmation == 'confirmed') {
                    localStorage.setItem(
                      'Toast',
                      JSON.stringify([
                        'Success',
                        'Une operation a été ajouté avec succès',
                      ])
                    );
                  }
                });
              },
              (error) => {
                console.log('Failed');
              }
            );
            this.tankService.getTanksQteLibre().subscribe((o) => {
              if (this.myForm.get('poidsLait')?.value <= o) this.msgErreur = 0;
              else {
                this.msgErreur = 1;
                this.qteRsetLait = o;
              }
            });
        }
      });
  }

  async requestAccount() {
    if (typeof window.ethereum !== 'undefined') {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    }
  }
  confirmation: string = 'confirmed';

  async saveInBc(elem0: OperationTank[], count: number) {
    const depKEY = Object.keys(Remplissage.networks)[0];
    await this.requestAccount();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      Remplissage.networks[depKEY].address,
      Remplissage.abi,
      signer
    );
    try {
      const transaction = await contract.addOperationTankUsine(elem0, count);
      await transaction.wait();
      environment.wating = 'confirmed';
    } catch (error) {
      this.confirmation = 'rejected';
      console.log('rejected');
    }
    if (this.confirmation == 'confirmed') {
      environment.wating = 'confirmed';
    }
    if (this.confirmation == 'rejected') {
      environment.wating = 'rejected';
      this.operationService
        .deleteOperation(elem0[0].operation.idOperation)
        .subscribe((d) => {
          this.onReload();
        });
    }
    this.onReload();
  }

  onSubmit() {
       //this.submitted = true;
       if (this.myForm.get('poidsLait')?.value == null) {
        this.msg = 'vous devez remplir le formulaire !!';
      } else {
        this.msg = '';
      }

      if (this.myForm.get('centreCollecte')?.value == null) {
        this.msg = 'vous devez remplir le formulaire !!';
      } else {
        this.msg = '';
      }

      if (this.myForm.get('code')?.value == null) {
        this.msg = 'vous devez remplir le formulaire !!';
      } else {
        this.msg = '';
      }
      if(this.myForm.get('cgu')?.value==true){
        this.msg4=0;
      }
      else{
        this.msg4=1;
      }

      this.tankService.getTanksQteLibre().subscribe((o) => {
        if (this.myForm.get('poidsLait')?.value <= o) {
          this.msgErreur = 0;
        }
          else{
            this.msgErreur = 1;
            this.qteRsetLait = o;
          }
        });


        this.operationService.getOpCodeUtilise(this.myForm.get('code')?.value).subscribe((t) => {
          console.log(t);
          if (t == 1) {
            this.msg1 = 1;
          } else {
            this.msg1 = 0;
          }


    this.tankService.getTanksQteLibre().subscribe((o) => {
      console.log(o);
      if (
        this.myForm.get('poidsLait')?.value != null &&
        this.myForm.get('centreCollecte')?.value != null &&
        this.myForm.get('poidsLait')?.value > 0 &&
        this.myForm.get('cgu')?.value==true &&
        this.myForm.get('code')?.value != null
        && t==0
      ) {
      if (this.myForm.get('poidsLait')?.value <= o) {
        this.save();
        this.onClose();
        this.msgErreur = 0;
      } else {
        this.msgErreur = 1;
        this.qteRsetLait = o;
      }
    }
  });
    });
  }

  gotoList() {
    this.router.navigate(['chef/operation/listeOperation']);
  }

  onReload() {
    // this.router.navigate([this.router.url]);
    this.router
      .navigateByUrl("/'agriculteur/bon/listeFournisseur", {
        skipLocationChange: true,
      })
      .then((response) => {
        this.router.navigate([decodeURI(this.location.path())]);
      });
  }

  onClose() {
    this.dialogClose.closeAll();
    // this.gotoList();
    this.onReload();
  }

  get poidsLait() {
    return this.myForm.get('poidsLait');
  }

  get centreCollecte() {
    return this.myForm.get('centreCollecte');
  }

  get code() {
    return this.myForm.get('code');
  }
}

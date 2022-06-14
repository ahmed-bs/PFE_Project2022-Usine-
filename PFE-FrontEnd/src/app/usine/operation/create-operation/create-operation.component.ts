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
import { UserService } from 'src/app/Services/user.service';
declare let require: any;
declare let window: any;
let RetraitCentreAdress = require('/build/contracts/RetraitCol.json');
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
  msg5 = 4;
  msg7 = 4;
  msg6 = 4;
  t: Tank = new Tank();
  connected!: boolean;
  msgErreur = 0;
  msgErreur2 = 0;
  // qte de lait restante pour chaque vache
  qteRsetLait = 0;
  //qte restante de lait pour un tank
  qteRsetLaitTank = 0;
  valeur1 = 0;
  valeur2 = 0;
  msg1 = 0;
  pp: number = 0;
  msg2 = '';
  qte = 0;
  msg4 = 0;
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
    private userService: UserService,
    private tankService: TankService,
    private centreCollecteService: CentreCollecteService,
    private router: Router,
    private authService: AuthService,
    private dialogClose: MatDialog
  ) {
    this.translateService.setDefaultLang('en');
    this.translateService.use(localStorage.getItem('lang') || 'en');
  }

  async ngOnInit() {
    this.reloadDataUinseRemplissage01();
    this.tanks = this.tankService.getTanks();
    this.centres = this.centreCollecteService.getCentres();
    this.authService.loadToken();
    if (
      this.authService.getToken() == null ||
      this.authService.isTokenExpired()
    ) {
      this.router.navigate(['/login']);
    }
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

  OpTankRemplissageUsineTabs!: OperationTank[];
  async reloadDataUinseRemplissage01() {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const depKEY = Object.keys(Remplissage.networks)[0];

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          Remplissage.networks[depKEY].address,
          Remplissage.abi,
          signer
        );
        this.OpTankRemplissageUsineTabs =
          await contract.getOperationTanksUsine();
        this.connected = true;
      } catch (error) {
        this.connected = false;
      }
    }
  }

  operationsCentreResult!: OperationTank;
  codeCompar!: number;
  async FindByCodeCentre(codeCompar: any) {
    const depKEY = Object.keys(RetraitCentreAdress.networks)[0];
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      this.codeCompar = parseInt(codeCompar);
      const contract = new ethers.Contract(
        RetraitCentreAdress.networks[depKEY].address,
        RetraitCentreAdress.abi,
        signer
      );
      return (this.operationsCentreResult =
        await contract.getOperationFromAgrsbycode(this.codeCompar));
    }
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
          this.myForm.get('cgu')?.value == true &&
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
                this.operationService
                  .getOpTank(this.tab[0])
                  .subscribe(async (i) => {
                    this.tabTankId = Object.values(i);
                    await this.saveInBc(this.tabTankId, this.tabTankId.length);
                    if (environment.wating == 'rejected') {
                      localStorage.setItem(
                        'Toast',
                        JSON.stringify(['Failed', "L'opération a été rejetée"])
                      );
                    } else {
                      localStorage.setItem(
                        'Toast',
                        JSON.stringify([
                          'Success',
                          'Une operation a été ajoutée avec succès',
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

  async onSubmit() {
    try {
      await this.FindByCodeCentre(this.myForm.get('code')?.value);
      this.userService.getUser(25).subscribe((t) => {
        console.log(this.operationsCentreResult.toString());
        console.log(this.myForm.get('poidsLait')?.value);
        console.log(Number(this.operationsCentreResult.qteInsereTank));
        if (
          Math.abs(Number(this.operationsCentreResult.qteInsereTank)) ==
          this.myForm.get('poidsLait')?.value
        ) {
          this.msg7 = 1;
          console.log('founded poids lait');
        } else {
          console.log('notfount the poids lait not the same');
          this.msg7 = 0;
        }

        this.centreCollecteService
          .getCentre(this.myForm.get('centreCollecte')?.value)
          .subscribe((f) => {
            console.log(this.operationsCentreResult.operation.chef.centreNom);
            console.log(f.nomCentre);
            if (
              this.operationsCentreResult.operation.chef.centreNom.trim() ==
              f.nomCentre.trim()
            ) {
              this.msg6 = 1;
              console.log('founded agriculteur');
            } else {
              this.msg6 = 0;
              console.log('notfount agriculteur');
            }
          });
        if (
          this.operationsCentreResult.operation.usine.nomUsine.trim() ==
          t.usineNom.trim()
        ) {
          this.msg5 = 1;
          console.log('founded');
        } else {
          console.log('notfount the name not the same');
          this.msg5 = 0;
        }
      });
    } catch (error) {
      this.msg5 = 0;
      console.log('notfount the code');
    }
    try {
      for (let index = 0; index <= this.pp; index++) {
        if (
          this.myForm.get('code')?.value ==
          this.OpTankRemplissageUsineTabs[index].operation.code
        ) {
          this.msg2 = 'code deja exist';
        } else {
          this.msg2 = 'ok';
        }
      }
    } catch (error) {
      this.msg2 = 'ok';
    }
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
    if (this.myForm.get('cgu')?.value == true) {
      this.msg4 = 0;
    } else {
      this.msg4 = 1;
    }

    this.tankService.getTanksQteLibre().subscribe((o) => {
      if (this.myForm.get('poidsLait')?.value <= o) {
        this.msgErreur = 0;
      } else {
        this.msgErreur = 1;
        this.qteRsetLait = o;
      }
    });

    this.operationService
      .getOpCodeUtilise(this.myForm.get('code')?.value)
      .subscribe((t) => {
        console.log(t);
        if (t == 1) {
          this.msg1 = 1;
        } else {
          this.msg1 = 0;
        }

        this.tankService.getTanksQteLibre().subscribe((o) => {
          console.log(o);
          if (
            this.msg6 == 1 &&
            this.msg5 == 1 &&
            this.msg7 == 1 &&
            this.myForm.get('poidsLait')?.value != null &&
            this.myForm.get('centreCollecte')?.value != null &&
            this.myForm.get('poidsLait')?.value > 0 &&
            this.myForm.get('cgu')?.value == true &&
            this.myForm.get('code')?.value != null &&
            this.msg2 == 'ok' &&
            t == 0
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
function trim() {
  throw new Error('Function not implemented.');
}

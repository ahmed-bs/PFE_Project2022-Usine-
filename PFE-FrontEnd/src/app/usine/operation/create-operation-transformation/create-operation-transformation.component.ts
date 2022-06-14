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
import { Location } from '@angular/common';

import { ethers } from 'ethers';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
declare let require: any;
declare let window: any;
let Remplissage = require('../../../../../build/contracts/Transformation.json');
@Component({
  selector: 'app-create-operation-transformation',
  templateUrl: './create-operation-transformation.component.html',
  styleUrls: ['./create-operation-transformation.component.css'],
})
export class CreateOperationTransformationComponent implements OnInit {
  operation: Operation = new Operation();
  t: Tank = new Tank();
  submitted = false;
  msg = '';
  msgErreur = 0;
  qteActLaitTank = 0;
  qteMax = 0;
  q = 0;
  msg4 = 0;
  som = 0;
  myForm = new FormGroup({
    poidsLait: new FormControl(null, [Validators.required, Validators.min(1)]),
    qtePrise: new FormControl(null, [Validators.required, Validators.min(1)]),
    produit: new FormControl(null, [Validators.required]),
    tank: new FormControl(null, [Validators.required]),
    cgu: new FormControl(false, Validators.requiredTrue),
  });
  tanks!: Observable<Tank[]>;
  magasins!: Observable<Magasin[]>;
  lots!: Observable<Lot[]>;
  produits!: Observable<Produit[]>;

  maDate = new Date();
  tab!: any[];
  tab0!: any[];
  tab1!: any[];

  public myAngularxQrCode: string = 'http://localhost:4200/detailComponent/';
  elementType = 'canvas';
  parentElement: any;
  jj!: number;

  constructor(
    private translateService: TranslateService,
    private location: Location,
    private operationService: OperationService,
    private tankService: TankService,
    private produitService: ProduitService,
    private router: Router,
    private dialogClose: MatDialog
  ) {
    this.translateService.setDefaultLang('en');
    this.translateService.use(localStorage.getItem('lang') || 'en');
  }

  async ngOnInit() {
    await this.reloadDataTranfer0();
    this.produits = this.produitService.getProduits();
    this.tanks = this.tankService.getTanksDispo();

    this.operationService.getNbOp().subscribe((o) => {
      console.log(o);

      this.som = 800000000 + this.jj + 1;
    });
  }

  OperationsT!: Operation[];
  async reloadDataTranfer0() {
    const depKEY = Object.keys(Remplissage.networks)[0];
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        Remplissage.networks[depKEY].address,
        Remplissage.abi,
        signer
      );
      this.OperationsT = await contract.getOperationTanks();
      this.jj = this.OperationsT.length;
    }
  }

  saveAsImage(parent: any) {
    if (this.elementType === 'canvas') {
      // fetches base 64 data from canvas
      this.parentElement = parent.qrcElement.nativeElement
        .querySelector('canvas')
        .toDataURL('image/png');
    } else if (this.elementType === 'img') {
      // fetches base 64 data from image
      this.parentElement =
        parent.qrcElement.nativeElement.querySelector('img').src;
      // use 'parentElement' for your firebase storage
    } else {
      alert("Set elementType to 'canvas', 'img' or 'url'.");
    }

    if (this.parentElement) {
      // If you want to download the image, continue here
      // converts base 64 encoded image to blobData
      let blobData = this.convertBase64ToBlob(this.parentElement);
      // saves as image
      const blob = new Blob([blobData], { type: 'image/png' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Qrcode';
      link.click();
    }
  }

  // Only used if you plan to download the img
  private convertBase64ToBlob(Base64Image: string) {
    const parts = Base64Image.split(';base64,');
    const imageType = parts[0].split(':')[1];
    const decodedData = window.atob(parts[1]);
    const uInt8Array = new Uint8Array(decodedData.length);
    for (let i = 0; i < decodedData.length; ++i) {
      uInt8Array[i] = decodedData.charCodeAt(i);
    }
    return new Blob([uInt8Array], { type: imageType });
  }

  newEmployee(): void {
    this.submitted = false;
    this.operation = new Operation();
  }

  opr: Operation = new Operation();
  tnk: Tank = new Tank();
  prd: Produit = new Produit();

  save(parent: any) {
    environment.wating = 'startwaiting';
    this.onReload();
    if (
      this.myForm.get('produit')?.value == null ||
      this.myForm.get('poidsLait')?.value == null ||
      this.myForm.get('qtePrise')?.value == null ||
      this.myForm.get('tank')?.value == null
    ) {
      this.msg = 'vous devez remplir le formulaire !!';
    } else {
      this.msg = '';
    }

    if (
      this.myForm.get('produit')?.value != null &&
      this.myForm.get('qtePrise')?.value != null &&
      this.myForm.get('poidsLait')?.value != null &&
      this.myForm.get('tank')?.value != null &&
      this.myForm.get('poidsLait')?.value >= 1 &&
      this.myForm.get('qtePrise')?.value >= 1 &&
      this.myForm.get('cgu')?.value == true
    ) {
      this.operationService
        .createOperationTransf({
          poidsLait: this.myForm.get('poidsLait')?.value,
          qtePrise: this.myForm.get('qtePrise')?.value,
          produit: {
            idProduit: this.myForm.get('produit')?.value,
          },
          tank: {
            idTank: this.myForm.get('tank')?.value,
          },

          code: this.som,
        })
        .subscribe(
          (o) => {
            this.tab = Object.values(o);

            this.opr.idOperation = this.tab[0];
            this.opr.code = this.tab[4];
            this.opr.dateOperation = this.tab[2];
            this.opr.typeOp = this.tab[3];
            this.opr.lot = this.tab[5];
            this.opr.qtePrise = this.tab[1];
            this.opr.poidsLait = this.tab[1];
            this.opr.codeRemplissage = this.tab[6];

            this.tankService
              .getTank(this.myForm.get('tank')?.value)
              .subscribe((k) => {
                this.tab0 = Object.values(k);

                this.tnk.codeTank = this.tab0[6];
                this.tnk.etat = this.tab0[4];
                this.tnk.idTank = this.tab0[0];
                this.tnk.matricule = this.tab0[1];
                this.tnk.poidActuel = this.tab0[3];
                this.tnk.poidVide = this.tab0[2];

                this.opr.tank = this.tnk;
                this.produitService
                  .getProduit(this.myForm.get('produit')?.value)
                  .subscribe(async (a) => {
                    this.tab1 = Object.values(a);
                    this.prd.idProduit = this.tab1[0];
                    this.prd.intitule = this.tab1[1];
                    this.prd.libelle = this.tab1[2];
                    this.prd.qte = this.tab1[3];
                    this.opr.produit = this.prd;

                    await this.saveInBc(this.opr, parent);
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
              });
          },
          (error) => {
            console.log('Failed');
          }
        );
    }
  }

  async requestAccount() {
    if (typeof window.ethereum !== 'undefined') {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    }
  }

  confirmation: string = 'confirmed';
  async saveInBc(elem0: Operation, parent: any) {
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
      const transaction = await contract.RetraitOperationTank(elem0);
      await transaction.wait();
      environment.wating = 'confirmed';

      this.saveAsImage(parent);
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
          .deleteOperationT(elem0.idOperation)
          .subscribe((d) => {
            this.onReload();
          });
  
    }
    this.onReload();
  }

  onSubmit(parent: any) {
    if (this.myForm.get('cgu')?.value == true) {
      this.msg4 = 0;
    } else {
      this.msg4 = 1;
    }
    if (
      this.myForm.get('produit')?.value == null ||
      this.myForm.get('poidsLait')?.value == null ||
      this.myForm.get('qtePrise')?.value == null ||
      this.myForm.get('tank')?.value == null
    ) {
      this.msg = 'vous devez remplir le formulaire !!';
    } else {
      this.msg = '';
    }

    this.tankService.getTank(this.myForm.get('tank')?.value).subscribe((i) => {
      console.log(i.poidActuel);

      console.log(this.myForm.get('poidsLait')?.value);

      if (
        this.myForm.get('poidsLait')?.value != null &&
        this.myForm.get('produit')?.value != null &&
        this.myForm.get('qtePrise')?.value != null &&
        this.myForm.get('tank')?.value != null &&
        this.myForm.get('cgu')?.value == true &&
        this.myForm.get('poidsLait')?.value > 0
      ) {
        if (this.myForm.get('poidsLait')?.value <= i.poidActuel) {
          this.myAngularxQrCode = this.myAngularxQrCode + this.som.toString();
          this.save(parent);
          this.onClose();
        } else {
          this.msgErreur = 1;
          this.qteMax = i.poidActuel;
        }
      }
    });
  }

  gotoList() {
    this.router.navigate(['chef/operation/listeOperationRetrait']);
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

  get produit() {
    return this.myForm.get('produit');
  }

  get poidsLait() {
    return this.myForm.get('poidsLait');
  }

  get qtePrise() {
    return this.myForm.get('qtePrise');
  }

  get tank() {
    return this.myForm.get('tank');
  }
}

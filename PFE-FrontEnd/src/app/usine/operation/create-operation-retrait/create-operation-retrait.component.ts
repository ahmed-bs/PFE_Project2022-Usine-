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
import { Location } from '@angular/common';
import { ethers } from 'ethers';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/Services/user.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
declare let require: any;
declare let window: any;
let Remplissage = require('../../../../../build/contracts/RetraitUsine.json');
@Component({
  selector: 'app-create-operation-retrait',
  templateUrl: './create-operation-retrait.component.html',
  styleUrls: ['./create-operation-retrait.component.css'],
})
export class CreateOperationRetraitComponent implements OnInit {
  operation: any;
  t: Tank = new Tank();
  submitted = false;
  msg = '';
  msgErreur = 0;
  qteActLaitTank = 0;
  qteMax = 0;
  q = 0;
  som = 0;
  msg4 = 0;
  nom = '';
  prenom = '';
  myForm = new FormGroup({
    qtePrise: new FormControl(null, [Validators.required, Validators.min(5)]),
    produit: new FormControl(null, [Validators.required]),
    magasin: new FormControl(null, [Validators.required]),
    cgu: new FormControl(false, Validators.requiredTrue),
  });
  tanks!: Observable<Tank[]>;
  magasins!: Observable<Magasin[]>;
  lots!: Observable<Lot[]>;
  produits!: Observable<Produit[]>;
  tab!: any[];
  tab0!: any[];
  tab1!: any[];
  maDate = new Date();
  np = '';
  text = '';

  exportOne(op: Operation, confirmation: string) {
    const doc = new jsPDF();
    var imageData = environment.img;
    const n = op.code.toString() + '.pdf';
    doc.addImage(imageData, 'JPEG', 0, 0, 210, 297);
    this.userService
      .getUser(JSON.parse(localStorage.getItem('IdUser') || '[]') || [])
      .subscribe((o) => {
        this.nom = o.nom;
        this.prenom = o.prenom;
        console.log('#################################################');
        console.log(o);
        console.log(o.idU);
        console.log('#################################################');
        this.np = this.nom + ' ' + this.prenom;
        this.text =
          op.magasin.nomMag + ' ' + op.magasin.adresse + ' ' + op.magasin.ville;
        doc.text(op.code.toString(), 92, 54);
        doc.text(this.np.toString(), 75, 107.2);
        doc.text(this.text.toString(), 74, 139);
        doc.text(op.dateOperation.toString(), 120, 123.5);
        doc.save(n);
      });
  }
  constructor(
    private translateService: TranslateService,
    private location: Location,
    private operationService: OperationService,
    private tankService: TankService,
    private produitService: ProduitService,
    private router: Router,
    private magasinService: MagasinService,
    private userService: UserService,
    private dialogClose: MatDialog
  ) {
    this.translateService.setDefaultLang('en');
    this.translateService.use(localStorage.getItem('lang') || 'en');
  }

  ngOnInit() {
    this.tanks = this.tankService.getTanksFiltres();
    this.magasins = this.magasinService.getMagasins();
    this.produits = this.produitService.getProduitsDispo();

    this.operationService.getNbOp().subscribe((o) => {
      console.log(o);
      this.som = 20000000 + o + 1;
    });

    console.log(this.maDate);
  }

  newEmployee(): void {
    this.submitted = false;
    this.operation = new Operation();
  }

  opr: Operation = new Operation();
  mgz: Magasin = new Magasin();
  prd: Produit = new Produit();
  save() {
    environment.wating = 'startwaiting';
    this.onReload();
    if (
      this.myForm.get('qtePrise')?.value == null ||
      this.myForm.get('magasin')?.value == null ||
      this.myForm.get('produit')?.value == null
    ) {
      this.msg = 'vous devez remplir le formulaire !!';
    } else {
      this.msg = '';
    }

    if (
      this.myForm.get('qtePrise')?.value != null &&
      this.myForm.get('magasin')?.value != null &&
      this.myForm.get('produit')?.value != null &&
      this.myForm.get('qtePrise')?.value >= 5 &&
      this.myForm.get('cgu')?.value == true
    ) {
      this.operationService
        .createOperation({
          qtePrise: this.myForm.get('qtePrise')?.value,
          magasin: {
            idMag: this.myForm.get('magasin')?.value,
          },
          produit: {
            idProduit: this.myForm.get('produit')?.value,
          },
          code: this.som,
        })
        .subscribe(
          (o) => {
            this.tab = Object.values(o);

            console.log('this wut u r looking for ');
            console.log(this.tab);
            this.opr.idOperation = this.tab[0];
            this.opr.poidsLait = this.tab[1];
            this.opr.dateOperation = this.tab[2];
            this.opr.typeOp = this.tab[3];
            this.opr.code = this.tab[4];
            this.opr.qtePrise = this.tab[5];

            console.log(this.opr);
            this.magasinService
              .getMagasin(this.myForm.get('magasin')?.value)
              .subscribe((b) => {
                this.tab0 = Object.values(b);
                console.log(this.tab0);
                this.mgz.adresse = this.tab0[2];
                this.mgz.idMag = this.tab0[0];
                this.mgz.nomMag = this.tab0[1];
                this.mgz.tel = this.tab0[4];
                this.mgz.ville = this.tab0[3];

                this.opr.magasin = this.mgz;

                this.produitService
                  .getProduit(this.myForm.get('produit')?.value)
                  .subscribe((v) => {
                    this.tab1 = Object.values(v);
                    console.log(this.tab1);

                    this.prd.idProduit = this.tab1[0];
                    this.prd.intitule = this.tab1[1];
                    this.prd.libelle = this.tab1[2];
                    this.prd.qte = this.tab1[3];
                    this.opr.produit = this.prd;
                    this.saveInBc(this.opr);
                    if (environment.wating == 'confirmed') {
                      localStorage.setItem(
                        'Toast',
                        JSON.stringify([
                          'Success',
                          'Une opération a été ajoutée avec succès',
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

  elem2: Operation = new Operation();

  async saveInBc(elem0: Operation) {
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
    } catch (error) {
      this.confirmation = 'rejected';
    }

    if (this.confirmation == 'confirmed') {
      environment.wating = 'confirmed';
      this.exportOne(elem0, this.confirmation);
    }
    if (this.confirmation == 'rejected') {
      environment.wating = 'rejected';
      try {
        this.operationService
          .deleteOperation(elem0.idOperation)
          .subscribe((d) => {
            this.onReload();
          });
      } catch (error) {}
    }
    this.onReload();
  }

  onSubmit() {
    if (this.myForm.get('cgu')?.value == true) {
      this.msg4 = 0;
    } else {
      this.msg4 = 1;
    }

    if (
      this.myForm.get('qtePrise')?.value == null ||
      this.myForm.get('magasin')?.value == null ||
      this.myForm.get('produit')?.value == null
    ) {
      this.msg = 'vous devez remplir le formulaire !!';
    } else {
      this.msg = '';
    }

    this.produitService
      .getProduit(this.myForm.get('produit')?.value)
      .subscribe((a) => {
        this.q = a.qte;
        console.log(this.q);
        if (
          this.myForm.get('qtePrise')?.value != null &&
          this.myForm.get('magasin')?.value != null &&
          this.myForm.get('produit')?.value != null &&
          this.myForm.get('cgu')?.value == true &&
          this.myForm.get('qtePrise')?.value > 0
        ) {
          if (this.myForm.get('qtePrise')?.value <= this.q) {
            this.save();
            this.onClose();
            this.msgErreur = 0;
          } else {
            this.msgErreur = 1;
            this.qteMax = this.q;
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

  get qtePrise() {
    return this.myForm.get('qtePrise');
  }

  get magasin() {
    return this.myForm.get('magasin');
  }

  get produit() {
    return this.myForm.get('produit');
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Lot } from 'src/app/Models/lot';
import { Produit } from 'src/app/Models/produit';
import { LotService } from 'src/app/Services/lot.service';
import { ProduitService } from 'src/app/Services/produit.service';
import { Observable } from 'rxjs';
import { TankService } from 'src/app/Services/tank.service';
import { Tank } from 'src/app/Models/tank';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-create-lot',
  templateUrl: './create-lot.component.html',
  styleUrls: ['./create-lot.component.css'],
})
export class CreateLotComponent implements OnInit {
  lot: Lot = new Lot();
  submitted = false;
  msg = '';
  msgErreur = 0;
  qteAct = 0;
  qteMax = 0;
  produits!: Observable<Produit[]>;
  tanks!: Observable<Tank[]>;

  myForm = new FormGroup({
    qteLot: new FormControl(null, [Validators.required]),
    qtePriseTank: new FormControl(null, [Validators.required]),
    produit: new FormControl(null, [Validators.required]),
    tank: new FormControl(null, [Validators.required]),
  });

  constructor(
    private translateService: TranslateService,
    private lotService: LotService,
    private produitService: ProduitService,
    private tankService: TankService,
    private router: Router,
    private dialogClose: MatDialog
  ) {
    this.translateService.setDefaultLang('en');
    this.translateService.use(localStorage.getItem('lang') || 'en');
  }

  ngOnInit() {
    this.produits = this.produitService.getProduits();
    this.tanks = this.tankService.getTanksDispo();
  }

  newproduit(): void {
    this.submitted = false;
    this.lot = new Lot();
  }

  save() {
    if (this.myForm.get('produit')?.value == null) {
      this.msg = 'vous devez remplir le formulaire !!';
    } else {
      this.msg = '';
    }

    if (this.myForm.get('qteLot')?.value == null) {
      this.msg = 'vous devez remplir le formulaire !!';
    } else {
      this.msg = '';
    }

    if (this.myForm.get('qtePriseTank')?.value == null) {
      this.msg = 'vous devez remplir le formulaire !!';
    } else {
      this.msg = '';
    }

    if (this.myForm.get('tank')?.value == null) {
      this.msg = 'vous devez remplir le formulaire !!';
    } else {
      this.msg = '';
    }

    if (
      this.myForm.get('produit')?.value != null &&
      this.myForm.get('qtePriseTank')?.value != null &&
      this.myForm.get('qteLot')?.value != null &&
      this.myForm.get('tank')?.value != null
    ) {
      this.lotService
        .createLot({
          produit: {
            idProduit: this.myForm.get('produit')?.value,
          },
          tank: {
            idTank: this.myForm.get('tank')?.value,
          },
          qteLot: this.myForm.get('qteLot')?.value,
          qtePriseTank: this.myForm.get('qtePriseTank')?.value,
        })
        .subscribe((o) => {
          window.location.reload();
          console.log(this.myForm.get('tank')?.value);
          console.log(this.lot);
          localStorage.setItem(
            'Toast',
            JSON.stringify(['Success', 'Un lot a été ajouté avec succès'])
          );
          window.location.reload();
        });
    }
  }

  onSubmit() {
    this.tankService.getTank(this.myForm.get('tank')?.value).subscribe((i) => {
      console.log(i.poidActuel);

      console.log(this.myForm.get('qtePriseTank')?.value);
      if (this.myForm.get('qtePriseTank')?.value <= i.poidActuel) {
        this.save();
      } else {
        this.msgErreur = 1;
        this.qteMax = i.poidActuel;
      }
    });
  }

  gotoList() {
    this.router.navigate(['usine/Lot/listeLot']);
  }

  onClose() {
    this.dialogClose.closeAll();
    this.gotoList();
  }

  get produit() {
    return this.myForm.get('produit');
  }

  get description() {
    return this.myForm.get('description');
  }

  get qteLot() {
    return this.myForm.get('qteLot');
  }

  get qtePriseTank() {
    return this.myForm.get('qtePriseTank');
  }

  get tank() {
    return this.myForm.get('tank');
  }
}

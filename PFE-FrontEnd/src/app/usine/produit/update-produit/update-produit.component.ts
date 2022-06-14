import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Produit } from 'src/app/Models/produit';
import { ProduitService } from 'src/app/Services/produit.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-update-produit',
  templateUrl: './update-produit.component.html',
  styleUrls: ['./update-produit.component.css'],
})
export class UpdateProduitComponent implements OnInit {
  produit: Produit = new Produit();
  myForm!: FormGroup;
  CheckesCompetance: boolean = false;

  constructor(
    private translateService: TranslateService,
    private location: Location,
    private router: Router,
    private dialogClose: MatDialog,
    private produitService: ProduitService
  ) {
    this.translateService.setDefaultLang('en');
    this.translateService.use(localStorage.getItem('lang') || 'en');
  }

  ngOnInit(): void {
    this.ValidatedForm();
    this.produitService
      .getProduit(JSON.parse(localStorage.getItem('IdP') || '[]') || [])
      .subscribe((o) => {
        this.produit = o;
        console.log(this.produit);
      });
  }

  updateProduit() {
    if (
      this.myForm.get('intitule')?.value != null &&
      this.myForm.get('libelle')?.value != null &&
      this.myForm.get('intitule')?.value.length >= 3 &&
      this.myForm.get('libelle')?.value.length >= 8
    ) {
      this.produitService
        .updateProduit(this.produit.idProduit, this.produit)
        .subscribe(
          (o) => {
            localStorage.setItem(
              'Toast',
              JSON.stringify(['Success', 'Un produit modifié avec succès ! '])
            );
            console.log(this.produit);
            this.onClose();
          },
          (error) => {
            console.log('Failed');
          }
        );
    }
  }

  ValidatedForm() {
    this.myForm = new FormGroup({
      intitule: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      libelle: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  get intitule() {
    return this.myForm.get('intitule');
  }

  get libelle() {
    return this.myForm.get('libelle');
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
}

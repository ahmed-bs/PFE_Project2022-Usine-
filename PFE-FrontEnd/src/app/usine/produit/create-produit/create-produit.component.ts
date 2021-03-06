import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Produit } from 'src/app/Models/produit';
import { ProduitService } from 'src/app/Services/produit.service';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-create-produit',
  templateUrl: './create-produit.component.html',
  styleUrls: ['./create-produit.component.css'],
})
export class CreateProduitComponent implements OnInit {
  produit: Produit = new Produit();
  submitted = false;
  myForm!: FormGroup;
  msg = '';
  msg1 = 0;
  msg2 = 0;
  msg4 = 0;

  constructor(
    private translateService: TranslateService,
    private location: Location,
    private produitService: ProduitService,
    private router: Router,
    private dialogClose: MatDialog
  ) {
    this.translateService.setDefaultLang('en');
    this.translateService.use(localStorage.getItem('lang') || 'en');
  }

  ngOnInit() {
    this.ValidatedForm();
  }

  newEmployee(): void {
    this.submitted = false;
    this.produit = new Produit();
  }

  save() {
    if (this.myForm.get('intitule')?.value == null) {
      this.msg = 'vous devez remplir le formulaire !!';
    } else {
      this.msg = '';
    }

    if (this.myForm.get('libelle')?.value == null) {
      this.msg = 'vous devez remplir le formulaire !!';
    } else {
      this.msg = '';
    }

    this.produitService
      .getProdIntituleUtilise(this.myForm.get('intitule')?.value)
      .subscribe((t) => {
        console.log(t);
        if (t == 1) {
          this.msg1 = 1;
        } else {
          this.msg1 = 0;
        }

        this.produitService
          .getProdLibelleUtilise(this.myForm.get('libelle')?.value)
          .subscribe((l) => {
            console.log(l);
            if (l == 1) {
              this.msg2 = 1;
            } else {
              this.msg2 = 0;
            }

            if (
              this.myForm.get('intitule')?.value != null &&
              this.myForm.get('libelle')?.value != null &&
              this.myForm.get('cgu')?.value == true &&
              this.myForm.get('intitule')?.value.length >= 3 &&
              this.myForm.get('libelle')?.value.length >= 8 &&
              t == 0 &&
              l == 0
            ) {
              console.log(this.produit);
              this.produit.idProduit = 1;
              this.produitService.createProduit(this.produit).subscribe((o) => {
                localStorage.setItem(
                  'Toast',
                  JSON.stringify([
                    'Success',
                    'Un produit a ??t?? ajout?? avec succ??s',
                  ])
                );
                this.onClose();
                console.log(this.produit);
              });
            }
          });
      });
  }

  onSubmit() {
    if (this.myForm.get('cgu')?.value == true) {
      this.msg4 = 0;
    } else {
      this.msg4 = 1;
    }

    if (
      this.myForm.get('intitule')?.value == null ||
      this.myForm.get('libelle')?.value == null
    ) {
      this.msg = 'vous devez remplir le formulaire !!';
    } else {
      this.msg = '';
    }
    this.save();
  }

  gotoList() {
    this.router.navigate(['agriculteur/produit/listeProduit']);
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
      cgu: new FormControl(false, Validators.requiredTrue),
    });
  }

  get intitule() {
    return this.myForm.get('intitule');
  }

  get libelle() {
    return this.myForm.get('libelle');
  }
}

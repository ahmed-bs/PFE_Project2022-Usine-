import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Centre } from 'src/app/Models/centre';
import { CentreCollecteService } from 'src/app/Services/centre-collecte.service';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-create-centre-collecte',
  templateUrl: './create-centre-collecte.component.html',
  styleUrls: ['./create-centre-collecte.component.css'],
})
export class CreateCentreCollecteComponent implements OnInit {
  centre: Centre = new Centre();
  submitted = false;
  msg = '';
  msg1 = 0;
  msg2 = 0;
  msg3 = 0;
  msg4 = 0;
  msgErreur = 0;
  qteAct = 0;

  myForm = new FormGroup({
    nomCentre: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
    ]),
    adresse: new FormControl(null, [
      Validators.required,
      Validators.minLength(4),
    ]),
    ville: new FormControl(null, [
      Validators.required,
      Validators.minLength(4),
    ]),
    tel: new FormControl(null, [
      Validators.required,
      Validators.pattern('[0-9 ]{8}'),
    ]),
    cgu: new FormControl(false, Validators.requiredTrue),
  });

  constructor(
    private translateService: TranslateService,
    private location: Location,
    private centreCollecteService: CentreCollecteService,
    private router: Router,
    private dialogClose: MatDialog
  ) {
    this.translateService.setDefaultLang('en');
    this.translateService.use(localStorage.getItem('lang') || 'en');
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {}

  newTank(): void {
    this.submitted = false;
    this.centre = new Centre();
  }

  save() {
    if (
      this.myForm.get('nomCentre')?.value == null ||
      this.myForm.get('ville')?.value == null ||
      this.myForm.get('adresse')?.value == null ||
      this.myForm.get('tel')?.value == null
    ) {
      this.msg = 'vous devez remplir le formulaire !!';
    } else {
      this.msg = '';
    }

    this.centreCollecteService
      .getCollecteurUtilise(this.myForm.get('nomCentre')?.value)
      .subscribe((t) => {
        console.log(t);
        if (t == 1) {
          this.msg1 = 1;
        } else {
          this.msg1 = 0;
        }

        this.centreCollecteService
          .getTelUtilise(this.myForm.get('tel')?.value)
          .subscribe((t2) => {
            console.log(t2);
            if (t2 == 1) {
              this.msg2 = 1;
            } else {
              this.msg2 = 0;
            }

            if (
              this.myForm.get('nomCentre')?.value != null &&
              this.myForm.get('ville')?.value != null &&
              this.myForm.get('adresse')?.value != null &&
              this.myForm.get('nomCentre')?.value.length >= 3 &&
              this.myForm.get('ville')?.value.length >= 4 &&
              this.myForm.get('tel')?.value.toString().length == 8 &&
              this.myForm.get('adresse')?.value.length >= 4 &&
              this.myForm.get('tel')?.value != null &&
              t == 0 &&
              t2 == 0 &&
              this.myForm.get('cgu')?.value == true
            ) {
              this.centreCollecteService
                .createCentre({
                  nomCentre: this.myForm.get('nomCentre')?.value,
                  adresse: this.myForm.get('adresse')?.value,
                  ville: this.myForm.get('ville')?.value,
                  tel: this.myForm.get('tel')?.value,
                })
                .subscribe((o) => {
                  console.log(this.centre);
                  localStorage.setItem(
                    'Toast',
                    JSON.stringify([
                      'Success',
                      'Un cnetre a ??t?? ajout?? avec succ??s',
                    ])
                  );
                  this.onClose();
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
      this.myForm.get('nomCentre')?.value == null ||
      this.myForm.get('ville')?.value == null ||
      this.myForm.get('adresse')?.value == null ||
      this.myForm.get('tel')?.value == null
    ) {
      this.msg = 'vous devez remplir le formulaire !!';
    } else {
      this.msg = '';
    }
    this.save();
  }

  gotoList() {
    this.router.navigate(['usine/centreCollecte/listeCentreCollecte']);
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

  get nomCentre() {
    return this.myForm.get('nomCentre');
  }

  get adresse() {
    return this.myForm.get('adresse');
  }

  get ville() {
    return this.myForm.get('ville');
  }

  get tel() {
    return this.myForm.get('tel');
  }
}

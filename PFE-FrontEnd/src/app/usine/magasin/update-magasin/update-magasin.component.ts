import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Magasin } from 'src/app/Models/magasin';
import { MagasinService } from 'src/app/Services/magasin.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-update-magasin',
  templateUrl: './update-magasin.component.html',
  styleUrls: ['./update-magasin.component.css'],
})
export class UpdateMagasinComponent implements OnInit {
  magasin: Magasin = new Magasin();
  // myForm!:FormGroup;
  CheckesCompetance: boolean = false;

  myForm = new FormGroup({
    nomMag: new FormControl(null, [
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
  });

  constructor(
    private translateService: TranslateService,
    private location: Location,
    private dialogClose: MatDialog,
    private router: Router,
    private magasinService: MagasinService
  ) {
    this.translateService.setDefaultLang('en');
    this.translateService.use(localStorage.getItem('lang') || 'en');
  }

  ngOnInit(): void {
    this.magasinService
      .getMagasin(JSON.parse(localStorage.getItem('IdMag') || '[]') || [])
      .subscribe((o) => {
        this.magasin = o;
        console.log(this.magasin);
      });
  }

  updateMagasin() {
    if (
      this.myForm.get('adresse')?.value != null &&
      this.myForm.get('nomMag')?.value != null &&
      this.myForm.get('ville')?.value != null &&
      this.myForm.get('nomMag')?.value.length >= 3 &&
      this.myForm.get('ville')?.value.length >= 4 &&
      this.myForm.get('adresse')?.value.length >= 4 &&
      this.myForm.get('tel')?.value != null &&
      this.myForm.get('tel')?.value.toString().length == 8
    ) {
      this.magasinService
        .updateMagasin(this.magasin.idMag, {
          nomMag: this.myForm.get('nomMag')?.value,
          adresse: this.myForm.get('adresse')?.value,
          ville: this.myForm.get('ville')?.value,
          tel: this.myForm.get('tel')?.value,
        })
        .subscribe(
          (o) => {
            localStorage.setItem(
              'Toast',
              JSON.stringify([
                'Success',
                'Un magasin a ??t?? modifi?? avec succ??s',
              ])
            );
            console.log(this.magasin);
            this.onClose();
          },
          (error) => {
            console.log('Failed');
          }
        );
    }
  }

  get nomMag() {
    return this.myForm.get('nomMag');
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

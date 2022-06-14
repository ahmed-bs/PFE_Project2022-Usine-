import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Tank } from 'src/app/Models/tank';
import { Router } from '@angular/router';
import { TankService } from 'src/app/Services/tank.service';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-update-tank',
  templateUrl: './update-tank.component.html',
  styleUrls: ['./update-tank.component.css'],
})
export class UpdateTankComponent implements OnInit {
  tank: Tank = new Tank();
  CheckesCompetance: boolean = false;

  myForm = new FormGroup({
    matricule: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
    ]),
    poidVide: new FormControl(null, [Validators.required, Validators.min(500)]),
  });

  constructor(
    private translateService: TranslateService,
    private location: Location,
    private router: Router,
    private dialogClose: MatDialog,
    private tankService: TankService
  ) {
    this.translateService.setDefaultLang('en');
    this.translateService.use(localStorage.getItem('lang') || 'en');
  }

  ngOnInit(): void {
    this.tankService
      .getTank(JSON.parse(localStorage.getItem('IdTank') || '[]') || [])
      .subscribe((o) => {
        this.tank = o;
        console.log(this.tank);
      });
  }

  updateTank() {
    if (
      this.myForm.get('poidVide')?.value != null &&
      this.myForm.get('matricule')?.value != null &&
      this.myForm.get('poidVide')?.value >= 500 &&
      this.myForm.get('matricule')?.value.length >= 8
    ) {
      this.tankService
        .updateTank(this.tank.idTank, {
          matricule: this.myForm.get('matricule')?.value,
          poidVide: this.myForm.get('poidVide')?.value,
        })
        .subscribe(
          (o) => {
            localStorage.setItem(
              'Toast',
              JSON.stringify(['Success', 'Un tank a été modifié avec succès'])
            );
            this.onClose();
            console.log(this.tank);
          },
          (error) => {
            console.log('Failed');
          }
        );
    }
  }

  get matricule() {
    return this.myForm.get('matricule');
  }

  get poidVide() {
    return this.myForm.get('poidVide');
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

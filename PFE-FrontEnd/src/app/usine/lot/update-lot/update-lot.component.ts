import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Lot } from 'src/app/Models/lot';
import { LotService } from 'src/app/Services/lot.service';

@Component({
  selector: 'app-update-lot',
  templateUrl: './update-lot.component.html',
  styleUrls: ['./update-lot.component.css'],
})
export class UpdateLotComponent implements OnInit {
  lot: Lot = new Lot();
  // myForm!:FormGroup;
  CheckesCompetance: boolean = false;

  myForm = new FormGroup({
    type: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
  });

  constructor(
    private translateService: TranslateService,
    private dialogClose: MatDialog,
    private lotService: LotService
  ) {
    this.translateService.setDefaultLang('en');
    this.translateService.use(localStorage.getItem('lang') || 'en');
  }

  ngOnInit(): void {
    this.lotService
      .getLot(JSON.parse(localStorage.getItem('IdLot') || '[]') || [])
      .subscribe((o) => {
        this.lot = o;
        console.log(this.lot);
      });
  }

  updateLot() {
    this.lotService
      .updateLot(this.lot.idL, {
        type: this.myForm.get('type')?.value,
        description: this.myForm.get('description')?.value,
      })
      .subscribe(
        (o) => {
          localStorage.setItem(
            'Toast',
            JSON.stringify(['Success', 'Un lot a été modifié avec succes'])
          );
          window.location.reload();
          console.log(this.lot);
        },
        (error) => {
          console.log('Failed');
        }
      );
  }

  get type() {
    return this.myForm.get('type');
  }

  get description() {
    return this.myForm.get('description');
  }

  onClose() {
    this.dialogClose.closeAll();
  }
}

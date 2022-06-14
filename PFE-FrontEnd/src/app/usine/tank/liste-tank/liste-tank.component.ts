import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Tank } from 'src/app/Models/tank';
import { TankService } from 'src/app/Services/tank.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DetailsTankComponent } from '../details-tank/details-tank.component';
import { UpdateTankComponent } from '../update-tank/update-tank.component';
import { CreateTankComponent } from '../create-tank/create-tank.component';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-liste-tank',
  templateUrl: './liste-tank.component.html',
  styleUrls: ['./liste-tank.component.css'],
})
export class ListeTankComponent implements OnInit {
  @ViewChild('paginator') paginator!: MatPaginator;
  // AddForSotedData
  @ViewChild(MatSort) matSort!: MatSort;

  intervalId?: any;
  idContenu?: string;
  idTitle?: string;
  Toast!: string[];
  counter: number = 0;
  ShowToast: string = 'hide';
  lang = '';

  ELEMENT_DATA?: Tank[];
  tank?: Tank;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'idTank',
    'matricule',
    'poidVide',
    'poidActuel',
    'etat',
    'action',
  ];

  constructor(
    private translateService: TranslateService,
    private location: Location,
    private tankService: TankService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.translateService.setDefaultLang('en');
    this.translateService.use(localStorage.getItem('lang') || 'en');
  }

  ngOnInit() {
    console.log(localStorage.getItem('lang') || 'en');
    this.lang = localStorage.getItem('lang') || 'en';

    this.reloadData();

    this.idContenu = 'TostSuccessContenu';
    this.idTitle = 'TostSuccessTile';

    this.Toast = JSON.parse(localStorage.getItem('Toast') || '[]') || [];
    if (this.Toast[0] == 'Success') {
      console.log('Toast est n est pas vide');
      this.showToast();
    } else {
      console.log('Toast Vide');
    }
  }

  reloadData() {
    this.tankService.getTanks().subscribe((o) => {
      this.ELEMENT_DATA = o;
      this.dataSource = new MatTableDataSource(o);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.matSort;
      console.log(this.dataSource);
      console.log(this.ELEMENT_DATA);
    });
  }

  deleteTank(id: number) {
    let confirmation = confirm(
      'Êtes-vous sûr de supprimer le tank numéro :' + id + ' ??'
    );
    if (confirmation)
      this.tankService.deleteTank(id).subscribe(
        () => {
          this.Toast[0] = 'Success';
          this.Toast[1] = 'Un tank a été supprimé avec succès';
          localStorage.setItem('Toast', JSON.stringify(this.Toast));
          this.onClose();
        },
        (error) => {
          this.idContenu = 'TostDangerContenu';
          this.idTitle = 'TostDangerTile';
          this.Toast[0] = 'Failed';
          this.Toast[1] = 'Échec de la suppression du Tank !!';
          this.showToast();
        }
      );
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
    this.dialog.closeAll();
    this.onReload();
  }

  detailsTank(tank: Tank) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    localStorage.setItem('IdTank', JSON.stringify(tank.idTank));
    this.dialog.open(DetailsTankComponent, dialogConfig);
  }

  updateTank(tank: Tank) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    localStorage.setItem('IdTank', JSON.stringify(tank.idTank));
    this.dialog.open(UpdateTankComponent, dialogConfig);
  }

  onOpenDialogCreate(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(CreateTankComponent, dialogConfig);
  }

  filterData($event: any) {
    this.dataSource.filter = $event.target.value;
  }

  showToast() {
    if (this.ShowToast == 'hide') {
      setTimeout(() => {
        this.ShowToast = 'show';
        console.log(this.ShowToast);
      }, 1);
    }

    setTimeout(() => {
      this.ShowToast = 'hide';
      this.Toast = [];
      localStorage.setItem('Toast', JSON.stringify(this.Toast));
      console.log(this.ShowToast);
    }, 6100);
    this.intervalId = setInterval(() => {
      this.counter = this.counter + 1;
      console.log(this.counter);
      if (this.counter === 6) clearInterval(this.intervalId);
    }, 1000);
    this.counter = 0;
  }
}

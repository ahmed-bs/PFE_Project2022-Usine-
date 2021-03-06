import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CentreCollecteService } from 'src/app/Services/centre-collecte.service';
import { Centre } from 'src/app/Models/centre';
import { DetailsCentreCollecteComponent } from '../details-centre-collecte/details-centre-collecte.component';
import { UpdateCentreCollecteComponent } from '../update-centre-collecte/update-centre-collecte.component';
import { CreateCentreCollecteComponent } from '../create-centre-collecte/create-centre-collecte.component';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-liste-centre-collecte',
  templateUrl: './liste-centre-collecte.component.html',
  styleUrls: ['./liste-centre-collecte.component.css'],
})
export class ListeCentreCollecteComponent implements OnInit {
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

  ELEMENT_DATA?: Centre[];
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'idCentre',
    'nomCentre',
    'adresse',
    'ville',
    'tel',
    'action',
  ];

  constructor(
    private translateService: TranslateService,
    private location: Location,
    private centreCollecteService: CentreCollecteService,
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
    this.centreCollecteService.getCentres().subscribe((o) => {
      this.ELEMENT_DATA = o;
      this.dataSource = new MatTableDataSource(o);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.matSort;
      console.log(this.dataSource);
      console.log(this.ELEMENT_DATA);
    });
  }

  deleteCentre(id: number) {
    let confirmation = confirm(
      '??tes-vous s??r de supprimer le Ccntre num??ro :' + id + ' ??'
    );
    if (confirmation)
      this.centreCollecteService.deleteCentre(id).subscribe(
        () => {
          this.Toast[0] = 'Success';
          this.Toast[1] = 'Un centre a ??t?? supprim?? avec succ??s';
          localStorage.setItem('Toast', JSON.stringify(this.Toast));
          this.onClose();
        },
        (error) => {
          this.idContenu = 'TostDangerContenu';
          this.idTitle = 'TostDangerTile';
          this.Toast[0] = 'Failed';
          this.Toast[1] = '??chec de la suppression !!';
          this.showToast();
        }
      );
  }

  detailsCentre(centre: Centre) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    localStorage.setItem('IdCentre', JSON.stringify(centre.idCentre));
    this.dialog.open(DetailsCentreCollecteComponent, dialogConfig);
  }

  updateCentre(centre: Centre) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    localStorage.setItem('IdCentre', JSON.stringify(centre.idCentre));
    this.dialog.open(UpdateCentreCollecteComponent, dialogConfig);
  }

  onOpenDialogCreate(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(CreateCentreCollecteComponent, dialogConfig);
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

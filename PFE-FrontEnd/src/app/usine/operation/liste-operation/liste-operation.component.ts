import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Operation } from 'src/app/Models/operation';
import { OperationService } from 'src/app/Services/operation.service';
import { TankService } from 'src/app/Services/tank.service';
import { CreateOperationComponent } from '../create-operation/create-operation.component';
import { DetailsOperationComponent } from '../details-operation/details-operation.component';
import { UpdateOperationComponent } from '../update-operation/update-operation.component';
import { Location } from '@angular/common';
import { ethers } from 'ethers';
import { Observable } from 'rxjs';
import { OperationTank } from 'src/app/Models/operationTank';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
declare let require: any;
declare let window: any;
let Remplissage = require('../../../../../build/contracts/RemplissageUsine.json');
@Component({
  selector: 'app-liste-operation',
  templateUrl: './liste-operation.component.html',
  styleUrls: ['./liste-operation.component.css'],
})
export class ListeOperationComponent implements OnInit {
  @ViewChild('paginator') paginator!: MatPaginator;
  // AddForSotedData
  @ViewChild(MatSort) matSort!: MatSort;
  connected!: string;
  intervalId?: any;
  idContenu?: string;
  idTitle?: string;
  Toast!: string[];
  counter: number = 0;
  ShowToast: string = 'hide';
  waiting = environment.wating;
  ELEMENT_DATA?: Operation[];
  operation?: Operation;
  dataSource!: MatTableDataSource<any>;
  v = 0;
  erreur = 0;
  err = '';
  p = 0;
  q = 0;
  displayedColumns: string[] = [
    'idOperation',
    'poidsLait',
    'dateOperation',
    'centreCollecte',
    'code',
    'action',
  ];

  constructor(
    private translateService: TranslateService,
    private operationService: OperationService,
    private tankService: TankService,
    private location: Location,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.translateService.setDefaultLang('en');
    this.translateService.use(localStorage.getItem('lang') || 'en');
  }

  ngOnInit() {
    this.reloadData();
    console.log(this.tankService.getTanksQteLibre());

    this.idContenu = 'TostSuccessContenu';
    this.idTitle = 'TostSuccessTile';

    this.Toast = JSON.parse(localStorage.getItem('Toast') || '[]') || [];
    if (this.Toast[0] == 'Success') {
      console.log('Toast est n est pas vide');
      this.showToast();
    } else if (this.Toast[0] == 'Failed') {
      console.log('Toast est n est pas vide');
      this.idContenu = 'TostDangerContenu';
      this.idTitle = 'TostDangerTile';
      this.showToast();
    } else {
      console.log('Toast Vide');
    }
  }

  operations!: Observable<OperationTank[]>;
  jj!: number;

  reloadData00u() {
    const depKEY = Object.keys(Remplissage.networks)[0];
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      console.log(signer);
      const contract = new ethers.Contract(
        Remplissage.networks[depKEY].address,
        Remplissage.abi,
        signer
      );
      this.operations = contract.getOperationTanksUsine();
    }
    console.log('**************************4471441714144');
    console.log(this.operations);
  }

  reloadData() {
    this.operationService.getOperationsRemplissages().subscribe((o) => {
      this.ELEMENT_DATA = o;
      this.dataSource = new MatTableDataSource(o);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.matSort;
      console.log(this.dataSource);
      console.log(this.ELEMENT_DATA);
    });
  }

  deleteOperation(id: number) {
    let confirmation = confirm(
      "Êtes-vous sûr de supprimer l'opération où son id est égale à : " +
        id +
        ' ??'
    );
    if (confirmation)
      this.operationService.deleteOperation(id).subscribe(
        () => {
          this.Toast[0] = 'Success';
          this.Toast[1] = 'Une opération a été supprimée avec succès';
          localStorage.setItem('Toast', JSON.stringify(this.Toast));
          this.onClose();
        },
        (error) => {
          this.idContenu = 'TostDangerContenu';
          this.idTitle = 'TostDangerTile';
          this.Toast[0] = 'Failed';
          this.Toast[1] = 'Échec de la suppression !!';
          this.showToast();
        }
      );
  }

  deleteOp(id: number) {
    this.tankService.getTanksQteGenerale().subscribe((o) => {
      console.log(o);
      this.q = o;
      this.operationService.getOperation(id).subscribe((a) => {
        console.log(a.poidsLait);
        this.p = a.poidsLait;

        if (this.p <= this.q) {
          this.deleteOperation(id);
        } else {
          this.idContenu = 'TostDangerContenu';
          this.idTitle = 'TostDangerTile';
          this.Toast[0] = 'Failed';
          this.Toast[1] =
            'Vous ne pouvez pas supprimer cette opéreation, car la quantite disponible dans les tanks est inferieur à la quantité que vous voulez la supprimée !!';
          this.showToast();
        }
      });
    });
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

  detailsOperation(operation: Operation) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    localStorage.setItem('IdOperation', JSON.stringify(operation.idOperation));
    this.dialog.open(DetailsOperationComponent, dialogConfig);
  }

  updateOperation(operation: Operation) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    localStorage.setItem('IdOperation', JSON.stringify(operation.idOperation));
    this.dialog.open(UpdateOperationComponent, dialogConfig);
  }

  onOpenDialogCreate(): void {
    this.connected = JSON.parse(localStorage.getItem('state') || '[]') || [];
    console.log(this.connected);
    this.tankService.getQteLibreAujourdhui().subscribe((o) => {
      console.log(o);
      if (o > 0 && this.connected == 'connected') {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        this.dialog.open(CreateOperationComponent, dialogConfig);
        this.erreur = 0;
      } else if (o <= 0) {
        this.erreur = 1;
        this.idContenu = 'TostDangerContenu';
        this.idTitle = 'TostDangerTile';
        this.Toast[0] = 'Erreur';
        this.Toast[1] = 'Les tanks sont totalment remplis !!';
        this.showToast();
      } else if (this.connected == 'notconnected') {
        this.idContenu = 'TostDangerContenu';
        this.idTitle = 'TostDangerTile';
        this.Toast[0] = 'Erreur';
        this.Toast[1] =
          "Vous n'êtes pas connecté !! \n vous devez d'abord vous connecter à metamask !!";
        this.showToast();
      }
    });
  }

  onOpenDialogCreate2(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(CreateOperationComponent, dialogConfig);
  }

  filterData($event: any) {
    this.dataSource.filter = $event.target.value;
  }

  showToast() {
    if (this.ShowToast == 'hide') {
      setTimeout(() => {
        this.ShowToast = 'show';
      }, 1);
    }

    setTimeout(() => {
      this.ShowToast = 'hide';
      this.Toast = [];
      localStorage.setItem('Toast', JSON.stringify(this.Toast));
    }, 12100);
    this.intervalId = setInterval(() => {
      this.counter = this.counter + 1;
      if (this.counter === 15) clearInterval(this.intervalId);
    }, 1000);
    this.counter = 0;
  }
}

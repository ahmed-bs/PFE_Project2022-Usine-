import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Operation } from 'src/app/Models/operation';
import { OperationService } from 'src/app/Services/operation.service';
import { TankService } from 'src/app/Services/tank.service';
import { ProduitService } from 'src/app/Services/produit.service';
import { CreateOperationRetraitComponent } from '../create-operation-retrait/create-operation-retrait.component';
import { DetailsOperationRetraitComponent } from '../details-operation-retrait/details-operation-retrait.component';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-liste-operation-retrait',
  templateUrl: './liste-operation-retrait.component.html',
  styleUrls: ['./liste-operation-retrait.component.css'],
})
export class ListeOperationRetraitComponent implements OnInit {
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
  erreur = 0;
  waiting = environment.wating;
  ELEMENT_DATA?: Operation[];
  operation?: Operation;
  dataSource!: MatTableDataSource<any>;
  v = 0;
  q = 0;
  p = 0;
  displayedColumns: string[] = [
    'idOperation',
    'qtePrise',
    'produit',
    'magasin',
    'code',
    'dateOperation',
    'action',
  ];

  constructor(
    private translateService: TranslateService,
    private operationService: OperationService,
    private tankService: TankService,
    private location: Location,
    private produitService: ProduitService,
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

  reloadData() {
    this.operationService.getOperationsRetraits().subscribe((o) => {
      this.ELEMENT_DATA = o;
      this.dataSource = new MatTableDataSource(o);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.matSort;
      console.log(this.dataSource);
      console.log(this.ELEMENT_DATA);
    });
  }

  deleteOperation(id: number) {
    this.operationService.getOperation(id).subscribe((o) => {
      this.ELEMENT_DATA = o;
    });
    console.log(this.ELEMENT_DATA);
    let confirmation = confirm(
      'Êtes-vous sûr de supprimer le Operation où son id est egale à : ' +
        id +
        ' ??'
    );
    if (confirmation)
      this.operationService.deleteOperationR(id).subscribe(
        (data) => {
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
    this.tankService.getTanksQteLibre().subscribe((o) => {
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
            'Vous ne pouvez pas supprimer cette opération, car la quantité disponible est inferieur à la quantité que vous voulez la supprimée !!';
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
    this.dialog.open(DetailsOperationRetraitComponent, dialogConfig);
  }

  onOpenDialogCreate(): void {
    this.connected = JSON.parse(localStorage.getItem('state') || '[]') || [];
    console.log(this.connected);
    this.produitService.getQteProduitsG().subscribe((o) => {
      console.log(o);
      if (o > 0 && this.connected == 'connected') {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        this.dialog.open(CreateOperationRetraitComponent, dialogConfig);
      } else if (o <= 0) {
        this.erreur = 1;
        this.idContenu = 'TostDangerContenu';
        this.idTitle = 'TostDangerTile';
        this.Toast[0] = 'Erreur';
        this.Toast[1] =
          "Le stock est vide !! \n Vous ne pouvez pas effectuer l'opération de retrait !!";
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
    this.dialog.open(CreateOperationRetraitComponent, dialogConfig);
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
    }, 9100);
    this.intervalId = setInterval(() => {
      this.counter = this.counter + 1;
      if (this.counter === 9) clearInterval(this.intervalId);
    }, 1000);
    this.counter = 0;
  }
}

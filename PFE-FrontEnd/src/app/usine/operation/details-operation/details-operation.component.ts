import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Operation } from 'src/app/Models/operation';
import { OperationService } from 'src/app/Services/operation.service';

@Component({
  selector: 'app-details-operation',
  templateUrl: './details-operation.component.html',
  styleUrls: ['./details-operation.component.css'],
})
export class DetailsOperationComponent implements OnInit {
  id!: number;
  idO!: any;
  operation?: Operation = new Operation();

  constructor(
    private translateService: TranslateService,
    private dialogClose: MatDialog,
    private route: ActivatedRoute,
    private operationService: OperationService
  ) {
    this.translateService.setDefaultLang('en');
    this.translateService.use(localStorage.getItem('lang') || 'en');
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.operationService
      .getOperation(
        JSON.parse(localStorage.getItem('IdOperation') || '[]') || []
      )
      .subscribe((o) => {
        this.operation = o;
        this.idO = this.operation?.idOperation;
        console.log(this.operation);
      });
  }

  closeDetails() {
    this.dialogClose.closeAll();
  }
}

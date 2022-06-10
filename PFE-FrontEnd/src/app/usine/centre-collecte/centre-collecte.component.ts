import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-centre-collecte',
  templateUrl: './centre-collecte.component.html',
  styleUrls: ['./centre-collecte.component.css'],
})
export class CentreCollecteComponent implements OnInit {
  constructor(private translateService: TranslateService) {
    this.translateService.setDefaultLang('en');
    this.translateService.use(localStorage.getItem('lang') || 'en');
  }

  ngOnInit(): void {}
}

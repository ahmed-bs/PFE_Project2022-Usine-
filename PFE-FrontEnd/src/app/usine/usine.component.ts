import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-usine',
  templateUrl: './usine.component.html',
  styleUrls: ['./usine.component.css'],
})
export class UsineComponent implements OnInit {
  constructor(private translateService: TranslateService) {
    this.translateService.setDefaultLang('en');
    this.translateService.use(localStorage.getItem('lang') || 'en');
  }

  ngOnInit(): void {}
}

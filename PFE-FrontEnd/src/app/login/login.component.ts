import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../Models/user';
import { AuthService } from '../Services/auth.service';
import { UserService } from '../Services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user = new User();
  err: number = 0;

  constructor(
    private translateService: TranslateService,
    private authService: AuthService,
    private userService: UserService,
    public router: Router
  ) {
    this.translateService.setDefaultLang('en');
    this.translateService.use(localStorage.getItem('lang') || 'en');
  }

  ngOnInit() {}

  onLoggedin() {
    this.authService.login(this.user).subscribe(
      (data) => {
        let jwToken: any = data.headers.get('Authorization');
        this.authService.saveToken(jwToken);
        this.userService
          .getUserWithUsername(this.user.username)
          .subscribe((u) => {
            console.log('haahahahahahahahahhaa');
            console.log(this.user.username);
            console.log(u.idU);
            console.log('haahahahahahahahahhaa');
            localStorage.setItem('IdUser', JSON.stringify(u.idU));
          });

        this.router.navigate(['/usine/dashboard']);

      },
      (err) => {
        this.err = 1;
      }
    );
  }

  password = 'password';
  myFunction() {
    if (this.password === 'password') {
      this.password = 'text';
    } else {
      this.password = 'password';
    }
  }
}

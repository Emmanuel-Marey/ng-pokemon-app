import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit, AfterViewInit {
  auth: AuthService;

  message: string;

  name: string;
  password: string;

  constructor(
    private authService: AuthService, 
    private router: Router)
  { }

  ngOnInit(): void {  
    this.auth = this.authService;

    if (this.auth.isLoggedIn()) {
      this.message = 'Vous êtes connecté.';
    } else {
      this.message = 'Vous êtes déconnecté. (Pichu/Pichu)';
    }
  }

  ngAfterViewInit(): void {
  }

  public login() {
    this.message = 'Tentative de connexion en cours...';

    this.auth.login(this.name, this.password)
      .subscribe((isLoggedIn: boolean) => {
        if (isLoggedIn) {
          this.message = 'Vous êtes connecté.';
          this.router.navigate(['/pokemons']);
        } else {
          this.message = 'Identifiant ou mot de passe incorrect.';
          this.password = '';
          this.router.navigate(['/login']);
        }
      })
  }
}

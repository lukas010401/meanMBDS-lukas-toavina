import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    // utilise l'authService pour se connecter
    if (!this.authService.loggedIn) {
      this.authService.logIn();
      this.router.navigate(['/home']);
      // on change le label du bouton
      // this.labelConnexion = "Se déconnecter";
    } else {
      this.authService.logOut();
      // et on navigue vers la page d'accueil
      this.router.navigate(['/login']);
    }
    // TODO: Handle login logic
    console.log('Email:', this.email);
    console.log('Password:', this.password);
  }
}

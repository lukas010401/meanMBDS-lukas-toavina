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
  logged: boolean = false;

  users = [
    { email: 'user1@user1.com', password: 'root1' },
    { email: 'user2@user2.com', password: 'root2' },
    { email: 'user3@user3.com', password: 'root3' },
  ];

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    // utilise l'authService pour se connecter
    if (!this.authService.loggedIn) {
      let user = this.users.find(
        (u) => u.email == this.email && u.password == this.password
      );
      if (user != null) {
        this.authService.logIn();
        this.router.navigate(['/home']);
      }

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

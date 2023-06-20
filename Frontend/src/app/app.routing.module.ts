import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
// Importez les autres composants et configurez les routes appropriées

const routes: Routes = [
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  // { path: 'login', component: LoginComponent },
  // Configurez les autres routes de l'application
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

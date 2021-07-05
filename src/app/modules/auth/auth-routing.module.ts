import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotAuthGuard } from 'src/app/core';
import { LoginComponent, SignupComponent } from './containers';

const routes: Routes = [
  { path: 'login', canActivate: [NotAuthGuard], component: LoginComponent },
  { path: 'signup', canActivate: [NotAuthGuard], component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [NotAuthGuard],
})
export class AuthRoutingModule {}

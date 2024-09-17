import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { IntroComponent } from './intro/intro.component';
import { ManualListComponent } from './manual-list/manual-list.component';
import { ManualPYPComponent } from './manual-pyp/manual-pyp.component';
import { PypDepartmentComponent } from './pyp-department/pyp-department.component';
import { PypProfileComponent } from './pyp-profile/pyp-profile.component';

const routes: Routes = [
  { path: 'intro', component: IntroComponent },
  { path: 'home', component: HomeComponent },
  { path: 'manual-list', component: ManualListComponent },
  { path: 'manual-detail', component: ManualPYPComponent },

  // Rutas dinámicas para departamentos y perfiles
  { path: 'department/:id', component:PypDepartmentComponent },
  { path: 'profile/:id', component: PypProfileComponent },

  //ruta principal
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

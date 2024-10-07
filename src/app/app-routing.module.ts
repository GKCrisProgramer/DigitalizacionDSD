import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { IntroComponent } from './intro/intro.component';
import { ManualListComponent } from './manual-list/manual-list.component';
import { ManualPYPComponent } from './manual-pyp/manual-pyp.component';
import { PypDepartmentComponent } from './pyp-department/pyp-department.component';
import { PypProfileComponent } from './pyp-profile/pyp-profile.component';
import { OrganigramaComponent } from './organigrama/organigrama.component';
import { PerfilesComponent } from './perfiles/perfiles.component';

const routes: Routes = [
  //agregar esta ruta
  // =>{ path: 'login', component: LoginComponent },
  { path: 'intro', component: IntroComponent },
  { path: 'home', component: HomeComponent },
  { path: 'manual-list', component: ManualListComponent },
  { path: 'manual-detail', component: ManualPYPComponent },
  { path: 'PerfilesLista', component: PerfilesComponent },

  // Rutas dinámicas para departamentos y perfiles
  { path: 'department/:id', component:PypDepartmentComponent },
  { path: 'profile/:idPuesto', component: PypProfileComponent },
  //{ path: 'desplegable-manual/:idPuesto', component: PypProfileComponent },

  //ruta de organigram
  { path: 'organigrama', component: OrganigramaComponent },

  //ruta principal
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  // cambiar a esta ruta cuando este lista
  //=> { path: '', redirectTo: '/login', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {IntroComponent} from './components/intro/intro.component';
import {HomeComponent} from './components/home/home.component';
import {ManualListComponent} from './components/manual-list/manual-list.component';
import {ManualPYPComponent} from './components/manual-pyp/manual-pyp.component';
import {PerfilesComponent} from './components/perfiles/perfiles.component';
import {PypDepartmentComponent} from './components/pyp-department/pyp-department.component';
import {PypProfileComponent} from './components/pyp-profile/pyp-profile.component';
import {OrganigramaComponent} from './components/organigrama/organigrama.component';
import {OrgListComponent} from './components/org-list/org-list.component';
import {OrgPPTXComponent} from './components/org-pptx/org-pptx.component';
import {OrganizationChartPrezi2Component} from './components/org-prezi2/org-prezi2.component';
import {OrganizationChartPrezi3Component} from './components/org-prezi3/org-prezi3.component';
import {AuthGuard} from './auth.guard';

const routes: Routes = [
  //agregar esta ruta
  { path: 'login', component: LoginComponent },
  { path: 'intro', component: IntroComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'manual-list', component: ManualListComponent },
  { path: 'manual-detail', component: ManualPYPComponent },
  { path: 'ProfileList', component: PerfilesComponent },

  // Rutas dinámicas para departamentos y perfiles
  { path: 'department/:id', component:PypDepartmentComponent },
  { path: 'profile/:profileId', component: PypProfileComponent },
  //{ path: 'desplegable-manual/:idPuesto', component: PypProfileComponent },

  //ruta de organigram
  { path: 'org-list', component: OrgListComponent },
  { path: 'organization-chart', component: OrganigramaComponent },
  { path: 'org-PPTX', component: OrgPPTXComponent },
  { path: 'org-Prezi2', component: OrganizationChartPrezi2Component },
  { path: 'org-Prezi3', component: OrganizationChartPrezi3Component },

  //ruta principal
  //{ path: '', redirectTo: '/home', pathMatch: 'full' },
  // cambiar a esta ruta cuando este lista
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  { path: '**', redirectTo: 'login' }, // Redirige al login por defecto

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

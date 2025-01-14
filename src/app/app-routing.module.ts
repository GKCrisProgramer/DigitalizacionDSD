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
import {ManualProcProfileComponent} from './components/mproc-profile/mproc-profile.component';
import {ManualprocDeparmentComponent} from './components/mproc-deparment/mproc-deparment.component';
import {InductionCoursesComponent} from './components/induction-courses/induction-courses.component';
import {ManualProcListComponent} from './components/mproc-list/mproc-list.component';
import {InductionListComponent} from './components/induction-list/induction-list.component';
import {AuthGuard} from './auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'intro', component: IntroComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'manual-list', component: ManualListComponent },
  { path: 'manual-detail', component: ManualPYPComponent },
  { path: 'ProfileList', component: PerfilesComponent },

  { path: 'department/:departmentId', component:PypDepartmentComponent },
  { path: 'profile/:profileId', component: PypProfileComponent },

  { path: 'ProcedimientosList', component: ManualProcListComponent },
  { path: 'ProcedimientosProfile/:profileId', component: ManualProcProfileComponent },
  { path: 'ProcedimientosDepartment/:departmentId', component: ManualprocDeparmentComponent },
  { path: 'Cursos-lista', component: InductionListComponent },
  { path: 'Cursos-Induccion/:documentId', component: InductionCoursesComponent },

  { path: 'org-list', component: OrgListComponent },
  { path: 'organization-chart', component: OrganigramaComponent },
  { path: 'org-PPTX', component: OrgPPTXComponent },
  { path: 'org-Prezi2', component: OrganizationChartPrezi2Component },
  { path: 'org-Prezi3', component: OrganizationChartPrezi3Component },

  { path: '', redirectTo: '/login', pathMatch: 'full' },

  { path: '**', redirectTo: 'login' }, 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

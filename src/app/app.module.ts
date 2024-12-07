
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Necesario para ngModel
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './auth.guard';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';
import {IntroComponent} from './components/intro/intro.component';
import {ManualListComponent} from './components/manual-list/manual-list.component';
import {ManualPYPComponent} from './components/manual-pyp/manual-pyp.component';
import {PypDepartmentComponent} from './components/pyp-department/pyp-department.component';
import {PypProfileComponent} from './components/pyp-profile/pyp-profile.component';
import {OrganigramaComponent} from './components/organigrama/organigrama.component';
import {PerfilesComponent} from './components/perfiles/perfiles.component';
import {OrgListComponent} from './components/org-list/org-list.component';
import {OrgPPTXComponent} from './components/org-pptx/org-pptx.component';
import {OrganizationChartPrezi2Component} from './components/org-prezi2/org-prezi2.component';
import {OrganizationChartPrezi3Component} from './components/org-prezi3/org-prezi3.component';
import {MProcProfileComponent} from './components/mproc-profile/mproc-profile.component';
import {InductionCoursesComponent} from './components/induction-courses/induction-courses.component';
import {NgOptimizedImage} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    IntroComponent,
    ManualListComponent,
    ManualPYPComponent,
    PypDepartmentComponent,
    PypProfileComponent,
    OrganigramaComponent,
    PerfilesComponent,
    OrgListComponent,
    OrgPPTXComponent,
    OrganizationChartPrezi2Component,
    OrganizationChartPrezi3Component,
    MProcProfileComponent,
    InductionCoursesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgOptimizedImage
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

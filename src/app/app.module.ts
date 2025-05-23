
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Necesario para ngModel
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
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
import {ManualProcProfileComponent} from './components/mproc-profile/mproc-profile.component';
import {InductionCoursesComponent} from './components/induction-courses/induction-courses.component';

import {NgOptimizedImage} from '@angular/common';

import { ManualProcListComponent } from './components/mproc-list/mproc-list.component';
import { ManualprocDeparmentComponent } from './components/mproc-deparment/mproc-deparment.component';
import { InductionListComponent } from './components/induction-list/induction-list.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
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
    ManualProcProfileComponent,
    InductionCoursesComponent,
    ManualProcListComponent,
    ManualprocDeparmentComponent,
    InductionListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HomeComponent,
    BrowserAnimationsModule,
    NgOptimizedImage,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

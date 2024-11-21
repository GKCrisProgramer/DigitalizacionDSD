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
    PerfilesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

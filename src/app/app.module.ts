import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Necesario para ngModel
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { IntroComponent } from './intro/intro.component';
import { ManualListComponent } from './manual-list/manual-list.component';
import { ManualPYPComponent } from './manual-pyp/manual-pyp.component';
import { PypDepartmentComponent } from './pyp-department/pyp-department.component';
import { PypProfileComponent } from './pyp-profile/pyp-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    IntroComponent,
    ManualListComponent,
    ManualPYPComponent,
    PypDepartmentComponent,
    PypProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

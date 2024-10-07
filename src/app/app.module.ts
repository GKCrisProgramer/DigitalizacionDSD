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
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { OrganigramaComponent } from './organigrama/organigrama.component';
import { HttpClientModule } from '@angular/common/http';
import { PerfilesComponent } from './perfiles/perfiles.component';

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
    PdfViewerModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

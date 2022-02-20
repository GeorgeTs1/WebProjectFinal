import { Component } from '@angular/core';
//Angular Imports
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import {OverlayModule} from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularResizeEventModule } from 'angular-resize-event';

//Angular Material
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import {DateAdapter, MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatLuxonDateModule} from '@angular/material-luxon-adapter';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

//Third-party

import { UcWidgetModule } from 'ngx-uploadcare-widget';




// Components
import { NavigationComponent } from './components/navigation/navigation.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { MapComponent } from './components/map/map.component';


//Leaflet
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { StoreVisitComponent } from './components/store-visit/store-visit.component';
import 'leaflet-dialog';


//Components

import { CovidCaseComponent } from './components/covid-case/covid-case.component';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { ForgotUsernameComponent } from './components/forgot-username/forgot-username.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ConfirmEmailComponent } from './components/confirm-email/confirm-email.component';
import { EmailSuccessComponent } from './components/email-success/email-success.component';
import { UsersStatsComponent } from './components/users-stats/users-stats.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';


//Charts.js
import { NgChartsModule } from 'ng2-charts';
import { JsonUploaderComponent } from './components/json-uploader/json-uploader.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import 'chartjs-adapter-luxon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';





@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    MapComponent,
    StoreVisitComponent,
    CovidCaseComponent,
    SearchbarComponent,
    ForgotUsernameComponent,
    ForgotPasswordComponent,
    ConfirmEmailComponent,
    EmailSuccessComponent,
    UsersStatsComponent,
    JsonUploaderComponent,
    AdminPageComponent,
    BarChartComponent,
  ],
  entryComponents: [StoreVisitComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    LeafletModule,
    MatDialogModule,
    FormsModule,
    MatNativeDateModule,
    MatLuxonDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    OverlayModule,
    MatSlideToggleModule,
    A11yModule,
    MatProgressBarModule,
    HttpClientModule,
    UcWidgetModule,
    NgChartsModule,
    MatCheckboxModule,
    AngularResizeEventModule,
    MatTableModule,
    MatPaginatorModule,
    MatAutocompleteModule


  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },

    ],
  bootstrap: [AppComponent]
})
export class AppModule {



}

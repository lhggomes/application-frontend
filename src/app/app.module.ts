import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { ListSupplierComponent } from './supplier/componenets/list-supplier/list-supplier.component';
import { CreateSupplierComponent } from './supplier/componenets/create-supplier/create-supplier.component';
import { CreateCompanyComponent } from './company/componenets/create-company/create-company.component';
import { ListCompanyComponent } from './company/componenets/list-company/list-company.component';
import { HomeComponent } from './shared/components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ListSupplierComponent,
    CreateSupplierComponent,
    CreateCompanyComponent,
    ListCompanyComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

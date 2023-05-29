import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { ListSupplierComponent } from './supplier/componenets/list-supplier/list-supplier.component';
import { CreateSupplierComponent } from './supplier/componenets/create-supplier/create-supplier.component';
import { CreateCompanyComponent } from './company/componenets/create-company/create-company.component';
import { ListCompanyComponent } from './company/componenets/list-company/list-company.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ListSupplierComponent,
    CreateSupplierComponent,
    CreateCompanyComponent,
    ListCompanyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/components/home/home.component';
import { ListCompanyComponent } from './company/componenets/list-company/list-company.component';
import { ListSupplierComponent } from './supplier/componenets/list-supplier/list-supplier.component';
import { CreateCompanyComponent } from './company/componenets/create-company/create-company.component';
import { CreateSupplierComponent } from './supplier/componenets/create-supplier/create-supplier.component';

const routes: Routes = [
  
  { path: '', component: HomeComponent },
  { path: 'company', component: ListCompanyComponent },
  { path: 'company/:id/edit', component: CreateCompanyComponent },
  { path: 'company/create', component: CreateCompanyComponent },
  { path: 'supplier', component: ListSupplierComponent },
  { path: 'supplier/:id/edit', component: CreateSupplierComponent },
  { path: 'supplier/create', component: CreateSupplierComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

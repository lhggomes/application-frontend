import { Component, OnInit } from '@angular/core';
import { Supplier } from '../../model/supplier';
import { SupplierService } from '../../services/supplier';

@Component({
  selector: 'app-list-supplier',
  templateUrl: './list-supplier.component.html',
  styleUrls: ['./list-supplier.component.scss']
})
export class ListSupplierComponent implements OnInit{


  suppliers: Supplier[] = [];
  msgErro: string = '';

  constructor(private supplierService: SupplierService) { }

  ngOnInit(): void {
    this.getSuppliers();

  }

  getSuppliers() {
    return this.supplierService.getSuppliers().subscribe(
      suppliers => {
        this.suppliers = suppliers;
      },
      error => this.msgErro = <any> error
      
    );

  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Supplier } from '../../model/supplier';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from 'src/app/company/services/company';
import { SupplierService } from '../../services/supplier';

@Component({
  selector: 'app-create-supplier',
  templateUrl: './create-supplier.component.html',
  styleUrls: ['./create-supplier.component.scss']
})
export class CreateSupplierComponent implements OnInit, OnDestroy{


  errorMessage: string = '';
  pageTitle: string = 'Cadastro de Empresas';
  formMode: string = '';
  supplier!: Supplier;
  supplierForm!: FormGroup;
  validationMessages!: { [Key: string]: { [key: string]: string } }
  private subscription!: Subscription;

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private supplierService: SupplierService

  ) {

    this.validationMessages = {
      nomeFantasia: {
        required: 'Nome é obrigatório',
        maxlenght: 'Nome não pode exceder mais de 70 caracteres',
      },
      cnpj: {
        required: 'CNPJ é obrigatório',
        maxlenght: 'Nome não pode exceder mais de 15 caracteres',
      },
      cep: {
        required: 'CEP é obrigatório',
        maxlenght: 'CEP não pode exceder mais de 10 caracteres',
      },
    }

  }


  getSupplier(id: string): void {
    this.supplierService.getSupplier(id)
      .subscribe(
        (supplier: Supplier) => this.showSupplier(supplier),
        (error: any) => this.errorMessage = <any>error
      )
  }

  showSupplier(supplier: Supplier): void {

    if (this.supplierForm) {
      this.supplierForm.reset();
    }

    this.supplier = supplier;

    if (this.supplier.id == '') {
      this.pageTitle = 'Adicionar Fornecedor';
    } else {
      this.pageTitle = `Editar fornecedor: ${this.supplier.name}`;
    }

    this.supplierForm.patchValue({

      nome: this.supplier.name,
      cnpj: this.supplier.cpfCnpj,
      cep: this.supplier.cep,
      rg: this.supplier.rg,
      email: this.supplier.email,
      birth: this.supplier.birthDate,
      regType: this.supplier.type
    
    
    })

  }

  deleteSupplier(): void {
    if (this.supplier.id == '') {
      this.onSaveComplete();
    }
    else {
      if (confirm(`Tem certeza que deseja excluir a tarefa: ${this.supplier.name}?`)) {
        this.supplierService.deleteSupplier(this.supplier.id!).subscribe(
          () => this.onSaveComplete(),
          (error: any) => this.errorMessage = <any>error
        );
      }
    }
  }

  save(): void {
    if (this.supplierForm.valid) {
      if (this.supplierForm.dirty) {

        const t = { ...this.supplier, ...this.supplierForm.value };

        if (t.id === '') {
          this.supplierService.createSupplier(t)
            .subscribe(
              () => this.onSaveComplete(),
              (error: any) => this.errorMessage = <any>error
            );
        } else {
          this.supplierService.updateSuppplier(t)
            .subscribe(
              () => this.onSaveComplete(),
              (error: any) => this.errorMessage = <any>error
            );
        }

      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = "Por favor corriga os erros de validação. ";
    }
  }

  onSaveComplete(): void {

    this.supplierForm.reset();
    this.router.navigate(['/supplier']);

  }

  ngOnInit(): void {
    this.formMode = 'new';
    this.supplierForm = this.fb.group({
      cnpj: ['', [Validators.required, Validators.maxLength(14)]],
      nome: ['', [Validators.required, Validators.maxLength(70)]],
      cep: ['', [Validators.required, Validators.maxLength(10)]],
      rg: ['', [Validators.required, Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      regType: ['', []],
      birth: ['', []]
    })

    this.subscription = this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        const nome = params.get('nomeFantasia');

        if (id == null || id == '') {
          const supplier: Supplier = { id: "", name: "", cpfCnpj: "", cep: ""};
          this.showSupplier(supplier);

        } else {
          this.getSupplier(id);
        }
      }
    )
  }

  ngOnDestroy(): void {

  }

}

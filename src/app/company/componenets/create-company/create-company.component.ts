import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Company } from '../../model/company';
import { CompanyService } from '../../services/company';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.scss']
})
export class CreateCompanyComponent implements OnInit, OnDestroy{


  errorMessage: string = '';
  pageTitle: string = 'Cadastro de Empresas';
  formMode: string = '';
  company!: Company;
  companyForm!: FormGroup;
  validationMessages!: { [Key: string]: { [key: string]: string } }
  private subscription!: Subscription;

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private companyService: CompanyService

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


  getCompany(id: string): void {
    this.companyService.getCompany(id)
      .subscribe(
        (company: Company) => this.showCompany(company),
        (error: any) => this.errorMessage = <any>error
      )
  }

  showCompany(company: Company): void {

    if (this.companyForm) {
      this.companyForm.reset();
    }

    this.company = company;

    if (this.company.id == '') {
      this.pageTitle = 'Adicionar Empresa';
    } else {
      this.pageTitle = `Editar empresa: ${this.company.nomeFantasia}`;
    }

    this.companyForm.patchValue({

      nome: this.company.nomeFantasia,
      cnpj: this.company.cnpj,
      cep: this.company.cep
    
    
    })

  }

  deleteCompany(): void {
    if (this.company.id == '') {
      this.onSaveComplete();
    }
    else {
      if (confirm(`Tem certeza que deseja excluir a tarefa: ${this.company.nomeFantasia}?`)) {
        this.companyService.deleteCompany(this.company.id!).subscribe(
          () => this.onSaveComplete(),
          (error: any) => this.errorMessage = <any>error
        );
      }
    }
  }

  save(): void {
    if (this.companyForm.valid) {
      if (this.companyForm.dirty) {

        const t = { ...this.company, ...this.companyForm.value };

        if (t.id === '') {
          this.companyService.createCompany(t)
            .subscribe(
              () => this.onSaveComplete(),
              (error: any) => this.errorMessage = <any>error
            );
        } else {
          this.companyService.updateCompany(t)
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

    this.companyForm.reset();
    this.router.navigate(['/tarefas']);

  }

  ngOnInit(): void {
    this.formMode = 'new';
    this.companyForm = this.fb.group({
      cnpj: ['', [Validators.required, Validators.maxLength(14)]],
      nome: ['', [Validators.required, Validators.maxLength(70)]],
      cep: ['', [Validators.required, Validators.maxLength(10)]],
    })

    this.subscription = this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        const nome = params.get('nomeFantasia');

        if (id == null || id == '') {
          const company: Company = { id: "", nomeFantasia: "", cnpj: "", cep: "", suppliers: []};
          this.showCompany(company);

        } else {
          this.getCompany(id);
        }
      }
    )
  }

  ngOnDestroy(): void {

  }

}

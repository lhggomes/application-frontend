import { Component, OnInit } from '@angular/core';
import { Company } from '../../model/company';
import { CompanyService } from '../../services/company';

@Component({
  selector: 'app-list-company',
  templateUrl: './list-company.component.html',
  styleUrls: ['./list-company.component.scss']
})
export class ListCompanyComponent implements OnInit {


  companies: Company[] = [];
  msgErro: string = '';

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    this.getCompanies();

  }

  getCompanies() {
    return this.companyService.getCompanies().subscribe(
      companies => {
        this.companies = companies;
      },
      error => this.msgErro = <any> error
      
    );

  }

}

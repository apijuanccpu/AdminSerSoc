import { Component, OnInit } from '@angular/core';
import { Empresa } from '../../models/empresa.model';
import { EmpresaService } from '../../services/service.index';

@Component({
  selector: 'app-empreses',
  templateUrl: './empreses.component.html'
})
export class EmpresesComponent implements OnInit {

  cargando = true;
  totalEmpreses = 0;
  empreses: Empresa[] = [];

  constructor(
    public _empresaService: EmpresaService
  ) { }

  ngOnInit() {
    this.cargarEmpreses();
  }

  cargarEmpreses() {
    this._empresaService.cargarEmpreses()
        .subscribe ( empreses => this.empreses = empreses);
  }



}

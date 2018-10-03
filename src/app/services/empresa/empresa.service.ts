import { Injectable } from '@angular/core';
import { Empresa } from '../../models/empresa.model';

import { URL_SERVICES } from '../../config/config';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  empreses: Empresa[] = [];
  totalEmpreses: number;
  constructor(
    public http: HttpClient,
    public router: Router
  ) {

   }

   cargarEmpreses() {
    // tslint:disable-next-line:prefer-const
    let url = URL_SERVICES + '/empresa';

    return this.http.get( url )
              .map( (resp: any) => {

                // this.totalInformes = resp.total;
                return resp.empreses;
              });
  }

  cargarEmpresa( id: string ) {

    const url = URL_SERVICES + '/empresa/' + id;

    return this.http.get( url )
              .map( (resp: any) => resp.empresa );

  }

}

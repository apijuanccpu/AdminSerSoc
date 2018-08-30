import { Component, OnInit } from '@angular/core';
import { Informe } from '../../models/informe.model';
import { InformeService } from '../../services/service.index';
import * as moment from 'moment';

@Component({
  selector: 'app-gestio-informes',
  templateUrl: './gestio-informes.component.html'
})
export class GestioInformesComponent implements OnInit {

  cargando = true;
  totalRegistros = 0;
  informes: Informe[] = [];

  datalimit: string ;

  constructor(
    public _informeService: InformeService
  ) { }

  ngOnInit() {
    this.cargarInformesDosMesos();
  }

  cargarInformes() {
    this._informeService.cargarInformes()
    .subscribe( (resp: any) => {
      console.log(resp);
      this.totalRegistros = resp.total;
      this.informes = resp;
      this.cargando = false;
      // console.log(this.usuarios);
    });
  }

  cargarInformesDosMesos() {
    const now = moment().format('l');
    this.datalimit = moment().add(60, 'day').format('YYYY-MM-DD');
    console.log(this.datalimit);

    this._informeService.cargarInformesVigencia(this.datalimit)
              .subscribe( (resp: any) => {
                console.log(resp);
                this.informes = resp;
                console.log(this.informes);

              });
  }

  cargarInformesData() {
    this.informes = [];

    this._informeService.cargarInformesVigencia(this.datalimit)
              .subscribe( (resp: any) => {
                console.log(resp);
                this.informes = resp;
                console.log(this.informes);

              });
  }

  buscarInforme( termino: string) {
    if (termino.length <= 0) {
      this.cargarInformes();
      return;
    }
    this._informeService.buscarInformes( termino )
        .subscribe( informes => this.informes = informes);
  }

}

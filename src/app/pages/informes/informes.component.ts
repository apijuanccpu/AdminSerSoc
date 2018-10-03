import { Component, OnInit } from '@angular/core';
import { Informe } from '../../models/informe.model';
import { InformeService } from '../../services/service.index';

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html'
})
export class InformesComponent implements OnInit {

  cargando = true;
  totalRegistros = 0;
  informes: Informe[] = [];

  constructor(
    public _informeService: InformeService
  ) { }

  ngOnInit() {
    this.cargarInformes();
  }

  // cargarInformes() {
  //   this._informeService.cargarInformes()
  //   .subscribe( (resp: any) => {
  //     console.log(resp);
  //     this.totalRegistros = resp.total;
  //     this.informes = resp;
  //     this.cargando = false;
  //     // console.log(this.usuarios);
  //   });
  // }
  cargarInformes() {
    this._informeService.cargarInformes()
        .subscribe ( informes => this.informes = informes);
  }

  buscarInforme( termino: string) {
    if (termino.length <= 0) {
      this.cargarInformes();
      return;
    }
    this._informeService.buscarInformes( termino )
        .subscribe( informes => this.informes = informes);
  }

  borrarInforme( informe: Informe) {
    this._informeService.borrarInforme( informe._id )
        .subscribe( () => this.cargarInformes() );
  }

}

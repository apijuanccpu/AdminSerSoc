import { Component, OnInit } from '@angular/core';
import { Peticio } from '../../models/peticio.model';

import { PeticioService } from '../../services/service.index';
import swal from 'sweetalert2';

@Component({
  selector: 'app-peticions',
  templateUrl: './peticions.component.html'
})
export class PeticionsComponent implements OnInit {

  cargando = true;
  totalRegistros = 0;
  peticions: Peticio[] = [];
  constructor(
    public _peticioService: PeticioService
  ) { }

  ngOnInit() {
    this.carregarPeticionsPerEstat(false);
  }

  carregarPeticions() {
    this._peticioService.carregarPeticions()
    .subscribe( (resp: any) => {
      console.log(resp);
      this.totalRegistros = resp.total;
      this.peticions = resp;
      this.cargando = false;
      // console.log(this.usuarios);
    });
  }
  carregarPeticionsPerEstat(estat: boolean) {
    this._peticioService.carregarPeticionsPerEstat(estat)
    .subscribe( (resp: any) => {
      console.log(resp);
      this.totalRegistros = resp.total;
      this.peticions = resp;
      this.cargando = false;
      // console.log(this.usuarios);
    });
  }

  buscarPeticio( termino: string) {
    if (termino.length <= 0) {
      this.carregarPeticionsPerEstat(false);
      return;
    }
    this._peticioService.buscarPeticions( termino )
        .subscribe( peticions => this.peticions = peticions);
  }

  borrarPeticio( peticio: Peticio) {

      swal({
        title: 'Vols esborrar la petició?',
        // text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
      }).then((result) => {
        if (result.value) {
          this._peticioService.borrarPeticio(peticio._id)
          .subscribe( (resp: any) => {
            this.carregarPeticionsPerEstat(false);
            swal(
              'Esborrada!',
              'Anotació esborrada',
              'success'
            );
          });
        }
      });

    }
}

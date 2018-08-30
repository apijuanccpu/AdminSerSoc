import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';
import { DniPeticio } from '../../models/dnipeticio.model';

import swal from 'sweetalert2';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class DnipeticioService {

  constructor(public http: HttpClient,
              public _usuarioService: UsuarioService) { }

  carregarDnisPeticion(idpeticio: string) {
    let url = URL_SERVICES + '/dnipeticio/porpeticion/' + idpeticio;
    url += '?token=' + this._usuarioService.token;

    return this.http.get( url )
              .map( (resp: any) => {

                console.log(resp.dnis);
                return resp.dnis;
              });
  }

  guardarDniPeticio( peticio: string, dni: string ) {

    const dnipeticio = new DniPeticio(dni, peticio, false);

    let url = URL_SERVICES + '/dnipeticio';
    url += '?token=' + this._usuarioService.token;
      return this.http.post( url, dnipeticio )
              .map( (resp: any) => {
                // swal('Informe Creado', dnipeticio._id, 'success');
                return resp.dnis;
              });
    }
  finalitzaDniPeticio( peticio: string) {

    let url = URL_SERVICES + '/dnipeticio/finalitzardnipeticio/' + peticio;
    url += '?token=' + this._usuarioService.token;
      return this.http.put( url, peticio )
              .map( (resp: any) => {
                // swal('Informe Creado', dnipeticio._id, 'success');
                return resp.dni;
              });
  }
  comprobasiDnisOberts(idpeticio: string) {
    let url = URL_SERVICES + '/dnipeticio/comprobasidnisoberts/' + idpeticio;
    url += '?token=' + this._usuarioService.token;

    return this.http.get( url )
              .map( (resp: any) => {

                // console.log(resp.dnis);
                return resp.total;
              });
  }
}

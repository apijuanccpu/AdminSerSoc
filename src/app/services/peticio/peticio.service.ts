import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';

import { Peticio } from '../../models/peticio.model';

import swal from 'sweetalert2';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class PeticioService {

  totalPeticions = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  carregarPeticions() {
    const url = URL_SERVICES + '/peticio';

    return this.http.get( url )
              .map( (resp: any) => {

                this.totalPeticions = resp.total;
                return resp.peticions;
              });
  }

  carregarPeticionsPerEstat(estat: boolean) {
    let url = URL_SERVICES + '/peticio/porEstado/' + estat;
    url += '?token=' + this._usuarioService.token;
    return this.http.get( url )
              .map( (resp: any) => {

                this.totalPeticions = resp.total;
                return resp.peticions;
              });
  }

  carregardnisPeticio( peticio: string) {
    let url = URL_SERVICES + '/dnipeticio/porpeticion/' + peticio;
    url += '?token=' + this._usuarioService.token;
    return this.http.get( url )
              .map( (dnis: any) => {
                console.log(dnis);
                return dnis;
              });
  }

  carregarPeticio( id: string ) {

    let url = URL_SERVICES + '/peticio/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.get( url )
              .map( (resp: any) => {
                console.log(resp.peticio);
                return resp.peticio;
              });

  }

  guardarPeticio( peticio: Peticio ) {

    let url = URL_SERVICES + '/peticio';

    if ( peticio._id ) {
      // actualizando
      url += '/' + peticio._id;
      url += '?token=' + this._usuarioService.token;

      return this.http.put( url, peticio )
                .map( (resp: any) => {
                  swal('PEticio Actualizado', peticio._id, 'success');
                  return resp.peticio;

                });

    } else {
      // creando
      url += '?token=' + this._usuarioService.token;
      return this.http.post( url, peticio )
              .map( (resp: any) => {
                swal('Petició guardada', peticio._id, 'success');
                return resp.peticio;
              });
    }




  }

  buscarPeticions( termino: string ) {

    const url = URL_SERVICES + '/busqueda/coleccion/peticions/' + termino;
    return this.http.get( url )
                .map( (resp: any) => resp.peticions );

  }

  borrarPeticio( id: string ) {

    let url = URL_SERVICES + '/peticio/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete( url )
              .map( resp => {
                swal( 'Peticio esborrat', 'Peticio esborrat correctament', 'success' );
                return resp;
              });

  }
}

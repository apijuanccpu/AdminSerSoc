import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';

import { Anotacio } from '../../models/anotacio.model';

import swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class AnotacioService {

  totalAnotacions = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

carregarAnotacions(personaid: string) {
  const url = URL_SERVICES + '/anotacio/porpersona/' + personaid;

  return this.http.get( url )
            .map( (resp: any) => {

              this.totalAnotacions = resp.total;
              return resp.anotacions;
            });
}

esborraAnotacio( id: string) {

  let url = URL_SERVICES + '/anotacio/' + id;
  url += '?token=' + this._usuarioService.token;

    return this.http.delete( url )
              .map( resp => {
                swal( 'Anotacio esborrat', 'Anotacio esborrat correctament', 'success' );
                return resp;
              });
}

guardarAnotacio( anotacio: Anotacio ) {

  let url = URL_SERVICES + '/anotacio';
    // creando
    url += '?token=' + this._usuarioService.token;
    return this.http.post( url, anotacio )
            .map( (resp: any) => {
              swal('Informe Creado', anotacio._id, 'success');
              return resp.anotacions;
            });
  }

esborrarAnotacionsperPersona( persona: string) {
  let url = URL_SERVICES + '/anotacio/perPersona/' + persona;
  url += '?token=' + this._usuarioService.token;

    return this.http.delete( url )
              .map( resp => {
                // swal( 'Anotacions esborrades', 'Anotacio esborrat correctament', 'success' );
                return resp;
              });
}





}

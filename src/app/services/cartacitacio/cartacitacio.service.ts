import { Injectable } from '@angular/core';
import { CartaCitacio } from '../../models/cartacitacio.model';
import { UsuarioService } from '../usuario/usuario.service';

import { URL_SERVICES } from '../../config/config';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CartacitacioService {

  cartes: CartaCitacio[] = [];
  totalCartes: number;
  totalCartesPersona: number;
  constructor(
    public http: HttpClient,
    public router: Router,
    public _usuarioService: UsuarioService
  ) {

   }

   cargarCartes() {
    // tslint:disable-next-line:prefer-const
    let url = URL_SERVICES + '/cartacitacio';

    return this.http.get( url )
              .map( (resp: any) => {

                this.totalCartes = resp.total;
                return resp.cartes;
              });
  }

  cargarCartesPerPersona(idpersona: string) {
    const url = URL_SERVICES + '/cartacitacio/perpersona/' + idpersona;

    return this.http.get( url )
              .map( (resp: any) => {

                this.totalCartesPersona = resp.total;
                return resp.cartes;
              });
  }

  cargarCarta( id: string ) {

    const url = URL_SERVICES + '/cartacitacio/' + id;

    return this.http.get( url )
              .map( (resp: any) => {
                console.log(resp.carta);
                return resp.carta;
              });

  }

  buscarCartes( termino: string ) {

    const url = URL_SERVICES + '/busqueda/coleccion/cartes/' + termino;
    return this.http.get( url )
                .map( (resp: any) => resp.cartes );

  }

  borrarCarta( id: string ) {

    let url = URL_SERVICES + '/carta/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete( url )
              .map( resp => {
                swal( 'Carta esborrada', 'carta esborrat correctament', 'success' );
                return resp;
              });

  }

  guardarCarta( carta: CartaCitacio ) {

    let url = URL_SERVICES + '/cartacitacio';

    if ( carta._id ) {
      // actualizando
      url += '/' + carta._id;
      url += '?token=' + this._usuarioService.token;

      return this.http.put( url, carta )
                .map( (resp: any) => {
                  swal('Carta Actualizado', carta._id, 'success');
                  return resp.carta;

                });

    } else {
      // creando
      url += '?token=' + this._usuarioService.token;
      return this.http.post( url, carta )
              .map( (resp: any) => {
                swal('Carta Creado', carta._id, 'success');
                return resp.carta;
              });
    }




  }

  generarDocumentacioCarta( carta: CartaCitacio ) {

    const url = URL_SERVICES + '/doctemplate/' + carta._id;
    return this.http.get( url )
    .map( (resp: any) => {
      swal('Carta Generada', '', 'success');
      return resp;

    });

  }

  obtenirDocumentacioCarta( carta: CartaCitacio ) {

    const url = URL_SERVICES + '/doctemplate/getCarta/' + carta._id;
    return this.http.get( url )
    .map( (resp: any) => {
      swal('Carta Generada', '', 'success');
      return resp;

    });

  }

}

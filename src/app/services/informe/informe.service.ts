import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { PersonaService } from '../persona/persona.service';

import { Informe } from '../../models/informe.model';

import swal from 'sweetalert2';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class InformeService {

  totalInformes = 0;
  datalimit: string;
  informes: Informe[] = [];

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService,
    public _personaService: PersonaService
  ) {
    const now = moment().format('l');
    this.datalimit = moment().add(60, 'day').format('YYYY-MM-DD');
    console.log(this.datalimit);

    this.cargarInformesVigencia(this.datalimit)
              .subscribe( (resp: any) => {
                console.log(resp);
                this.informes = resp;
                console.log(this.informes);

              });
  }

  cargarInformes() {
    // tslint:disable-next-line:prefer-const
    let url = URL_SERVICES + '/informe';

    return this.http.get( url )
              .map( (resp: any) => {

                this.totalInformes = resp.total;
                return resp.informes;
              });
  }

  cargarInformesPerPersona(idpersona: string) {
    const url = URL_SERVICES + '/informe/infperpersona/' + idpersona;

    return this.http.get( url )
              .map( (resp: any) => {

                this.totalInformes = resp.total;
                return resp.informes;
              });
  }
  cargarInforme( id: string ) {

    const url = URL_SERVICES + '/informe/' + id;

    return this.http.get( url )
              .map( (resp: any) => {
                console.log(resp.informe);
                return resp.informe;
              });

  }

  buscarInformes( termino: string ) {

    const url = URL_SERVICES + '/busqueda/coleccion/informes/' + termino;
    return this.http.get( url )
                .map( (resp: any) => resp.informes );

  }

  borrarInforme( id: string ) {

    let url = URL_SERVICES + '/informe/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete( url )
              .map( resp => {
                swal( 'Informe esborrat', 'Informe esborrat correctament', 'success' );
                return resp;
              });

  }

  guardarInforme( informe: Informe ) {

    let url = URL_SERVICES + '/informe';

    if ( informe._id ) {
      // actualizando
      url += '/' + informe._id;
      url += '?token=' + this._usuarioService.token;

      return this.http.put( url, informe )
                .map( (resp: any) => {
                  swal('Informe Actualizado', informe.nombre, 'success');
                  return resp.informe;

                });

    } else {
      // creando
      url += '?token=' + this._usuarioService.token;
      return this.http.post( url, informe )
              .map( (resp: any) => {
                swal('Informe Creado', informe.nombre, 'success');
                return resp.informe;
              });
    }




  }

  cargarDocument( id: string ) {

    const url = URL_SERVICES + '/documents/informes/' + id + '.pdf';
    console.log(url);
    return this.http.get( url )
              .map( (resp: any) => {
                console.log(resp);
                return resp.informe;
              });

  }

  comprovasiVigent(idpersona: string) {

    // Primer mirem si existeix algun informe vigent
    let url = URL_SERVICES + '/informe/informevigentafalse';
    url += '/' + idpersona;
    url += '?token=' + this._usuarioService.token;
    console.log(url);
    return this.http.get(url)
              .map( (resp: any) => {
                // swal('Informe Actualizado', informe.nombre, 'success');
                return resp.informe;

              });
  }

  setToFalse( idinforme: string) {

    let url = URL_SERVICES + '/informe/informevigentafalse';
    url += '/' + idinforme;
    url += '?token=' + this._usuarioService.token;

    console.log(url);
    return this.http.put(url, null)
              .map( (resp: any) => {
                // swal('Informe Actualizado', informe.nombre, 'success');
                return resp.informe;

              });
  }

  cargarInformesVigencia( datalimit: string ) {

    const url = URL_SERVICES + '/informe/datainf/vigencia/' + datalimit;
    console.log(url);
    return this.http.get( url )
              .map( (resp: any) => {
                console.log(resp);
                return resp.informes;
              });

  }
}

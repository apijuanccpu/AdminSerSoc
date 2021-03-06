import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { Http, Headers, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
// tslint:disable-next-line:import-blacklist

import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { Observable } from 'rxjs/Observable';

import swal from 'sweetalert2';

@Injectable()
export class UsuarioService {

  totalUsuaris = 0;
  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
  ) {
    this.cargarStorage();
  }

  estaLogueado() {
    return ( this.token.length > 5 ) ? true : false;
  }

  cargarStorage() {

    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario') );
    } else {
      this.token = '';
      this.usuario = null;
    }

  }

  guardarStorage( id: string, token: string, usuario: Usuario ) {

    localStorage.setItem('id', id );
    localStorage.setItem('token', token );
    localStorage.setItem('usuario', JSON.stringify(usuario) );

    this.usuario = usuario;
    this.token = token;
  }

  logout() {
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
  }

  loginGoogle( token: string ) {

    const url = URL_SERVICES + '/login/google';

    return this.http.post( url, { token } )
                .map( (resp: any) => {
                  this.guardarStorage( resp.id, resp.token, resp.usuario );
                  return true;
                });


  }

  login( usuario: Usuario, recordar: boolean = false ) {

    if ( recordar ) {
      localStorage.setItem('email', usuario.email );
    } else {
      localStorage.removeItem('email');
    }

    const url = URL_SERVICES + '/login';
    return this.http.post( url, usuario )
                .map( (resp: any) => {

                  this.guardarStorage( resp.id, resp.token, resp.usuario );

                  return true;
                })
                .catch( err => {
                  swal( 'Error en el login', err.error.mensaje, 'error' );
                  return Observable.throw( err );
                });

  }


  crearUsuario( usuario: Usuario ) {

    const url = URL_SERVICES + '/usuario';

    return this.http.post( url, usuario )
              .map( (resp: any) => {

                swal('Usuario creado', usuario.email, 'success' );
                return resp.usuario;
              })
              .catch( err => {
                swal( err.error.mensaje, err.error.errors.message, 'error' );
                return Observable.throw( err );
              });
  }

  actualizarUsuario( usuario: Usuario ) {

    let url = URL_SERVICES + '/usuario/' + usuario._id;
    url += '?token=' + this.token;

    return this.http.put( url, usuario )
                .map( (resp: any) => {

                  if ( usuario._id === this.usuario._id ) {
                    const usuarioDB: Usuario = resp.usuario;
                    this.guardarStorage( usuarioDB._id, this.token, usuarioDB );
                  }

                  swal('Usuario actualizado', usuario.nombre, 'success' );

                  return true;
                })
                .catch( err => {
                  swal( err.error.mensaje, err.error.errors.message, 'error' );
                  return Observable.throw( err );
                });

  }

  cambiarImagen( archivo: File, id: string ) {

    this._subirArchivoService.subirArchivo( archivo, 'usuarios', id )
          .then( (resp: any) => {

            this.usuario.img = resp.usuario.img;
            swal( 'Imagen Actualizada', this.usuario.nombre, 'success' );
            this.guardarStorage( id, this.token, this.usuario );

          })
          .catch( resp => {
            console.log( resp );
          }) ;

  }

  cargarUsuarios( desde: number = 0 ) {

    const url = URL_SERVICES + '/usuario?desde=' + desde;
    return this.http.get( url )
        .map( (resp: any) => {
          // this.totalPersones = resp.total;
          this.totalUsuaris = resp.total;
          return resp.usuarios;
        });

  }

  cargarUsuario( id: string ) {

    const url = URL_SERVICES + '/usuario/' + id;

    return this.http.get( url )
    .map( (resp: any) => {
      this.totalUsuaris = resp.total;
      return resp.usuarios;
    });

  }

  buscarUsuarios( termino: string ) {

    const url = URL_SERVICES + '/busqueda/coleccion/usuarios/' + termino;
    return this.http.get( url )
                .map( (resp: any) => resp.usuarios );

  }

  borrarUsuario( id: string ) {

    let url = URL_SERVICES + '/usuario/' + id;
    url += '?token=' + this.token;

    return this.http.delete( url )
                .map( resp => {
                  swal('Usuario borrado', 'El usuario a sido eliminado correctamente', 'success');
                  return true;
                });

  }

}

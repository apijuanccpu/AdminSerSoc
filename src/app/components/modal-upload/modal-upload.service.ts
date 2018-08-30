import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { URL_SERVICES } from '../../config/config';

import { HttpClient } from '@angular/common/http';

@Injectable()
export class ModalUploadService {

  public tipo: string;
  public id: string;

  public oculto = 'oculto';

  public vismodalinforme = 'oculto';

  public notificacion = new EventEmitter<any>();

  constructor(public http: HttpClient) {
    console.log('Modal upload listo');
  }

  // ocultarModal(tipo: string) {
  //   if (tipo === 'documents') {
  //     this.vismodalinforme = 'oculto';
  //   } else {
  //     this.oculto = 'oculto';
  //   }
  //   // this.oculto = 'oculto';

  // }

  ocultarModalDoc() {
    this.vismodalinforme = 'oculto';
    this.tipo = null;
    this.id = null;
  }

  ocultarModalImg() {
     this.oculto = 'oculto';
     this.tipo = null;
     this.id = null;
  }

  mostrarModalDoc(tipo: string, id: string ) {

    this.vismodalinforme = '';
    this.id = id;
    this.tipo = tipo;
  }

  mostrarModalImg(tipo: string, id: string) {
    this.oculto = '';
    this.id = id;
    this.tipo = tipo;
  }



}

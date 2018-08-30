import { Component, OnInit } from '@angular/core';
import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';

import swal from 'sweetalert2';

@Component({
  selector: 'app-modal-upload-file',
  templateUrl: './modal-upload-file.component.html',
  styles: []
})
export class ModalUploadFileComponent implements OnInit {

  archivoSubir: File;
  // imagenTemp: string;

  constructor(
    public _subirArchivoService: SubirArchivoService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    console.log('Modal Doc listo');
  }

  cerrarModalDoc() {
    // this.imagenTemp = null;
    this.archivoSubir = null;

    this._modalUploadService.ocultarModalDoc();
  }

  pujarDocument() {

    this._subirArchivoService.subirArchivo( this.archivoSubir, this._modalUploadService.tipo, this._modalUploadService.id )
          .then( resp => {

            this._modalUploadService.notificacion.emit( resp );
            this.cerrarModalDoc();

          })
          .catch( err => {
            console.log( 'Error en la carga... ');
          });

  }

  seleccionFile( archivo: File ) {

    if ( !archivo ) {
      this.archivoSubir = null;
      return;
    }

    if ( archivo.type.indexOf('pdf') < 0 ) {
      swal('Sólo archivos pdf', 'El archivo seleccionado no es un pdf', 'error');
      this.archivoSubir = null;
      return;
    }

    this.archivoSubir = archivo;

    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL( archivo );

    // reader.onloadend = () => this.imagenTemp = reader.result;

  }


}

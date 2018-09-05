import { Component, OnInit, ViewChild } from '@angular/core';
import { InformeService } from '../../services/informe/informe.service';
import { Informe } from '../../models/informe.model';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonaService } from '../../services/persona/persona.service';
import { UsuarioService, SubirArchivoService } from '../../services/service.index';
import { Persona } from '../../models/persona.model';
import { Usuario } from '../../models/usuario.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

import { SimplePdfViewerComponent, SimplePDFBookmark, SimpleProgressData } from 'simple-pdf-viewer';
import swal from 'sweetalert2';

import { URL_SERVICES } from '../../config/config';

@Component({
  selector: 'app-informe',
  templateUrl: './informe.component.html',
  styles: []
})
export class InformeComponent implements OnInit {
  @ViewChild(SimplePdfViewerComponent) private pdfViewer: SimplePdfViewerComponent;
  bookmarks: SimplePDFBookmark[] = [];
  docinicial: string;
  persones: Persona[] = [];
  usuarios: Usuario[] = [];
  esnou: boolean;
  archivoSubir: File;
  arxiu2: File;
  carregant: boolean;
  // tslint:disable-next-line:no-inferrable-types
  // src: string = '../assets/nopdf.pdf';
  src: string;
  errorMsg = '';
  urlBox: any;

  docurl: string;

  informe: Informe = new Informe('', '', '');
  persona: Persona = new Persona('', '', '', 0, '', '', '');
  usuario: Usuario = new Usuario('', '', '');
  contador = 0;
  // pdfSrc = '/pdf-test.pdf';

  constructor(
    public _informeService: InformeService,
    public router: Router,
    public _personaService: PersonaService,
    public _usuarioService: UsuarioService,
    public activatedRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService,
    public _subirArchivoService: SubirArchivoService,
  ) {
    this.carregant = true;
    activatedRoute.params.subscribe( params => {

      const id = params['id?'];
      console.log(params[id]);
      console.log(params);

      if ( id !== 'nuevo') {
        this.src = '../assets/nopdf.pdf';
        this.cargarInforme(id);
        this.esnou = false;
        this.informe.vigent = true;
      } else {
        this.esnou = true;
        if (params['idpers?'] !== 'null') {
          this.informe.persona = params['idpers?'];
        }
        this.informe.vigent = true;
        this.informe.usuario = this._usuarioService.usuario;
      }
    });
   }



  ngOnInit() {
    this._personaService.cargarPersones()
        .subscribe( persones => this.persones = persones);
    this._usuarioService.cargarUsuarios()
        .subscribe( usuarios => this.usuarios = usuarios);

        this._modalUploadService.notificacion
          .subscribe( resp => this._usuarioService.cargarUsuarios() );
  }

  cargarInforme( id: string) {
    this._informeService.cargarInforme( id )
        .subscribe( informe => {
          console.log(informe);
          this.informe = informe;
          this.informe.persona = informe.persona._id;
          this.informe.usuario = informe.usuario._id;
          this.docinicial = informe.doc_informe;
          // this.carregarPdf(this.informe.doc_informe);
          // console.log(this.archivoSubir);
          // this.seleccionarFicher(this.informe.doc_informe);
         this.carregant = false;
  });
}
cambioPersona( id: string ) {

  this._personaService.cargarPersona( id )
        .subscribe( persona => this.persona = persona );

}

cambioUsuario( id: string ) {

  this._usuarioService.cargarUsuario( id )
        .subscribe( usuario => this.usuario = usuario );

}

guardarInforme( f: NgForm ) {

  console.log( f.valid );
  console.log( f.value );

  console.log(this.informe);

  // let actualitzant: boolean;
  let pujardoc: boolean;

  if ( f.invalid ) {
    return;
  }

        if (this.esnou === true) {
          this._informeService.comprovasiVigent(this.persona._id)
            .subscribe( infvigent => {
              if (infvigent.length > 0) {
                this._informeService.setToFalse(infvigent[0]._id)
                  .subscribe( infcanviat => {
                    console.log(infcanviat);
                  });
              }
            });
        }
        console.log(this.informe.doc_informe + '-' + this.docinicial);
        if (this.informe.doc_informe === this.docinicial) {
          pujardoc = false;
        } else {
          pujardoc = true;
          this.informe.doc_informe = this.archivoSubir.name;
        }
        console.log(pujardoc);
        this._informeService.guardarInforme( this.informe )
          .subscribe( informe => {
            console.log(informe._id);

            if (pujardoc === true) {
                this.pujarDocument(informe._id);
            }
            console.log(informe);
              this.router.navigate(['/informes']);
          });
}

mostrarModal( tipomodal: string, id: string ) {

  this._modalUploadService.mostrarModalImg( 'informes', id );

}

mostrarModalDoc(id: string) {
  this._modalUploadService.mostrarModalDoc('informes',  id );
}

cargarDocumentInforme( id: string ) {
  this._informeService.cargarDocument(id)
      .subscribe(resp => {
        console.log(resp);
      });
}

seleccionFile( archivo: File ) {

  console.log(archivo);

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

  // reader.onloadend = () => this.imagenTemp = reader.result;,

  console.log(this.archivoSubir);

}

pujarDocument(id: string) {

  this._subirArchivoService.subirArchivo( this.archivoSubir, 'informes', id)
        .then( resp => {

          // this._modalUploadService.notificacion.emit( resp );
          // this.cerrarModalDoc();

        })
        .catch( err => {
          console.log(err);
          console.log( 'Error en la carga... ');
        });

}

onFileSelected() {
  console.log(document.querySelector('#file'));
  const $img: any = document.querySelector('#file');
  console.log($img);
  this.openDocument($img);
}

carregarPdf( urldoc: string ) {
  // tslint:disable-next-line:prefer-const
  let url = URL_SERVICES + '/doc/informes/' + urldoc;
  this.docurl = url;
  console.log(this.docurl);
  this.openDocumentUrl(this.docurl);

}

// how to open PDF document
openDocument(document: File) {
  if ( !document ) {
    this.archivoSubir = null;
    return;
  }

  if ( document.type.indexOf('pdf') < 0 ) {
    swal('Sólo archivos pdf', 'El archivo seleccionado no es un pdf', 'error');
    this.archivoSubir = null;
    return;
  }

  this.archivoSubir = document;
  this.informe.doc_informe = document.name;
  const fileReader: FileReader = new FileReader();
  fileReader.onload = () => {
    this.pdfViewer.openDocument(new Uint8Array(fileReader.result));
  };
  fileReader.readAsArrayBuffer(document);
}

// how to open PDF document
openDocumentUrl(url: string) {
  // const fileReader: FileReader = new FileReader();
  // fileReader.onload = () => {
  //   // this.pdfViewer.openDocument(new Uint8Array(fileReader.result));
  //   this.pdfViewer.openUrl(url);
  // };
  // fileReader.readAsArrayBuffer(url);
  this.pdfViewer.openUrl(url);
}

// how to create bookmark
createBookmark() {
  this.pdfViewer.createBookmark().then(bookmark => {
    if (bookmark) {
      this.bookmarks.push(bookmark);
    }
  });
}

onError(event: any) {
  this.errorMsg = 'Failed to load the document';
}

onProgress(progress: SimpleProgressData) {
  console.log(progress);
}

onLoadComplete()  {
  console.log('Document is loaded');
  // see the whole document
  this.pdfViewer.zoomFullPage();
  this.contador = this.contador + 1;
  if (this.contador === 1) {
    this.carregarPdf(this.informe.doc_informe);
  }

}



}





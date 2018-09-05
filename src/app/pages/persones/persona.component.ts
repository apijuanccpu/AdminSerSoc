import { Component, OnInit } from '@angular/core';
import { Persona } from '../../models/persona.model';
import { PersonaService } from '../../services/persona/persona.service';
import { NgForm } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { InformeService } from '../../services/service.index';
import { AnotacioService } from '../../services/service.index';
import { Informe } from '../../models/informe.model';
import { Anotacio } from '../../models/anotacio.model';

import swal from 'sweetalert2';
import * as moment from 'moment';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styles: []
})
export class PersonaComponent implements OnInit {


  anotacions: Anotacio[] = [];
  informes: Informe[] = [];
  usuarios: Usuario[] = [];
  persona: Persona = new Persona('', '', '', 0,  '', '', '');
  usuario: Usuario = new Usuario('', '', '');
  anotacio: Anotacio;

  constructor(
    public _personaService: PersonaService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService,
    public _informeService: InformeService,
    public _anotacioService: AnotacioService,
    public _usuarioService: UsuarioService
  ) {
    activatedRoute.params.subscribe( params => {

      const dni = params['dni?'];

      if ( dni !== 'nuevo' ) {
        this.cargarPersona( dni );
        this.carregarInformesPersona(dni);
        this.carregarAnotacions(dni);
      } else {
        if (params['dnipers?'] !== 'null') {
          this.persona.dni = params['dnipers?'];
        }

      }

      });

   }

  ngOnInit() {

    this._usuarioService.cargarUsuarios()
    .subscribe( usuarios => this.usuarios = usuarios);
  }

  cambioUsuario( id: string ) {

    this._usuarioService.cargarUsuario( id )
          .subscribe( usuario => this.usuario = usuario );

  }
  cargarPersona( dni: string) {

    this._personaService.cargarPersona(dni)
          .subscribe( persona => {
            console.log(persona);
            this.persona = persona;

          });
    }

  carregarInformesPersona( id: string) {

    this._informeService.cargarInformesPerPersona(id)
    .subscribe( (resp: any) => {
      console.log(resp);
      // this.totalRegistros = resp.total;
      this.informes = resp;
      // this.cargando = false;
      // console.log(this.usuarios);
    });
  }

  guardarPersona( f: NgForm ) {

    if (f.invalid) {
      return;
    }

    this._personaService.guardarPersona(this.persona)
          .subscribe( persona => {
            this.persona = persona;
            this.router.navigate(['/persones' ]);
          });
  }

  carregarAnotacions( idpersona: string) {
    this._anotacioService.carregarAnotacions(idpersona)
        .subscribe( (resp: any) => {
          this.anotacions = resp;
        });
  }

  esborraAnotacio (anotacio: Anotacio ) {
    swal({
      title: 'Vols esborrar lanotació?',
      // text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.value) {
        this._anotacioService.esborraAnotacio(anotacio._id)
        .subscribe( (resp: any) => {
          console.log(resp);
          this.carregarAnotacions(this.persona._id);
          swal(
            'Esborrada!',
            'Anotació esborrada',
            'success'
          );
        });
      }
    });

    }

    async creaAnotacio() {

      const {value: text} = await swal({
        input: 'textarea',
        inputPlaceholder: 'Introduix lanotacio',
        showCancelButton: true,
      });

      if (text) {
        if ( !text || text.length === 0 ) {
          return;
        }
        const now = moment().format('l');
        this.anotacio = new Anotacio(now, this._usuarioService.usuario._id, this.persona._id, text);

        this._anotacioService.guardarAnotacio( this.anotacio)
                .subscribe( () => this.carregarAnotacions(this.persona._id) );
        swal('Entered text: ' + text);
      }

      }

}

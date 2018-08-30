import { Component, OnInit } from '@angular/core';
import { Persona } from '../../models/persona.model';
import { PersonaService } from '../../services/persona/persona.service';
import { NgForm } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import swal from 'sweetalert2';
import * as moment from 'moment';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Peticio } from '../../models/peticio.model';

import { PeticioService } from '../../services/peticio/peticio.service';
import { DnipeticioService } from '../../services/dnipeticio/dnipeticio.service';
import { DniPeticio } from '../../models/dnipeticio.model';


@Component({
  selector: 'app-peticio',
  templateUrl: './peticio.component.html'
})
export class PeticioComponent implements OnInit {

  llistadnis: DniPeticio[] = [];
  terminos: string[] = [];
  persones: Persona[] = [];
  totalRegistros = 0;
  cargando = true;
  guardada = false;
  nuevo = true;

  peticio: Peticio = new Peticio('', '', '', false, '', '');
  constructor(
    public _personaService: PersonaService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService,
    public _usuarioService: UsuarioService,
    public _peticioService: PeticioService,
    public _dniPeticioService: DnipeticioService
  ) {

    activatedRoute.params.subscribe( params => {

      const id = params['id'];

      if ( id !== 'nuevo' ) {

        this.carregarPeticio( id );
        this.carregarDnis(id);
        this.nuevo = false;
      }

      });
  }

  ngOnInit() {
  }

  carregarPeticio( id: string) {

    this._peticioService.carregarPeticio(id)
          .subscribe( peticio => {
            console.log(peticio);
            this.peticio = peticio;
            this.carregarDnis(peticio._id);

          });
    }

  carregarDnis( peticio: string ) {
      this._dniPeticioService.carregarDnisPeticion(peticio)
        .subscribe( dnis => {
          this.llistadnis = dnis;
          console.log(this.terminos);
          console.log(dnis);
        });
    }

  guardarPeticio( f: NgForm ) {
     if (f.invalid) {
       return;
     }

    this._peticioService.guardarPeticio(this.peticio)
           .subscribe( peticio => {
             this.peticio = peticio;
             this.guardarDnisIncorporats();
             this.router.navigate(['/peticions']);
           });
   }

   cargarPersones() {

    this.cargando = true;
    this._personaService.cargarPersones()
      .subscribe( persones => {
        this.persones = persones,
        this.totalRegistros = persones.totalRegistros;
      });
      this.cargando = false;

  }

   buscarPersones( termino: string ) {

    let personesTemp: Persona[] = [];
    this.persones = [];

    if ( termino.length <= 0 ) {
      this.cargarPersones();
      return;
    }

    this.cargando = true;
    this.terminos = termino.split(' ');
    console.log(this.terminos);

    // tslint:disable-next-line:forin
    for (const i in this.terminos) {
      console.log(this.terminos[i]);
      this._personaService.buscarPersones( this.terminos[i] )
            .subscribe( (persones: Persona[]) => {

              personesTemp = persones;
              // tslint:disable-next-line:forin
              for (const z in personesTemp) {
                this.persones.push(personesTemp[z]);
            }

              this.cargando = false;
            });
    }
  }

  incorporaTerminos( termino: string) {

    if ( termino.length <= 0 ) {
      // this.cargarPersones();
      return;
    }

    this.cargando = true;
    this.terminos = termino.split(' ');
    console.log(this.terminos);
    // this.guardarDnisIncorporats();

  }

  // incorporaDnis( termino: string[]) {

  //   if ( termino.length <= 0 ) {
  //     this.cargarPersones();
  //     return;
  //   }

  //   this.cargando = true;
  //   this.terminos = termino.split(' ');
  //   console.log(this.terminos);
  //   this.guardarDnisIncorporats();

  // }

  guardarDnisIncorporats( ) {
    // tslint:disable-next-line:forin
    for (const i in this.terminos) {
      console.log(this.terminos[i]);
      this._dniPeticioService.guardarDniPeticio( this.peticio._id, this.terminos[i])
            .subscribe( (dnis: DniPeticio[]) => {
              this.llistadnis = dnis;
            });

    }

  }

  finalitzaDniPeticio(dnipeticio: string) {
    this._dniPeticioService.finalitzaDniPeticio(dnipeticio)
            .subscribe( (dni: DniPeticio[]) => {
              //  this.llistadnis = dnis;
              console.log('dni actualitzat:' + dni);
              this._dniPeticioService.carregarDnisPeticion(this.peticio._id)
                .subscribe( dnis2 => {
                  this.llistadnis = dnis2;
                  this._dniPeticioService.comprobasiDnisOberts(this.peticio._id)
                    .subscribe( total => {
                       total = total;
                       if (total === 0) {
                         swal('ja es pot tancar la petició');
                       }
                    });
                });
            });

    }
//  comprobasiFinalitzable(id_peticio: string) {

//   }
}

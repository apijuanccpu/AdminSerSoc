import { Component, OnInit } from '@angular/core';
import { Persona } from '../../models/persona.model';
import { PersonaService } from '../../services/service.index';
import { UsuarioService, SubirArchivoService } from '../../services/service.index';
import { PeticioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import swal from 'sweetalert2';
import { Informe } from '../../models/informe.model';
import { Peticio } from '../../models/peticio.model';
import { DniPeticio } from '../../models/dnipeticio.model';

@Component({
  selector: 'app-localitzador',
  templateUrl: './localitzador.component.html',
  styles: []
})
export class LocalitzadorComponent implements OnInit {

  terminos: string[] = [];
  persones: Persona[] = [];
  usuarios: Usuario[] = [];
  peticions: Peticio[] = [];
  personessenseinforme: Persona[] = [];
  dnisnobasededades: string[] = [];
  informes: Informe[] = [];
  dnis: DniPeticio[] = [];
  // desde = 0;

  totalRegistros = 0;
  cargando = true;
  peticioSeleccionada: string;

  constructor(
    public _personaService: PersonaService,
    public _usuarioService: UsuarioService,
    public _peticioService: PeticioService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarPeticions();
    this.cargarPersones();

  }

  carregarDnisPeticio( id_peticio: string ) {
    console.log(id_peticio);
    if (id_peticio === 'Escull una peticio...') {
      return;
    }
    let informesTemp: Informe[] = [];
    this.dnis = [];
    this.informes = [];
    let persones: any = [];
    this.terminos = [];
    this.personessenseinforme = [];
    this.dnisnobasededades = [];

    this.cargando = true;
    this._peticioService.carregardnisPeticio( id_peticio )
      .subscribe( resp => {
        this.terminos = resp.dnis,
        this.totalRegistros = resp.totalRegistros;
        // tslint:disable-next-line:prefer-const
        for ( let i in resp.dnis) {
          console.log(this.terminos[i]);
          this._personaService.buscarIdporDni(resp.dnis[i]['dni'])
            .subscribe( (persona: Persona) => {
              console.log(persona);
                // tslint:disable-next-line:prefer-const
                persones = persona;
                if (persones.length === 0) {
                  console.log('esnuloeldni');
                  this.dnisnobasededades.push(resp.dnis[i]['dni']);
                  console.log(this.dnisnobasededades);
                } else {
                  this._personaService.buscarInformesPerPersones( persona[0]._id )
                  .subscribe(
                    (informe: Informe[]) => {

                    informesTemp = informe;
                    if (informesTemp.length === 0 ) {
                      console.log('Persona sin informe');
                      this.personessenseinforme.push(persona[0]);
                      console.log(this.personessenseinforme);
                    } else {
                      // tslint:disable-next-line:forin
                    for (const z in informesTemp) {
                      this.informes.push(informesTemp[z]);
                      console.log(this.informes);
                  }

                    this.cargando = false;

                    }
                  });
                }
            });
        }

      });
      this.cargando = false;
      console.log(this.terminos);

      this.cargando = false;
  }

  cargarPeticions() {
    this.cargando = true;
    this._peticioService.carregarPeticionsPerEstat(false)
      .subscribe( peticions => {
        this.peticions = peticions,
        this.totalRegistros = peticions.totalRegistros;
      });
      this.cargando = false;
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

  buscarPersona( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarPersones();
      return;
    }

    this.cargando = true;

    this._personaService.buscarPersones( termino )
            .subscribe( (persones: Persona[]) => {

              this.persones = persones;
              this.cargando = false;
            });

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

  buscarInformesPerPersona( termino: string ) {

    let informesTemp: Informe[] = [];
    this.informes = [];
    let persones: any = [];
    this.personessenseinforme = [];
    this.dnisnobasededades = [];


    if ( termino.length <= 0 ) {
      this.cargarPersones();
      return;
    }

    this.cargando = true;
    this.terminos = termino.split(' ');
    console.log(this.terminos);

    // tslint:disable-next-line:forin
    // tslint:disable-next-line:prefer-const
    for (let i in this.terminos) {
      console.log(this.terminos[i]);
      this._personaService.buscarIdporDni(this.terminos[i])
        .subscribe( (persona: Persona) => {
          console.log(persona);
            // tslint:disable-next-line:prefer-const
            persones = persona;
            if (persones.length === 0) {
              console.log('esnuloeldni');
              this.dnisnobasededades.push(this.terminos[i]);
            } else {
              this._personaService.buscarInformesPerPersones( persona[0]._id )
              .subscribe(
                (informe: Informe[]) => {

                informesTemp = informe;
                if (informesTemp.length === 0 ) {
                  console.log('Persona sin informe');
                  this.personessenseinforme.push(persona[0]);
                } else {
                  // tslint:disable-next-line:forin
                for (const z in informesTemp) {
                  this.informes.push(informesTemp[z]);
              }

                this.cargando = false;

                }
              });
            }
        });
    }
    this.cargando = false;
  }

  ressaltasiIncidencia(persona: Persona) {
    console.log(persona);
    // if (persona.actiu === 'No') {
    //   return 'table-danger';
    // }
    // if (persona.comunitat === 'Si') {
    //   return 'table-danger';
    // }
    // return '';
    if (persona.data_ultim_informe === '') {
      return 'table-warning';
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { CartaCitacio } from '../../models/cartacitacio.model';
import { CartacitacioService, PersonaService, UsuarioService, EmpresaService } from '../../services/service.index';
import { ActivatedRoute, Router } from '@angular/router';
import { Persona } from '../../models/persona.model';
import { Usuario } from '../../models/usuario.model';
import { Empresa } from '../../models/empresa.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cartacitacio',
  templateUrl: './cartacitacio.component.html'
})
export class CartacitacioComponent implements OnInit {

  carregant: boolean;
  carta: CartaCitacio = new CartaCitacio(0, null);
  persones: Persona[] = [];
  usuarios: Usuario[] = [];
  empreses: Empresa[] = [];

  persona: Persona = new Persona('', '', '', 0, '', '', '');
  usuario: Usuario = new Usuario('', '', '');
  empresa: Empresa = new Empresa('', '');


  constructor(
    public _cartacitacioService: CartacitacioService,
    public activatedRoute: ActivatedRoute,
    public _personaService: PersonaService,
    public _usuarioService: UsuarioService,
    public _empresaService: EmpresaService,
    public router: Router
  ) {
    this.carregant = true;
    activatedRoute.params.subscribe( params => {

      const id = params['id?'];
      console.log(params[id]);
      console.log(params);

      if ( id !== 'nuevo') {
       // this.src = '../assets/nopdf.pdf';
        this.cargarCarta(id);
        // this.esnou = false;
        // this.informe.vigent = true;
      } else {
        // this.esnou = true;
        if (params['idpers?'] !== 'null') {
          this.carta.usuari = params['idpers?'];
        }
        // this.informe.vigent = true;
        // this.informe.usuario = this._usuarioService.usuario;
        this.carregant = false;
      }
    });
   }

  ngOnInit() {
    this._personaService.cargarPersones()
        .subscribe( persones => this.persones = persones);
    this._usuarioService.cargarUsuarios()
        .subscribe( usuarios => this.usuarios = usuarios);
    this._empresaService.cargarEmpreses()
        .subscribe( empreses => this.empreses = empreses);

  }

  cargarCarta( id: string) {
    this._cartacitacioService.cargarCarta( id )
        .subscribe( carta => {
          console.log(carta);
          this.carta = carta;
          this.carta.usuari = carta.usuari._id;
          this.carta.professional = carta.professional._id;
          this.carta.empresasubministradora = carta.empresasubministradora._id;
          // this.informe.persona = informe.persona._id;
          // this.informe.usuario = informe.usuario._id;
          // this.docinicial = informe.doc_informe;
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

  cambioEmpresa( id: string ) {

    this._empresaService.cargarEmpresa( id )
        .subscribe (empresa => this.empresa = empresa);
  }

  guardarCarta( f: NgForm ) {

    console.log( f.valid );
    console.log( f.value );

    console.log(this.carta);

    // let actualitzant: boolean;
    // let pujardoc: boolean;

    if ( f.invalid ) {
      return;
    }

          // if (this.esnou === true) {
          //   this._informeService.comprovasiVigent(this.persona._id)
          //     .subscribe( infvigent => {
          //       if (infvigent.length > 0) {
          //         this._informeService.setToFalse(infvigent[0]._id)
          //           .subscribe( infcanviat => {
          //             console.log(infcanviat);
          //           });
          //       }
          //     });
          // }
          // console.log(this.informe.doc_informe + '-' + this.docinicial);
          // if (this.informe.doc_informe === this.docinicial) {
          //   pujardoc = false;
          // } else {
          //   pujardoc = true;
          //   this.informe.doc_informe = this.archivoSubir.name;
          // }
          // console.log(pujardoc);
          this._cartacitacioService.guardarCarta( this.carta )
            .subscribe( carta => {
              console.log(carta._id);

              // if (pujardoc === true) {
              //     this.pujarDocument(informe._id);
              // }
              console.log(carta);
                this.router.navigate(['/cartescitacio']);
            });
  }
  crearDocCartaCitacio() {

    this._cartacitacioService.generarDocumentacioCarta(this.carta)
      .subscribe( carta => {
        console.log(carta);
      });

  }
  obtenirDocumentCarta() {
    // this._cartacitacioService.obtenirDocumentacioCarta(this.carta)
    //   .subscribe( carta => {
    //     console.log(carta);
    //   });
    this.router.navigateByUrl('http://localhost:3000/doctemplate/getCarta/5b98cb50ac67461fc8275a39');

  }

}

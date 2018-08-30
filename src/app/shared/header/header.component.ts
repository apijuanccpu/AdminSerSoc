import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { NotificacionsService} from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  usuario: Usuario;

  constructor( public _usuarioService: UsuarioService,
              public _notificacionsService: NotificacionsService ) { }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
  }

  classeTipus(tipus: string) {
    switch (tipus) {
      case 'informe':
          return 'fa fa-link';

        }
    }

}

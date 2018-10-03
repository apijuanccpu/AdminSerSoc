import { Component, OnInit } from '@angular/core';
import { CartacitacioService } from '../../services/service.index';
import { CartaCitacio } from '../../models/cartacitacio.model';


@Component({
  selector: 'app-cartescitacio',
  templateUrl: './cartescitacio.component.html'
})
export class CartescitacioComponent implements OnInit {

  cargando = true;
  totalRegistros = 0;
  cartes: CartaCitacio[] = [];
  constructor(
    public _cartacitacioService: CartacitacioService
  ) {

   }

  ngOnInit() {
    this.cargarCartesCitacio();
    console.log(this.cartes);
  }

  cargarCartesCitacio() {
    this._cartacitacioService.cargarCartes()
      .subscribe (cartes => {
              this.cartes = cartes;
              this.cargando = false;
      });
  }

}

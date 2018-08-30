import { Component, OnInit, ModuleWithComponentFactories } from '@angular/core';
import * as moment from 'moment';
import { NotificacionsService, InformeService } from '../../services/service.index';
import { Informe } from '../../models/informe.model';


@Component({
  selector: 'app-notificacions',
  templateUrl: './notificacions.component.html',
  styles: []
})
export class NotificacionsComponent implements OnInit {

  informes: Informe[] = [];
  datalimit: string;


  constructor(
    public _notificacionsService: NotificacionsService,
    public _informeService: InformeService
  ) {
    // const now = moment().format('l');
    // this.dataLimit = moment().add(60, 'day').format('YYYY-MM-DD');
    // console.log(this.dataLimit);

    // this._notificacionsService.informesperVigencia( this.dataLimit )
    //           .subscribe( (resp: any) => {
    //             console.log(resp);
    //             this.informes = resp;
    //             console.log(this.informes);

    //           });
    this.cargarInformesDosMesos();

   }

  ngOnInit() {
  }
  cargarInformesDosMesos() {
    const now = moment().format('l');
    this.datalimit = moment().add(60, 'day').format('YYYY-MM-DD');
    console.log(this.datalimit);

    this._informeService.cargarInformesVigencia(this.datalimit)
              .subscribe( (resp: any) => {
                console.log(resp);
                this.informes = resp;
                console.log(this.informes);

              });
  }

}

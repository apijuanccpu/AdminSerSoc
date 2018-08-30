import { Injectable } from '@angular/core';
import { Notificacio } from '../../models/notificacio.model';
import { Informe } from '../../models/informe.model';
import { URL_SERVICES } from '../../config/config';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

@Injectable()
export class NotificacionsService {

  notificacions: Notificacio[] = [];
  informes: Informe[] = [];
  dataLimit: string;
  num_informes;
  hihaInformes: boolean;

  // informes: Informe[] = [];

  constructor(
    public http: HttpClient,
    public router: Router,
  ) {

    this.informesperVigencia()
      .subscribe( informes => {
          this.informes = informes;
          console.log(this.informes);
          console.log(informes.informes.length);
          if (informes.informes.length !== 0) {
            this.creaNotificacio('Vigència dinformes', 'informes', moment().format('l'), '5b2316ce5e906c0b0199347a');
          }
          console.log(this.notificacions);

      });
  }

  creaNotificacio(nom: string, tipus: string, data: string, usuari: string) {
    // tslint:disable-next-line:prefer-const
    let notificacio = new Notificacio(nom, data, tipus, usuari);
    this.notificacions.push(notificacio);

  }

  informesperVigencia( ) {

    this.notificacions = [];
    this.informes = [];
    this.dataLimit = moment().add(60, 'day').format('YYYY-MM-DD');

    const url = URL_SERVICES + '/informe/datainf/vigencia/' + this.dataLimit;

    return this.http.get( url )
    .map( (resp: any) => {
      console.log(resp);
      if (resp.total === 0) {
        this.hihaInformes = false;
      } else {
        this.hihaInformes = true;
      }

      return resp;
    });

  }
}

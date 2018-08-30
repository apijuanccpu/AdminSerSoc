import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICES } from '../config/config';


@Pipe({
  name: 'docinforme'
})
export class DocinformePipe implements PipeTransform {

  transform( doc: string, tipo: string = 'informe'): any {

    let url = URL_SERVICES + '/doc';

    if ( !doc ) {
      return url + '/usuarios/xxx';
    }

    if ( doc.indexOf('https') >= 0 ) {
      return doc;
    }

    url += '/informes/' + doc;

    return url;
  }

}

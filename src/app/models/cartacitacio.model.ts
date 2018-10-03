import { Empresa } from './empresa.model';
import { Usuario } from './usuario.model';
import { Persona } from './persona.model';

export class CartaCitacio {

    constructor(
        public numero: number,
        public data_creacio: Date,
        public data_enviament?: Date,
        public data_recepcio?: Date,
        public empresasubministradora?: Empresa,
        public professional?: Usuario,
        public usuari?: Persona,
        public _id?: string
    ) { }
}

import { Persona } from './persona.model';
import { Usuario } from './usuario.model';


export class Informe {

    constructor(
        public nombre?: string,
        public data?: string,
        public vigencia?: string,
        public vigent?: boolean,
        public persona?: Persona,
        public usuario?: Usuario,
        public _id?: string,
        public doc_informe?: string
    ) { }
}

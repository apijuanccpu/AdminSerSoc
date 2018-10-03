import { Empresa } from './empresa.model';

export class Peticio {

    constructor(
        public data: string,
        public dataincorporacio?: string,
        public num_registre?: string,
        public empresa_energetica?: Empresa,
        public finalitzada?: string,
        public _id?: string
    ) { }
}

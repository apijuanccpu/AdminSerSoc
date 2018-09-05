
export class Persona {

    constructor(
        public nombre: string,
        public dni: string,
        public domicili: string,
        public codipostal: number,
        public poblacio: string,
        public actiu: string,
        public comunitat: string,
        public data_ultim_informe?: string,
        public professional?: string,
        public numexphestia?: string,
        public _id?: string
    ) { }
}

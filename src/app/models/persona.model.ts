
export class Persona {

    constructor(
        public nombre: string,
        public dni: string,
        public poblacio: string,
        public actiu: string,
        public comunitat: string,
        public data_ultim_informe?: string,
        public _id?: string
    ) { }
}


export class Empresa {

    constructor(
        public nom: string,
        public direccio: string,
        public poblacio?: string,
        public codipostal?: number,
        public observacions?: string,
        public _id?: string
    ) { }
}

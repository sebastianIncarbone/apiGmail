import {AdministradorDeMail} from "./AdministradorDeMail";

export class Notificacion {

    private listOfSubscriptions: {[artist: number]: string[]};
    private administradorDeMail: AdministradorDeMail;

    constructor(){
        this.listOfSubscriptions = {};
        this.administradorDeMail = new AdministradorDeMail();
    }

    cantidadUsuarioSuscriptos(): number {
        const allValues = Object.values(this.getList());
        let res: string[] = [];
        allValues.forEach(value => res = res.concat(value));
        return res.length;
    }
    getList(): {[artist: string]: string[]} {
        return this.listOfSubscriptions;
    }

    noExisteElArtista(idArtista: number) : boolean {
        const allKeys = Object.keys(this.getList());
        return !allKeys.includes(idArtista.toString())
    }

    suscribirAUsuario(mailDeusuario: string, artistId: number) {

        if (this.noExisteElArtista(artistId)) {
            this.getList()[artistId] = [mailDeusuario];
        }
        else {
            this.getList()[artistId].push(mailDeusuario)
        }
    }

    usuarioEstaSuscripto(idArtista: number, mailDeusuario: string): boolean{
        return this.getList()[idArtista].includes(mailDeusuario);
    }

    desucribirAUsuario(mailDeusuario: string, idArtista: number) {

        if(this.noExisteElArtista(idArtista)){
            throw new Error('el artista no existe en el sistema');
        }
        if(this.usuarioEstaSuscripto(idArtista, mailDeusuario)) {
            const index = this.getList()[idArtista].indexOf(mailDeusuario, 0);
            this.getList()[idArtista].splice(index);
        }
        else {
            throw  new Error('No se puede eliminar un mailDeusuario que no este suscripto');
        }

    }

    borrarTodasLasSuscripcionesPara(artistId: number) {

        if(this.noExisteElArtista(artistId)) {
            throw new Error('No existe el artista en el sistema');
        }else {
            this.getList()[artistId] = [];
        }
    }

    todasLasSuscripcionesDe(artistId: number): string[] {
        return this.getList()[artistId]
    }

    async enviarMailsASuscriptos(artistId: number, subject: string, message: string, from: string) {
        if(!this.noExisteElArtista(artistId)){
            const promises: Promise<any>[] = [];
            this.getList()[artistId].forEach( suscripto => promises.push(this.administradorDeMail.mandarMail(suscripto, subject, message, from)))
            await Promise.all(promises)
        }
        else{
            throw new Error('El artista no existe ');
        }
    }
}

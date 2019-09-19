
import { assert } from 'chai';
import {Notificacion} from "../modelo/Notificacion";


describe('notificacion' , () => {
     let notificacion : Notificacion;

    beforeEach(() => {
       notificacion = new Notificacion();
    });

    it('Notificacion no tiene ningun usuario suscripto', () => {
        assert.equal(notificacion.cantidadUsuarioSuscriptos(), 0);
    });

    it('si un usuario se suscribe a un usuario que no existe en el sistema se crea el mismo y se agrega', () => {

        notificacion.suscribirAUsuario('usuario1@gmail.com', 1);

        assert.equal(notificacion.cantidadUsuarioSuscriptos(), 1);

    });

    it('si el artista ya esta en el sistema se agrega el usuario a su lista ', () => {

       notificacion.suscribirAUsuario('usuario1@gmail.com', 1);
       notificacion.suscribirAUsuario('usuario2@gmail.com', 1);

       assert.equal(notificacion.todasLasSuscripcionesDe(1).length, 2);

    });
    it('un usuario se desuscribe de la lista de notificaciones del artista 1 si este pertenece a la misma', () => {

        notificacion.suscribirAUsuario('usuario1@gmail.com', 1);
        notificacion.desucribirAUsuario('usuario1@gmail.com', 1);

        assert.equal(notificacion.cantidadUsuarioSuscriptos(), 0);

    });

    it('Si un usuario que no esta suscripto se desuscribe de una lista salta un error', () => {
        notificacion.suscribirAUsuario('usuario1@gmail.com', 1);
       // assert.throws(notificacion.desucribirAUsuario(usuario1, 1), Error, 'No se puede eliminar un usuario que no este suscripto');
    });
    it('si el artista no existe, un usuario no puede desuscribirse de su lista', () => {
     //  assert.throws(notificacion.desucribirAUsuario(usuario1, 1), Error, 'el artista no existe en el sistema')
    });
    it('no se pueden borrar las suscripciones de un artista que no forme parte del sistema', () => {

    //    assert.throws(notificacion.borrarTodasLasSuscripcionesPara(1), Error, 'No existe el artista en el sistema');
    });
    it('se pueden borrar todas las suscripciones de un artista', () => {

        notificacion.suscribirAUsuario('usuario1@gmail.com', 1);
        notificacion.suscribirAUsuario('usuario2@gmail.com',1);
        notificacion.suscribirAUsuario('usuario3@gmail.com', 1);

        assert.equal(notificacion.todasLasSuscripcionesDe(1).length, 3);

        notificacion.borrarTodasLasSuscripcionesPara(1);

        assert.equal(notificacion.todasLasSuscripcionesDe(1).length, 0);


    });

});

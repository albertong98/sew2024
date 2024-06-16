"use strict";
class UltimaActualizacion{
    constructor(){
        this.fechaActual = new Date();
    }

    aplicarFecha(){
        var p = document.createElement('p');
        p.innerHTML = "Última actualizacion de la pagina: "+this.fechaActual.toLocaleString('es-ES');
        document.querySelector("header").after(p);
    }
}

var actualizacion = new UltimaActualizacion();
actualizacion.aplicarFecha();
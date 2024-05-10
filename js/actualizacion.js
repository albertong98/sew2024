"use strict";
class UltimaActualizacion{
    constructor(){
        this.fechaActual = new Date();
    }

    aplicarFecha(){
        document.querySelector("span").innerHTML = this.fechaActual.toLocaleString('es-ES');
    }
}

var actualizacion = new UltimaActualizacion();
actualizacion.aplicarFecha();
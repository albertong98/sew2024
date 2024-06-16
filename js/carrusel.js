"use strict";
class Carrusel{
    constructor(){
        this.dir = "multimedia/imagenes/";
        this.mapa = {
            "ceuta.jpg" : "Ciudad de ceuta",
            "canon.jpg" : "Cañón de la fortaleza",
            "fortin.jpg" : "Fortín y batería de la Palmera",
            "fortaleza.jpg" : "Fortaleza del Monte Hacho",
            "principe.jpg" : "Barrio del principe"
        }
        this.imagenes = ["ceuta.jpg","canon.jpg","fortin.jpg","fortaleza.jpg","principe.jpg"];
        this.imagenActual = 1;
    }

    cargarSiguiente(){
        var x = window.matchMedia("(min-width: 800px)")
        if(x.matches){
            document.querySelector("article > section > picture > img").setAttribute("src", this.dir + this.imagenes[this.imagenActual]);
            document.querySelector("article > section > picture > img").setAttribute("alt",this.mapa[this.imagenes[this.imagenActual]]);
        }else{
            document.querySelector("article > section > picture > img").setAttribute("src", this.dir + "50" +this.imagenes[this.imagenActual]);
            document.querySelector("article > section > picture > img").setAttribute("alt",this.mapa[this.imagenes[this.imagenActual]]);
        }
        this.imagenActual = this.imagenActual === this.imagenes.length - 1 ? 0 : this.imagenActual+1
        
    }
}
var carrusel = new Carrusel();
window.setInterval(()=> {carrusel.cargarSiguiente();}, 5000);
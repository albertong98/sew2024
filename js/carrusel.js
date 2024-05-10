"use strict";
class Carrusel{
    constructor(){
        this.imagenes = Array.from(document.querySelectorAll("article img"));
        console.log(this.imagenes);
        this.imagenActual = 0;
    }

    addTransicion() {
        this.imagenes.forEach((img) => {
          img.style.transition = "transform 0.8s ease";
        });
    }

    reset(){
        this.imagenes.forEach((img) => {
            img.style.transition = "none";
            img.style.transform = `translate(0)`;
        });
        this.imagenActual = 0;
    }

    cargarSiguiente(){
        if (this.imagenActual === this.imagenes.length - 1) {
            this.reset();
        }else{
            if (this.imagenActual === 0) this.addTransicion();
            this.imagenes.forEach(img => img.style.transform = `translate(${(this.imagenActual + 1) * - 100}%)`);
            this.imagenActual++;
        }
    }
}
var carrusel = new Carrusel();
window.setInterval(()=> {carrusel.cargarSiguiente();}, 5000);
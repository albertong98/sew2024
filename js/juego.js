"use strict"
class Juego{
    validar(){
        var respuestas = Array.from(document.querySelectorAll('input:checked'));
        var contador = 0;
        respuestas.forEach(respuesta => {
            var key = respuesta.getAttribute("name");
            var value = respuesta.getAttribute("value");
            contador = mapa.get(key) === value ? contador + 1 : contador;
        });
        $('header').after('<h2>Tu puntuación es de: '+contador+'</h2>');
    }
}

var mapa = new Map();

mapa.set('primer-elemento','pescados');
mapa.set('continente','africa');
mapa.set('base','semola');
mapa.set('gazpachuelo','pescadores');
mapa.set('kcal','70');
mapa.set('audio','receta');
mapa.set('pescado','rape');
mapa.set('verduras','zanahoria');
mapa.set('carne','ternera');
mapa.set('plato','papas');

var juego = new Juego();
const boton = document.querySelector('input[type="button"]');
boton.addEventListener('click',juego.validar);
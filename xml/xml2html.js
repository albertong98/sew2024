"use strict"
class XML2HTML{
    constructor(){
        this.correcto = '¡Todo correcto! archivo XML cargado';
    }

    cargarDatos(){
        console.log('me ejecuto');
        $.ajax({
            dataType: 'xml',
            url: 'xml/rutas.xml',
            method: 'GET',
            success: function(datos) {
                console.log('success');
                var stringDatos = '';
                var rutas = $('ruta',datos);
                rutas.each(function(indice){
                    var nombre = $('nombre',rutas[indice]).text();
                    var tipo = $('tipo',rutas[indice]).text();
                    var medio = $('medio',rutas[indice]).text();
                    var duracion = $('duracion',rutas[indice]).text() + " " + $('duracion',rutas[indice]).attr('unidades');
                    var agencia = $('agencia',rutas[indice]).text();
                    var descripcion = $('descripcion',rutas[indice]).text();
                    var personasAdecuadas = $('personasAdecuadas',rutas[indice]).text();
                    var inicio = $('inicio',rutas[indice]);
                    var fechaInicio = $('fecha',inicio).text();
                    var horaInicio = $('hora',inicio).text();
                    var lugarInicio = $('lugar',inicio).text();
                    var direccionInicio = $('direccion',inicio).text();
                   
                    var coordenadasInicio = $('coordenadas',inicio);
                    var latitudInicio = $('latitud',coordenadasInicio).text();
                    var longitudInicio = $('longitud',coordenadasInicio).text();
                    var altitudInicio = $('altitud',coordenadasInicio).text() + " " + $('altitud',coordenadasInicio).attr('unidades');

                    var recomendacion = $('recomendacion',rutas[indice]).text();

                    stringDatos += "\t<article>\n";
                    stringDatos += "\t\t<h2>";
			        stringDatos += nombre+"</h2>\n";
                    stringDatos += "\t\t<section>\n"
                    stringDatos += "\t\t\t<h3>Información de la ruta</h3>\n";
                    stringDatos += "\t\t\t<p>Tipo: " + tipo+ "</p>";
                    stringDatos += "\t\t\t<p>Medio: " + medio+ "</p>";
                    stringDatos += "\t\t\t<p>Duración: " +duracion+ "</p>";
                    stringDatos += "\t\t\t<p>Agencia: " + agencia+ "</p>";
                    stringDatos += "\t\t\t<p>Recomendacion: " + recomendacion + "</p>";
                    stringDatos += "\t\t\t<p>Adecuado para: " + personasAdecuadas + "</p>\n";
                    stringDatos += "\t\t\t<p>" + descripcion + "</p>\n";
                    
                    stringDatos += "\t\t\t<p>Fecha y hora de inicio: " + fechaInicio + " a las " + horaInicio + "</p>\n";

                    stringDatos += "\t\t\t<ul title=\"Punto de inicio\">\n";
                    stringDatos += "\t\t\t<li><p>Lugar: " + lugarInicio + "</p></li>\n";
                    stringDatos += "\t\t\t<li><p>Dirección: " + direccionInicio + "</p></li>\n";
                    stringDatos += "\t\t\t\t<li><p>Coordenadas: "+latitudInicio+", "+longitudInicio+"</p></li>\n";
                    stringDatos += "\t\t\t\t<li><p>Altitud: " + altitudInicio + "</p></li>\n";
                    stringDatos += "\t\t\t</ul>\n";

                    stringDatos += "\t\t\t<ul title=\"Referencias\">\n";
                    
                    var referenciasElement = $('referencias',rutas[indice]);
                    var referencias = $('referencia',referenciasElement)
                    referencias.each(function(referencia){
                        console.log(referencias[referencia].textContent);
                        console.log(referencias[referencia]);
                        var texto = referencias[referencia].textContent;
                        stringDatos += "\t\t\t\t<li><a href=\""+texto;
				        stringDatos += "\">" + texto;
				        stringDatos += "</a></li>\n";
                    });

                    stringDatos += "\t\t\t</ul>\n";
			        stringDatos += "\t\t</section>";

                    var hitosElement = $('hitos',rutas[indice]);
                    var hitos = $('hito',hitosElement);
                    hitos.each(function(hito){
                        var nombreHito = $('nombre',hitos[hito]).text();
                        var descripcionHito = $('descripcion',hitos[hito]).text();

                        var coordenadasHito = $('coordenadas',hitos[hito]);
                        var latitudHito = $('latitud',coordenadasHito).text();
                        var longitudHito = $('longitud',coordenadasHito).text();
                        var altitudHito = $('altitud',coordenadasHito).text() + " " + $('altitud',coordenadasHito).attr('unidades');
                        
                        stringDatos += "\t\t<section>\n";
                        stringDatos += "\t\t\t<h3>"+ nombreHito +"</h3>\n";
                        stringDatos += "\t\t\t<p>" + descripcionHito + "</p>\n";
                        if(typeof (distancia) != 'undefined' && distancia.length > 0)
                            stringDatos += "\t\t\t<p>Distancia desde el hito anterior: "+distancia+"</p>\n";
                        stringDatos += "\t\t\t<ul title=\"Ubicación\">\n";
                        stringDatos += "\t\t\t\t<li><p>Coordenadas: "+latitudHito+", "+longitudHito+"</p></li>\n";
                        stringDatos += "\t\t\t\t<li><p>Altitud: " + altitudHito + "</p></li>\n";
                        stringDatos += "\t\t\t</ul>\n";

                        var fotosElement = $('fotos',hitos[hito]);
                        var fotos = $('foto',fotosElement);
                        fotos.each(function(foto){
                            var urlFoto = "multimedia/imagenes/"+fotos[foto].textContent;
                            var titulo = fotos[foto].getAttribute('titulo');
                            stringDatos += "\t\t\t<img src=\""+urlFoto;
                            stringDatos += "\" alt = \""+titulo+"\"/>\n";
                        });

                        var videosElement = $('videos',hitos[hito]);
                        if(typeof(videosElement) != 'undefined' && videosElement.length > 0){
                            var videos = $('video',videosElement);
                            videos.each(function(video){
                                var urlVideo = "multimedia/videos/"+videos[video].textContent;
                                var type = videos[video].getAttribute('type');
                                stringDatos += "\t\t\t<video controls preload=\"auto\"><source src=\"" + urlVideo + "\" type=\""+type+"\">Video no soportado por el navegador</video>\n";
                             });
                        }

                        stringDatos += "\t\t</section>\n";
                    });
                        stringDatos += "\t</article>\n";
                });
                $("section").after(stringDatos); 
            },
            error: function() {
                $("header").after("<h3>¡Tenemos problemas! No se pudo cargar el archivo XML</h3>");
            }
        });
    }
}

var lector = new XML2HTML();

lector.cargarDatos();
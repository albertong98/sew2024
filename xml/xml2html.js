"use strict"
class XML2HTML{
    constructor(){
        this.correcto = '¡Todo correcto! archivo XML cargado';
    }

    cargarDatos(){
        $ajax({
            dataType: 'xml',
            url: 'xml/rutas.xml',
            method: 'GET',
            succes: function(datos) {
                var stringDatos = '';
                $('ruta',datos).each(function(ruta){
                    var nombre = $('nombre',ruta).text();
                    var tipo = $('tipo',ruta).text();
                    var medio = $('medio',ruta).text();
                    var duracion = $('duracion',ruta).text() + " " + $('duracion',ruta).attr('unidades');
                    var agencia = $('agencia',ruta).text();
                    var descripcion = $('descripcion',ruta).text();
                    var personasAdecuadas = $('personasAdecuadas',ruta).text();
                    var inicio = $('inicio',ruta);
                    var fechaInicio = $('fecha',inicio).text();
                    var horaInicio = $('hora',inicio).text();
                    var lugarInicio = $('lugar',inicio).text();
                    var direccionInicio = $('direccion',inicio).text();
                   
                    var coordenadasInicio = $('coordenadas',inicio);
                    var latitudInicio = $('latitud',coordenadasInicio).text();
                    var longitudInicio = $('longitud',coordenadasInicio).text();
                    var altitudInicio = $('altura',coordenadasInicio).text() + " " + $('altitud',coordenadasInicio).attr('unidades');

                    var recomendacion = $('recomendacion',ruta);

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
                    
                    var referencias = $('referencias',ruta);
                    $('referencia',referencias).each(function(referencia){
                        var texto = referencia.text();
                        stringDatos += "\t\t\t\t<li><a href=\""+texto;
				        stringDatos += "\">" + texto;
				        stringDatos += "</a></li>\n";
                    });

                    stringDatos += "\t\t\t</ul>\n";
			        stringDatos += "\t\t</section>";

                    var hitos = $('hitos',ruta);
                    $('hito',hitos).each(function(hito){
                        var nombreHito = $('nombre',hito).text();
                        var descripcionHito = $('descripcion',hito).text();

                        var coordenadasHito = $('coordenadas',hito);
                        var latitudHito = $('latitud',coordenadasHito).text();
                        var longitudHito = $('longitud',coordenadasHito).text();
                        var altitudHito = $('altura',coordenadasHito).text() + " " + $('altitud',coordenadasHito).attr('unidades');
                        
                        stringDatos += "\t\t<section>\n";
                        stringDatos += "\t\t\t<h3>"+ nombreHito +"</h3>\n";
                        stringDatos += "\t\t\t<p>" + descripcionHito + "</p>\n";
                        if(typeof (distancia) != 'undefined' && distancia.length > 0)
                            stringDatos += "\t\t\t<p>Distancia desde el hito anterior: "+distancia+"</p>\n";
                        stringDatos += "\t\t\t<ul title=\"Ubicación\">\n";
                        stringDatos += "\t\t\t\t<li><p>Coordenadas: "+latitudHito+", "+longitudHito+"</p></li>\n";
                        stringDatos += "\t\t\t\t<li><p>Altitud: " + altitudHito + "</p></li>\n";
                        stringDatos += "\t\t\t</ul>\n";

                        var fotos = $('fotos',hito);
                        
                        $('foto',fotos).each(function(foto){
                            var urlFoto = foto.text();
                            var titulo = foto.attr('titulo');
                            stringDatos += "\t\t\t<img src=\""+urlFoto;
                            stringDatos += "\" alt = \""+titulo+"\"/>\n";
                        });

                        var videos = $('videos',hito);
                        if(typeof(videos) != 'undefined' && videos.length > 0){
                            $('video',videos).each(function(video){
                                var urlVideo = video.text();
                                var type = video.attr('type');
                                stringDatos += "\t\t\t<video controls preload=\"auto\"><source src=\"" + urlVideo + "\" type=\""+type+"\">Video no soportado por el navegador</video>\n";
                             });
                        }

                        stringDatos += "\t\t</section>\n";
                    });
                        stringDatos += "\t</article>\n";
                });
                $("header").after(stringDatos); 
            },
            error: function() {
                $("h3").html("¡Tenemos problemas! No se pudo cargar el archivo XML");
            }
        });
    }
}

var lector = new XML2HTML();

window.onload = lector.cargarDatos();
"use strict";
class XML2KML {
    constructor(){
        this.correcto = "¡Todo correcto! archivo XML cargado"
    }
    
    cargarDatos(){
        var xml2kml = this;
        $.ajax({
            dataType: "xml",
            url: 'xml/rutas.xml',
            method: 'GET',
            success: function(datos){
                var rutas = $('ruta',datos);
                rutas.each(function(indice){
                    var stringDatos = "";
                    stringDatos += "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
                    stringDatos += "<kml xmlns=\"http://www.opengis.net/kml/2.2\">\n";
                    stringDatos += "<Document id='Universidad de Oviedo'>\n";
                    stringDatos += "<Style id=\"redLine\">";
                    stringDatos += "<LineStyle>\n<color>501400FF</color>\n<width>5</width>\n</LineStyle>\n</Style>\n";
                    var nombreRuta = $('nombre',rutas[indice]).text();
                    var descripcionRuta =  $('descripcion',rutas[indice]).text();
                    var inicio = $('inicio',rutas[indice]);
                    var coordenadasInicio = $('coordenadas',inicio);
                    var latitudInicio = $('latitud',coordenadasInicio).text();
                    var longitudInicio = $('longitud',coordenadasInicio).text();
                    var altitudInicio = $('altitud',coordenadasInicio).text();

                    stringDatos += "<Placemark>\n";
                    stringDatos += "<name>"+nombreRuta+"</name>\n";
                    stringDatos += "<description>" + descripcionRuta + "</description>\n";
                    stringDatos += "<styleUrl>#redLine</styleUrl>\n";
                    stringDatos += "<LineString>\n";
                    stringDatos += "<extrude>1</extrude>\n";
                    stringDatos += "<tessellate>1</tessellate>\n";
                    stringDatos += "<altitudeMode>relativeToGround</altitudeMode>\n";
                    stringDatos += "<coordinates>\n";
                    stringDatos += longitudInicio+","+latitudInicio+","+altitudInicio+"\n";
                    
                    var hitosElement = $('hitos',rutas[indice]);
                    var hitos = $('hito',hitosElement);
                    hitos.each(function(hito){
                        var coordenadasHito = $('coordenadas',hitos[hito]);
                        var latitudHito = $('latitud',coordenadasHito).text();
                        var longitudHito = $('longitud',coordenadasHito).text();
                        var altitudHito = $('altitud',coordenadasHito).text();
                        stringDatos += longitudHito + "," +latitudHito+","+altitudHito+"\n";
                    });

                    stringDatos += "</coordinates>\n";
                    stringDatos += "</LineString>\n</Placemark>\n";
                    xml2kml.download(stringDatos,"rutas-"+(indice+1)+".kml","text/plain");
                });
            },error: function(){
                $("header").after("<h3>¡Tenemos problemas! No se pudo cargar el archivo XML</h3>");
            }
        });
    }

    download(data, filename, type) {
        var file = new Blob([data], {type: type});
        if (window.navigator.msSaveOrOpenBlob)
            window.navigator.msSaveOrOpenBlob(file, filename);
        else { 
            var a = document.createElement("a"),
                    url = URL.createObjectURL(file);
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            setTimeout(function() {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);  
            }, 0); 
        }
    }
        
}

var xml2kml = new XML2KML();
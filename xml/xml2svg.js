"use strict";
class XML2SVG {
    constructor(){
        this.correcto = "¡Todo correcto! archivo XML cargado"
        this.altitudes = new Map();
    }
    
    cargarDatos(){
        var xml2svg = this;
        $.ajax({
            dataType: "xml",
            url: 'xml/rutas.xml',
            method: 'GET',
            success: function(datos){
                var rutas = $('ruta',datos);
                rutas.each(function(indice){
                    xml2svg.altitudes.clear();
                    let stringDatos = "<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"2.0\">\n";
                    stringDatos += "<polyline points=\n";
                    var inicio = $('inicio',rutas[indice]);
                    var coordenadas = $('coordenadas',inicio);
                    var lugarInicio = $('lugar',inicio).text();
                    var altitudInicio = $('altitud',coordenadas).text();

                    xml2svg.altitudes.set(lugarInicio,parseInt(altitudInicio,10));

                    var hitosElement = $('hitos',rutas[indice]);
                    var hitos = $('hito',hitosElement);

                    hitos.each(function(hito){
                        var coordenadasHito = $('coordenadas',hitos[hito]);
                        var nombreHito = $('nombre',hitos[hito]).text();
                        var altitudHito = $('altitud',coordenadasHito).text();
                        xml2svg.altitudes.set(nombreHito,parseInt(altitudHito,10));
                    });

                    xml2svg.transformY();

                    var cx = 20;
                    stringDatos += "\"0,165\n"+cx+"," + xml2svg.altitudes.get(lugarInicio) + "\n"

                    hitos.each(function(hito){
                        var nombreHito = $('nombre',hitos[hito]).text();
                        cx+=100;
                        stringDatos += cx+','+xml2svg.altitudes.get(nombreHito)+'\n';
                    });

                    stringDatos +=(cx+1)+",165\n0,165\"\n";

                    var cx = 20;

                    stringDatos +="style=\"fill:white;stroke:red;stroke-width:4\" />\n";
                    stringDatos += "<text x = \""+cx+"\" y = \"170\" style=\"writing-mode: tb; glyph-orientation-vertical: 0;\">\n"
                    stringDatos += "Inicio\n</text>\n";

                    hitos.each(function(hito){
                        cx+=100;
                        var nombreHito = $('nombre',hitos[hito]).text();
                        stringDatos += "<text x = \""+cx+"\" y = \"170\" style=\"writing-mode: tb; glyph-orientation-vertical: 0;\">\n";
                        stringDatos += nombreHito+"\n</text>\n";
                    });
                    stringDatos += "</svg>\n";
                    xml2svg.download(stringDatos,"rutas-"+(indice+1)+".svg","text/plain");
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

    transformY(){
        var minP = "";
        var maxP = "";
        var max=0;
        var min=9999;

        this.altitudes.forEach((value,key) => {
            if(value > max) { 
                max = value;  
                maxP = key; 
            }
            if(value < min) { 
                min = value;  
                minP = key; 
            }
        });
    
        this.altitudes.set(minP,150);
        this.altitudes.set(maxP,10);
        
        var diff = max - min;
        var keys = Array.from(this.altitudes.keys()).filter(key => key !== maxP && key !== minP);
 
        keys.forEach(key => {
            var a = this.altitudes.get(key);
            var percent = (a - min)/diff;
            var y = (160 * percent);
            y = y < 10 ? 10 : y;
            y = y > 165 ? 165 : y;
            this.altitudes.set(key,y);
        });
    }
        
}

var xml2svg = new XML2SVG();
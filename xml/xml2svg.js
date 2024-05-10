"use strict";
class XML2SVG {
    constructor(){
        this.correcto = "¡Todo correcto! archivo XML cargado"
        this.altitudes = new Map();
    }
    
    cargarDatos(){
        $.ajax({
            dataType: "xml",
            url: 'xml/rutas.xml',
            method: 'GET',
            success: function(datos){
                let stringDatos = "<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n";

                $(datos).find("ruta").each(() => {
                    stringDatos += "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"2.0\">\n";
                    stringDatos += "<polyline points=\n";
                    
                    let coordenadas = $(this).find('inicio').find('coordenadas');
                    let lugarInicio = $(this).find('inicio').find('lugar').text();

                    altitudes.set(lugarInicio,parseInt(coordenadas.find('altitud').text(),10));
                    $(this).find('hitos').find('hito').each(() => {
                        let coordenadasHito = $(this).find('coordenadas');
                        let nombre = $(this).find('nombre').text();
                        altitudes.set(nombre,parseInt(coordenadasHito.find('altitud').text(),10));
                    });

                    transformY();

                    cx = 20;

                    stringDatos += "\"0,165\n"+cx+"," + altitudes.get(lugarInicio) + "\n"

                    $(this).find('hitos').find('hito').each(() => {
                        cx+=100;
                        stringDatos += cx+','+altitudes.get($(this).find('nombre').text()+'\n');
                    });

                    stringDatos +=(cx+1)+",165\n0,165\"\n";

                    cx = 20;

                    stringDatos +="style=\"fill:white;stroke:red;stroke-width:4\" />\n";
                    stringDatos += "<text x = \""+cx+"\" y = \"170\" style=\"writing-mode: tb; glyph-orientation-vertical: 0;\">\n"
                    stringDatos += "Inicio\n</text>\n";

                    $(this).find('hitos').find('hito').each(() => {
                        cx+=100;
                        let nombre = $(this).find('nombre').text();
                        stringDatos += "<text x = \""+cx+"\" y = \"170\" style=\"writing-mode: tb; glyph-orientation-vertical: 0;\">\n";
                        stringDatos += nombre+"\n</text>\n";
                    });
                    stringDatos += "</svg>\n";
                }); 
                download(stringDatos,"rutas.svg","text/plain");
            },error: function(){
                $("h3").html("¡Tenemos problemas! No se pudo cargar el archivo XML");
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
            if(value > max) { max = value;  maxP = key; }
            if(value < min) { min = value;  minP = key; }
        });
        
        this.altitudes[minP] = 150;
        this.altitudes[maxP] = 10;
        
        var diff = max - min;
        var keys = this.altitudes.keys().filter(key => key !== maxP && key !== minP);
        keys.forEach(key => {
            var a = this.altitudes.get(key);
            var percent = (a - min)/diff;
            var y = (160 * percent);
            this.altitudes[key] = y < 10 ? 10 : y;
        });
    }
        
}
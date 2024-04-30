"use strict";
class XML2KML {
    constructor(){
        this.correcto = "¡Todo correcto! archivo XML cargado"
    }
    
    cargarDatos(){
        $.ajax({
            dataType: "xml",
            url: 'xml/rutas.xml',
            method: 'GET',
            success: function(datos){
                let stringDatos = "";
                stringDatos += "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
                stringDatos += "<kml xmlns=\"http://www.opengis.net/kml/2.2\">\n";
                stringDatos += "<Document id='Universidad de Oviedo'>\n";
                stringDatos += "<Style id=\"redLine\">";
                stringDatos += "<LineStyle>\n<color>501400FF</color>\n<width>5</width>\n</LineStyle>\n</Style>\n";
                $(datos).find("ruta").each(() => {
                    let nombreRuta = $('nombre',this).text();
                    let descripcionRuta = $('descripcion',this).text();
                    let coordenadas = $(this).find('inicio').find('coordenadas');
                    let latitudInicio = coordenadas.find('latitud').text();
                    let longitudInicio = coordenadas.find('longitud').text();
                    let altitudInicio = coordenadas.find('altitud').text();

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
                    
                    $(this).find('hitos').each(() => {
                        let coordenadasHito = $(this).find('coordenadas');
                        let latitudHito = coordenadasHito.find('latitud').text();
                        let longitudHito = coordenadasHito.find('longitud').text();
                        let altitudHito = coordenadasHito.find('altitud').text();
                        kml.Append(longitudHito + "," +latitudHito+","+altitudHito+"\n");
                    });

                    stringDatos += "</coordinates>\n";
                    stringDatos += "</LineString>\n</Placemark>\n";
                }); 
                download(stringDatos,"rutas.kml","text/plain")
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
        
}
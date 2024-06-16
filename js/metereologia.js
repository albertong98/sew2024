class Metereologia{
    constructor(){
        this.apikey = "f27e388816e3e7ace91eb06f36818262";
    }

    prevision(){
        var latitud="35.88919";
        var longitud="-5.32042";
        var URL = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitud}&lon=${longitud}&exclude=current,hourly,minutely&units=metric&appid=${this.apikey}`;
        $.ajax({
            dataType: 'json',
            url: URL,
            method: 'GET',
            success: function(datos) {
                var list = datos.daily;
                var i = 0;
                list.forEach(day => {
                    if(i<7){
                        var fecha = new Date(day.dt * 1000);
                        var temperaturaMax = day.temp.max;
                        var temperaturaMin = day.temp.min;
                        var humedad = day.humidity;
                        var icon = day.weather[0].icon;
                        var iconurl = "http://openweathermap.org/img/w/" + icon + ".png";
                        var alt = day.weather[0].description;

                        var html = `<h2>${fecha.toLocaleDateString('es-ES')}</h2><ul><li>Temperatura máxima: ${temperaturaMax} °C</li><li>Temperatura mínima: ${temperaturaMin} °C</li><li>Humedad: ${humedad}</li><li><img src="${iconurl}" alt="${alt}"></li></ul>`
                        $('section').last().append(html);
                        i++
                    }
                });
            },
            error: function() {
                $("h3").html("¡Tenemos problemas! No se pudo cargar el tiempo");
            }
        });
    }
}

var metereologia = new Metereologia();
metereologia.prevision();
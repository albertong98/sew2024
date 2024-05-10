class TiempoActual{
    constructor(){
        this.apikey = "f27e388816e3e7ace91eb06f36818262";
    }

    tiempoActual(){
        var latitud="35.88919";
        var longitud="-5.32042";
        var URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&units=metric&appid=${this.apikey}`;
        $.ajax({
            dataType: 'json',
            url: URL,
            method: 'GET',
            success: function(datos) {
                var temperatura = datos.main.temp;
                var feelslike = datos.main.feels_like;
                var humedad = datos.main.humidity;
                var icon = datos.weather[0].icon;
                var iconurl = "http://openweathermap.org/img/w/" + icon + ".png";
                var alt = datos.weather[0].description;
                $('aside > ul').last().append(`<li>Temperatura: ${temperatura} °C</li>`);
                $('aside > ul').last().append(`<li>Sensacion térmica: ${feelslike} °C</li>`);
                $('aside > ul').last().append(`<li>Humedad: ${humedad}</li>`);
                $('aside > ul').last().append(`<li><img src="${iconurl}" alt="${alt}"></li>`);
            },
            error: function() {
                $("h3").html("¡Tenemos problemas! No se pudo cargar el tiempo");
            }
        });
    }
}

var tiempo = new TiempoActual();
tiempo.tiempoActual();
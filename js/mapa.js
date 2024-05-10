class Mapa{
    constructor(){
        this.apikey = "AIzaSyCJfcrH5mpUEz99V6knN-uOt2yL5OG0_ng";
    }

    cargarMapa(){
        var latitud="35.88919";
        var longitud="-5.32042";
        var url = `https://maps.googleapis.com/maps/api/staticmap?&key=${this.apikey}&center=${latitud},${longitud}&zoom=13&size=640x480&markers=color:red&sensor=false`;
        $("section img").last().attr('src',url);
    }
}

var mapa = new Mapa();
mapa.cargarMapa();
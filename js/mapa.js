class Mapa{
    constructor(){
        this.apikey = "AIzaSyCJfcrH5mpUEz99V6knN-uOt2yL5OG0_ng";
    }

    cargarMapa(){
        var latitud="35.88919";
        var longitud="-5.32042";
        var size = window.matchMedia("(min-width: 800px)").matches ? "640x480" : "320x240";
        var url = `https://maps.googleapis.com/maps/api/staticmap?&key=${this.apikey}&center=${latitud},${longitud}&zoom=13&size=${size}&markers=color:red&sensor=false`;
        var picture = document.createElement('picture');
        
        var img = document.createElement("img");
        img.setAttribute("alt","Mapa de Ceuta");
        img.setAttribute("src",url);
        
        picture.append(img);
        
        var section = document.createElement('section');
        
        var h3 = document.createElement('h3');
        
        h3.innerText = 'Localización de Ceuta';
        
        section.append(h3)
        section.append(picture);
        
        document.querySelector('article').append(section);
    }
}

var mapa = new Mapa();
mapa.cargarMapa();
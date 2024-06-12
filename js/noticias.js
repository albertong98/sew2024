class Noticias{
    constructor(){
        this.apikey = "d59eb799af8849f68ae62d58aa671979";
    }

    cargarNoticias(){
        var URL = `https://newsapi.org/v2/everything?q=ceuta&apikey=${this.apikey}`;

        $.ajax({
            dataType: 'json',
            url: URL,
            method: 'GET',
            success: function(datos){
                var date = new Date();
                $('aside').append('<p>Última actualizacion de las noticias: '+date.toLocaleString('es-ES')+'</p>');
                $('aside').append('<ol></ol>');
                for(var i = 0 ; i < 7 ; i++){
                    var article = datos.articles[i];
                    $('aside > ol').append(`<li><a href=${article.url}>${article.title}</a></li>`);
                }
            },
            error: function(){
                $("h3").html("¡Tenemos problemas! No se pudieron cargar las noticias");
            }
        });
    }
}

var noticias = new Noticias();
noticias.cargarNoticias();
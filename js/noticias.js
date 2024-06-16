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
                $('article').append('<section><h3>Noticias</h3></section>');
                $('section').last().append('<p>Última actualizacion de las noticias: '+date.toLocaleString('es-ES')+'</p>');
                $('section').last().append('<ol></ol>');
                for(var i = 0 ; i < 7 ; i++){
                    var article = datos.articles[i];
                    $('section > ol').append(`<li><a href=${article.url}>${article.title}</a></li>`);
                }
            },
            error: function(){
                $('article').append('<section><h3>¡Tenemos problemas! No se pudieron cargar las noticias</h3></section>');
            }
        });
    }
}

var noticias = new Noticias();
noticias.cargarNoticias();
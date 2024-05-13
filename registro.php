<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="author" content="Alberto Núñez García">
    <meta name="description" content="">
    <meta name="keywords" content="">
    <meta name ="viewport" content ="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="estilo/estilo.css">
    <title>Registro</title>
</head>
<body>
    <header>
        <h1>Registro</h1>
        <nav>
            <ul>
                <li><a accesskey="i" tabindex="1" href="index.html">Inicio</a></li> 
                <li><a accesskey="g" tabindex="2" href="gastronomia.html">Gastronomía</a></li> 
                <li><a accesskey="j" tabindex="3" href="juego.html">Juego</a></li> 
            </ul>
        </nav>
    </header>
    <body>
        <section>
            <?php
                include 'php/usuario.php';
                include 'php/insert.php';
                
                $formularioPOST = NULL;

                if (count($_POST)>0) 
                    {   
                        $formularioPOST  = $_POST;

                        if($_POST["username"] == ""){
                            $errorNombre = " * El nombre es obligatorio ";
                            $errorFormulario = true;
                        }
                        
                        if($_POST["password"] == ""){
                            $errorNombre = " * El nombre es obligatorio ";
                            $errorFormulario = true;
                        }
                    }
                echo "
                <form action='#' method='post' name='formulario'>
                    <p>Nombre de usuario</p> 
                    <p>
                        <input type='text' name='username'/>
                    </p>
                    <p>Contraseña</p> 
                    <p>
                        <input type='password' name='password'/>
                    </p>
                    <p>
                        <input type='submit' value='Enviar'/>
                    </p>
                </form>";

                if($formularioPOST){
                    $user = new Usuario($formularioPOST["username"],$formularioPOST["password"]);
                    $insert = new Insert();

                    $insert->insertUser($user);
                }
            ?>
        </section>
    </body>   
    <footer>
        <a href="http://validator.w3.org/check/referer" hreflang="en-us"> <img src="valid-html5-button.png" alt="¡HTML5 válido!"/></a>
        <a href="http://jigsaw.w3.org/css-validator/check/referer">
        <img src="http://jigsaw.w3.org/css-validator/images/vcss" alt="¡CSS válido!" /></a>
    </footer>
</body>
</html>
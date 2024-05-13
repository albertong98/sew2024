<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="author" content="Alberto Núñez García">
    <meta name="description" content="">
    <meta name="keywords" content="">
    <meta name ="viewport" content ="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="estilo/estilo.css">
    <title>Inicio de sesión</title>
</head>
<body>
    <header>
        <h1>Inicio de sesión</h1>
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
                include 'php/select.php';
                include 'php/insert.php';

                $formularioPOST = NULL;
                $username = NULL;
                $keys = NULL;
                $recursos = NULL;
                if (isset($_POST['login'])) {   
                    if($_POST["username"] == ""){
                        $errorNombre = " * El nombre es obligatorio ";
                        $errorFormulario = true;
                    }
                    
                    if($_POST["password"] == ""){
                        $errorNombre = " * El nombre es obligatorio ";
                        $errorFormulario = true;
                    }

                    $select = new Select();
                    if($select->selectUser($_POST["username"],$_POST["password"])){
                        $username = $_POST["username"];
                    }
                }
                if (isset($_POST['reservar'])) {
                    if($_POST["recurso"] == ""){
                        $errorNombre = " * El nombre es obligatorio ";
                        $errorFormulario = true;
                    }
                    
                    if($_POST["fecha"] == ""){
                        $errorNombre = " * La fecha es obligatoria ";
                        $errorFormulario = true;
                    }

                    $insert = new Insert();
                    $reserva = new Reserva($username,$recursos[$_POST["recurso"]],$fecha);
                    $insert->insertReserva($reserva);
                }
                if($username == NULL){
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
                            <input type='submit' name='login' value='Iniciar sesión'/>
                        </p>
                    </form>";
                }else{
                    $recursos = $select->selectRecursos();
                    if($recursos != NULL){
                        $keys = array_keys($recursos);
                    }

                    echo "
                    <form action='#' method='post' name='reserva'>
                        <p>Recurso</p> 
                        <p><select name='recuso'>";
                    
                    foreach($keys as $key){
                        echo "<option value='",$key,"'>",$key,"</option>";
                    }

                     echo "
                        </select></p>
                        <p>Fecha de la reserva</p> 
                        <p>
                            <input type='date' name='fecha'/>
                        </p>
                        <p>
                            <input type='submit' name='reservar' value='Reservar'/>
                        </p>
                    </form>";
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
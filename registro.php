<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="author" content="Alberto Núñez García">
    <meta name="description" content="Página dedicada al turismo y gastronomia en la ciudad autónoma de Ceuta">
    <meta name="keywords" content="Ceuta,ceutí,gastronomía,SEW,CSS,HTML,XML,SVG,KML">
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
                    <li><a accesskey="m" tabindex="4" href="metereologia.html">Metereologia</a></li>
                    <li><a accesskey="r" tabindex="5" href="reservas.php">Reservas</a></li>
                    <li><a accesskey="t" tabindex="6" href="rutas.html">Rutas</a></li>
                </ul>
            </nav>
    </header>
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
                echo "<h2>Registarse como usuario</h2>
                <form action='#' method='post' name='formulario'>
                    
                    <p>
                        <label for='username'>Nombre de usuario</label> 
                        <input type='text' name='username' id='username'/>
                    </p>
                    <p>
                        <label for='password'>Contraseña</label> 
                        <input type='password' name='password' id='password'/>
                    </p>
                    <p>
                        <input type='submit' value='Enviar'/>
                    </p>
                </form>";

                if($formularioPOST){
                    $user = new Usuario($formularioPOST["username"],$formularioPOST["password"]);
                    $insert = new Insert();

                    $insert->insertUser($user);

                    setcookie("username",$formularioPOST["username"],time()+36000,"/","",0);
                    header("Refresh:0;  url=reservas.php");
                }
            ?>
        </section>
</body>
</html>
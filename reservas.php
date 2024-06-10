<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="author" content="Alberto Núñez García">
    <meta name="description" content="Página dedicada al turismo y gastronomia en la ciudad autónoma de Ceuta">
    <meta name="keywords" content="Ceuta,ceutí,gastronomía,SEW,CSS,HTML,XML,SVG,KML">
    <meta name ="viewport" content ="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="estilo/estilo.css">
    <link rel="stylesheet" type="text/css" href="estilo/layout.css">
    <title>Reservas</title>
</head>
<body>
    <header>
        <h1>Reservas</h1>
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
        <article>
            <?php
                include 'php/usuario.php';
                include 'php/select.php';
                include 'php/insert.php';
                include 'php/presupuesto.php';
                include 'php/reserva.php';

                $formularioPOST = NULL;
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
                        setcookie("username",$_POST["username"],time()+36000,"/","",0);
                        header("Refresh:0");
                    }
                }
                if (isset($_POST['reservar'])) {
                    $select = new Select();
                    $recursos = $select->selectRecursos();
                    if($_POST["recurso"] == ""){
                        $errorNombre = " * El nombre es obligatorio ";
                        $errorFormulario = true;
                    }
                    
                    if($_POST["fecha"] == ""){
                        $errorNombre = " * La fecha es obligatoria ";
                        $errorFormulario = true;
                    }

                    $insert = new Insert();
                    if(isset($_COOKIE["username"])){
                        $reserva = new Reserva($_COOKIE["username"],$recursos[$_POST["recurso"]],$_POST["fecha"],0);
                        $insert->insertReserva($reserva);
                    }else{
                        echo "<p>Sesion caducada</p>";
                    }
                }
                if(isset($_COOKIE["username"])){
                    $select = new Select();
                    $recursos = $select->selectRecursos();
                    if($recursos != NULL){
                        $keys = array_keys($recursos);
                    }
                   
                    echo "<a href='php/generar.php'>Generar BBDD</a><h2>Reserva de recursos turisticos</h2>
                    <form action='#' method='post' name='reserva'>
                        <p>Recurso</p> 
                        <p><select name='recurso'>";
                    
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

                    echo 
                    "<h2>Presupuestos</h2><form action='#' method='post' name='presupuesto'>
                        <p>Generar presupuesto</p>
                        <p>
                            <input type='submit' name='generar' value='Generar presupuesto'/>
                        </p>
                    </form>";

                }else{
                    echo "<a href='registro.php'>Registrarse como usuario</a><h2>Inicio de sesión</h2>
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
                }

                

                if (isset($_POST['generar'])) {
                    $insert = new Insert();
                    $select = new Select();
                    if(isset($_COOKIE["username"])){
                        $recursos = $select->selectRecursosNombres();

                        $id = $select->selectNextAutoIncrementPresupuesto();
                        $presupuesto = new Presupuesto($id,$_COOKIE["username"]);
                        
                        $reservas = $presupuesto->generar();
                        $insert->insertPresupuesto($presupuesto);

                        echo "<p>Presupuesto generado</p>";
    
                        foreach($reservas as $reserva){

                            echo "<p>",$recursos[$reserva->getRecursoId()],": ",$reserva->getPrecio()," euros</p>";
                        }
    
                        echo "<p>Total: ",$presupuesto->getPrecio()," euros</p>";
                    }else{
                        echo "<p>Sesion caducada</p>";
                    }
                }
            ?>
        </article>
</body>
</html>
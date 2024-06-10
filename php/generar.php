<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="author" content="Alberto Núñez García">
    <meta name="description" content="Página dedicada al turismo y gastronomia en la ciudad autónoma de Ceuta">
    <meta name="keywords" content="Ceuta,ceutí,gastronomía,SEW,CSS,HTML,XML,SVG,KML">
    <meta name ="viewport" content ="width=device-width, initial-scale=1.0">
    <title>Generar BBDD</title>
</head>
<body>
    <header>
        <h1>Generar BBDD</h1>
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
    <body>
        <section>
            <?php
                $db = new mysqli('localhost','DBUSER2024', 'DBPSWD2024');
            
                if($db->connect_error) {
                    echo "<p>ERROR de conexión:".$db->connect_error."</p>";
                    exit();
                }

                if($db->query("CREATE DATABASE IF NOT EXISTS reservas COLLATE utf8_spanish_ci") === TRUE){
                    echo "<p>BBDD reservas creada con éxito</p>";
                } else { 
                    echo "<p>ERROR en la creación de la BBDD</p>";
                    exit();
                }

                $db->select_db("reservas");

                $queryUserTable = "CREATE TABLE IF NOT EXISTS user (
                    nombre_usuario VARCHAR(255) NOT NULL, 
                    pass VARCHAR(255) NOT NULL,
                    PRIMARY KEY (nombre_usuario))";
        
       
                if($db->query($queryUserTable) === TRUE){
                    echo "<p>Tabla User creada con éxito</p>";
                } else { 
                    echo "<p>ERROR en la creación de la tabla User</p>";
                    exit();
                }
    
                $queryRecursoTable = "CREATE TABLE IF NOT EXISTS recurso (
                    recurso_id INT NOT NULL AUTO_INCREMENT,
                    nombre varchar(100) NOT NULL,
                    limite_ocupacion INT NOT NULL,
                    precio INT NOT NULL,
                    descripcion varchar(400) NOT NULL,
                    PRIMARY KEY (recurso_id))";
        
       
                if($db->query($queryRecursoTable) === TRUE){
                    echo "<p>Tabla Recurso creada con éxito</p>";
                } else { 
                    echo "<p>ERROR en la creación de la tabla Recurso</p>";
                    exit();
                }

                $queryReservaTable = "CREATE TABLE IF NOT EXISTS reserva (
                    reserva_id INT NOT NULL AUTO_INCREMENT,
                    username varchar(30) NOT NULL,
                    recurso_id INT NOT NULL,
                    fecha_reserva date NOT NULL,
                    PRIMARY KEY (reserva_id))";
        
       
                if($db->query($queryReservaTable) === TRUE){
                    echo "<p>Tabla Reserva creada con éxito</p>";
                } else { 
                    echo "<p>ERROR en la creación de la tabla Reserva</p>";
                    exit();
                }

                $queryPresupuestoTable = "CREATE TABLE IF NOT EXISTS presupuesto (
                    presupuesto_id INT NOT NULL AUTO_INCREMENT,
                    nombre_usuario varchar(30) NOT NULL,
                    precio INT NOT NULL,
                    PRIMARY KEY (presupuesto_id))";
        
       
                if($db->query($queryPresupuestoTable) === TRUE){
                    echo "<p>Tabla Presupuesto creada con éxito</p>";
                } else { 
                    echo "<p>ERROR en la creación de la tabla Presupuesto</p>";
                    exit();
                }

                $queryPresupuestoReservaTable = "CREATE TABLE IF NOT EXISTS presupuesto_reserva (
                    presupuesto_id INT NOT NULL,
                    reserva_id INT NOT NULL,
                    PRIMARY KEY (presupuesto_id,reserva_id))";
        
       
                if($db->query($queryPresupuestoReservaTable) === TRUE){
                    echo "<p>Tabla Presupuesto_reserva creada con éxito</p>";
                } else { 
                    echo "<p>ERROR en la creación de la tabla Presupuesto_reserva</p>";
                    exit();
                }

                $prepare = $db->prepare("INSERT INTO recurso (nombre, limite_ocupacion,precio,descripcion) VALUES (?,?,?,?)");
            
                $nombre = "Hotel 4 estrellas";
                $limite_ocupacion = 5;
                $precio=50;    
                $descripcion = "Hotel 4 estrellas ubicado en el centro de la ciudad";
                $prepare->bind_param('siis',$nombre,$limite_ocupacion,$precio,$descripcion);    
                $prepare->execute();

                $nombre = "Airbnb";
                $limite_ocupacion = 3;
                $precio=30;    
                $descripcion = "Apartamento totalmente equipado con vistas a la playa";
                $prepare->bind_param('siis',$nombre,$limite_ocupacion,$precio,$descripcion);    
                $prepare->execute();

                $nombre = "Museo";
                $limite_ocupacion = 25;
                $precio=10;    
                $descripcion = "Museo de bellas artes";
                $prepare->bind_param('siis',$nombre,$limite_ocupacion,$precio,$descripcion);    
                $prepare->execute();

                $nombre = "Spa";
                $limite_ocupacion = 50;
                $precio=20;    
                $descripcion = "Spa que dispone de sauna, masajes, termas y piscinas";
                $prepare->bind_param('siis',$nombre,$limite_ocupacion,$precio,$descripcion);    
                $prepare->execute();

                $nombre = "Alquiler motos de agua";
                $limite_ocupacion = 15;
                $precio=60;    
                $descripcion = "Alquiler de motos acuaticas para utilizar durante un dia";
                $prepare->bind_param('siis',$nombre,$limite_ocupacion,$precio,$descripcion);    
                $prepare->execute();

                $nombre = "Guia turistico";
                $limite_ocupacion = 10;
                $precio=80;    
                $descripcion = "Servicio de guia turistico para grupos de hasta 10 personas";
                $prepare->bind_param('siis',$nombre,$limite_ocupacion,$precio,$descripcion);    
                $prepare->execute();
                
                $nombre = "Restaurante tradicional";
                $limite_ocupacion = 120;
                $precio=30;    
                $descripcion = "Restaurante tradicional ceuti";
                $prepare->bind_param('siis',$nombre,$limite_ocupacion,$precio,$descripcion);    
                $prepare->execute();

                $nombre = "Limusina";
                $limite_ocupacion = 2;
                $precio=200;    
                $descripcion = "Limusina privada que recorre la ciudad";
                $prepare->bind_param('siis',$nombre,$limite_ocupacion,$precio,$descripcion);    
                $prepare->execute();
                
                $nombre = "Autobus turistico";
                $limite_ocupacion = 30;
                $precio=15;    
                $descripcion = "Autobus turistico que recorre la ciudad";
                $prepare->bind_param('siis',$nombre,$limite_ocupacion,$precio,$descripcion);    
                $prepare->execute();

                $nombre = "Visita a la fortaleza";
                $limite_ocupacion = 40;
                $precio=5;    
                $descripcion = "Visita a la fortaleza del Monte Hacho";
                $prepare->bind_param('siis',$nombre,$limite_ocupacion,$precio,$descripcion);    
                $prepare->execute();

                $db->close();
            ?>
        </section>
    </body>  
</body>
</html>
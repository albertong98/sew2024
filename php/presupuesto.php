<?php
include 'insert.php';
class Presupuesto{
    protected $presupuestoId;
    protected $username;
    protected $reservas;
    protected $precio;

    public function __construct($username,$reservas,$precio){
        $this->username = $username;
        $this->reservas = $reservas;
        $this->precio = $precio;
    }

    public function getUsername(){
        return $this->username;
    }

    public function getPrecio(){
        return $this->precio;
    }

    public function getReservas(){
        return $this->reservas;
    }

    public function generar(){
        $db = new mysqli($host,$dbUser, $dbPassword, $dbName);
            
        if($db->connect_error) {
            echo "<p>ERROR de conexión:".$db->connect_error."</p>";
            exit();
        }

        $prepare = $db->prepare("SELECT * from reserva WHERE nombre_usuario = ?");

        $prepare->bind_param('s',$this->$username);

        $resultado = $prepare->get_result();

        if ($resultado->fetch_assoc()!=NULL) {
            $resultado->data_seek(0); 
            while($fila = $resultado->fetch_assoc()) {
                $prepareInsert = $db->prepare("INSERT INTO presupuesto_reserva (presupuesto_id, reserva_id) VALUES (?,?)");
                $prepareInsert->bind_param('ss', $this->presupuestoId,$fila["reserva_id"]);    
                $prepareInsert->execute();
                $prepareInsert->close();
                
                $preparePrecio = $db->prepare("SELECT precio from recurso WHERE recurso_id = ?");
                $preparePrecio->bind_param('s',$fila["reserva_id"]);
                
                $precio = $preparePrecio->get_result();
                if ($precio->fetch_assoc()!=NULL) {
                    $precio->data_seek(0);
                    while($filaPrecio = $precio->fetch_assoc()) {
                        $this->precio+=$filaPrecio["precio"];
                    }
                }
            }
        } else {
            echo "<p>Búsqueda sin resultados</p>";
        }

    }
}

?>
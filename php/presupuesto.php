<?php
class Presupuesto{
    const dbUser = 'DBUSER2024';
    const dbPassword = 'DBPSWD2024';
    const dbName = 'reservas';
    const host = 'localhost';

    protected $presupuestoId;
    protected $username;
    protected $reservas;
    protected $precio;

    public function __construct($id,$username){
        $this->presupuestoId = $id;
        $this->username = $username;
        $this->reservas = array();
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
    public function getPresupuestoId(){
        return $this->presupuestoId;
    }
    public function generar(){
        $db = new mysqli(self::host,self::dbUser, self::dbPassword, self::dbName);
            
        if($db->connect_error) {
            echo "<p>ERROR de conexión:".$db->connect_error."</p>";
            exit();
        }

        $prepare = $db->prepare("SELECT * from reserva WHERE username = ?");

        $prepare->bind_param('s',$this->username);
        $prepare->execute();

        $resultado = $prepare->get_result();

        if ($resultado->fetch_assoc()!=NULL) {
            $resultado->data_seek(0);
            $this->reservas = array();
            while($fila = $resultado->fetch_assoc()) {
                
                $prepareInsert = $db->prepare("INSERT INTO presupuesto_reserva (presupuesto_id, reserva_id) VALUES (?,?)");
                $prepareInsert->bind_param('ss', $this->presupuestoId,$fila["reserva_id"]);    
                $prepareInsert->execute();
                $prepareInsert->close();
                
                $preparePrecio = $db->prepare("SELECT precio from recurso WHERE recurso_id in (SELECT recurso_id from reserva WHERE reserva_id = ?)");
                $preparePrecio->bind_param('s',$fila["reserva_id"]);
                $preparePrecio->execute();

                $precio = $preparePrecio->get_result();
                if ($precio->fetch_assoc()!=NULL) {
                    $precio->data_seek(0);
                    while($filaPrecio = $precio->fetch_assoc()) {
                        $reserva = new Reserva($fila["reserva_id"],$fila["recurso_id"],$fila["fecha_reserva"],$filaPrecio["precio"]);
                        array_push($this->reservas,$reserva);
                        $this->precio+=$filaPrecio["precio"];
                    }
                }
            }
            return $this->reservas;
        } else {
            echo "<p>Búsqueda sin resultados</p>";
        }

    }
}

?>
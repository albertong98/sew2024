<?php
    class Insert{
        const dbUser = 'DBUSER2024';
        const dbPassword = 'DBPSWD2024';
        const dbName = 'reservas';
        const host = 'localhost';
        
        public function connect(){
            $db = new mysqli(self::host,self::dbUser, self::dbPassword, self::dbName);
            
            if($db->connect_error) {
                echo "<p>ERROR de conexión:".$db->connect_error."</p>";
                exit();
            }

            return $db;
        }
        
        public function insertUser($record){
            $db = $this->connect();

            $prepare = $db->prepare("INSERT INTO user (nombre_usuario, pass) VALUES (?,?)");
            
            $username = $record->getUsername();
            $password = $record->getPassword();
            $prepare->bind_param('ss',$username,$password);    

            $prepare->execute();

            echo "<p>Ya puede iniciar sesión con su usuario: ".$username."</p>";
            
            $prepare->close();
    
            $db->close();
        }

        public function insertReserva($record){
            $db = $this->connect();

            $username = $record->getNombreUsuario();
            $fecha = $record->getFechaReserva();
            $recursoId = $record->getRecursoId();

            $limite = $db->prepare("SELECT limite_ocupacion FROM recurso where recurso_id = ?");
            $limite->bind_param('s', $recursoId);
            $limite->execute();
            $limiteResult = $limite->get_result();
            $limiteData = $limiteResult->fetch_assoc();

            $count = $db->prepare("SELECT COUNT(*) FROM recurso");
            $count->execute();
            $result = $count->get_result();
            $total=$result->fetch_assoc();
            
            if($total['total'] < $limiteData["limite_ocupacion"]){
                $prepare = $db->prepare("INSERT INTO reserva (username,recurso_id, fecha_reserva) VALUES (?,?,?)");
            
                $prepare->bind_param('sss', $username,$recursoId,$fecha);    

                $prepare->execute();

                echo "<p>Reserva agregada</p>";
            }else{
                echo "<p>Reservas al limite de ocupación</p>";
            }
            
            $prepare->close();
    
            $db->close();
        }

        public function insertPresupuesto($record){
            $db = $this->connect();

            $prepare = $db->prepare("INSERT INTO presupuesto (presupuesto_id,nombre_usuario,precio) VALUES (?,?,?)");
            $username =$record->getUsername();
            $precio = $record->getPrecio();
            $id=$record->getPresupuestoId();
            $prepare->bind_param('sss',$id,$username,$precio);
            $prepare->execute();
            
            $prepare->close();
            $db->close();
        }

        public function insertPresupuestoReserva($presupuesto_id,$reserva_id){
            $db = $this->connect();

            $prepare = $db->prepare("INSERT INTO presupuesto_reserva (presupuesto_id, reserva_id) VALUES (?,?)");
            
            $prepare->bind_param('ss', $presupuesto_id,$reserva_id);    

            $prepare->execute();
            
            $prepare->close();
    
            $db->close();
        }
    }                
?>

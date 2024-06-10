<?php
class Select{
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

    public function selectUser($username,$password){
        $db = $this->connect();

        $prepare = $db->prepare("SELECT * FROM user WHERE nombre_usuario = ? and pass = ?");
        
        $prepare->bind_param('ss',$username,$password);    
        $prepare->execute();
        $user = $prepare->get_result();

        return $user->fetch_assoc()!=NULL;
    }

    public function selectRecursos(){
        $db = $this->connect();

        $prepare = $db->prepare("SELECT * FROM recurso");
        $prepare->execute();

        $recursos = array();
        $result = $prepare->get_result();

        while($r = mysqli_fetch_assoc($result)) {
            $recursos[$r["nombre"]] = $r["recurso_id"];
        }

        return $recursos;
    }

    public function selectRecursosNombres(){
        $db = $this->connect();

        $prepare = $db->prepare("SELECT * FROM recurso");
        $prepare->execute();

        $recursos = array();
        $result = $prepare->get_result();

        while($r = mysqli_fetch_assoc($result)) {
            $recursos[$r["recurso_id"]] = $r["nombre"];
        }

        return $recursos;
    }

    public function selectNextAutoIncrementPresupuesto(){
        $db = $this->connect();
        $result=$db->query("SHOW TABLE STATUS LIKE 'presupuesto'");
        $row = $result->fetch_assoc();
        
        return $row['Auto_increment'];
    }
}
?>
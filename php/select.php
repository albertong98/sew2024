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

        $prepare = $db->prepare("SELECT * FROM user WHERE username = ? and pass = ?");
        
        $prepare->bind_param('ss',$username,$password);    

        $user = $prepare->get_result();

        return $user->fetch_assoc()!=NULL;
    }

    public function selectRecursos(){
        $db = $this->connect();

        $prepare = $db->prepare("SELECT * FROM recurso");
        
        $recursos = array();
        $result = $prepare->get_result();

        while($r = mysqli_fetch_assoc($result)) {
            $recursos[$r["nombre"]] = $r["recurso_id"];
        }

        return $recursos;
    }
}
?>
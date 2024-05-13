<?php
class Reserva {
    protected $reservaId;
    protected $nombre_usuario;
    protected $recursoId;
    protected $fechaReserva;

    public function __construct($nombre_usuario,$recursoId,$fechaReserva){
        $this->nombre_usuario = $nombre_usuario;
        $this->recursoId = $recursoId;
        $this->fechaReserva = $fechaReserva;
    }

    public function getReservaId(){
        return $this->reservaId;
    }

    public function getNombreUsuario(){
        return $this->nombre_usuario;
    }

    public function getRecursoId(){
        return $this->recursoId;
    }

    public function getFechaReserva(){
        return $this->fechaReserva;
    }
}
?>
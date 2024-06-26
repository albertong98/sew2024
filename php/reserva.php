<?php
class Reserva {
    protected $reservaId;
    protected $nombre_usuario;
    protected $recursoId;
    protected $fechaReserva;
    protected $precio;

    public function __construct($nombre_usuario,$recursoId,$fechaReserva,$precio){
        $this->nombre_usuario = $nombre_usuario;
        $this->recursoId = $recursoId;
        $this->fechaReserva = $fechaReserva;
        $this->precio = $precio;
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
    public function getPrecio(){
        return $this->precio;
    }
    public function getFechaReserva(){
        return $this->fechaReserva;
    }
}
?>
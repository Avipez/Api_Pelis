<?php

function recomendacion() {
    
    $clima = array("Cancun" => "Templado", "Monterrey" => "Frio", "Merida" => "Caluroso");
    
    $turismo = array("Cancun" => "Playas", "Monterrey" => "Compras", "Merida" => "Historico");
    
    $ubicacion = array("Cancun"=> "Sureste", "Monterrey" => "Norte", "Merida" => "Sureste");

    switch("clima") {
        case "clima":
            echo array_search("Frio", $clima );
        break;

        case "turismo":
            echo array_search("Playa", $turismo );
        break;

        case "ubicacion":
            echo array_search("Sureste", $ubicacion );
        break;
    }


};

recomendacion();



?>


<?php

$host = "localhost";
$username = "root";      
$password = "";         
$dbname = "bibliotheque";

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Erreur de connexion : " . $conn->connect_error);
}

$conn->set_charset("utf8");
?>

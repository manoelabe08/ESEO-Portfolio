<?php
session_start();

if (!isset($_SESSION["id"]) || $_SESSION["role"] !== "user") {
    header("Location: login.php");
    exit;
}
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Accueil Membre</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<h2>Bienvenue membre : <?php echo $_SESSION["username"]; ?></h2>

<ul class="menu">
    <li><a href="#">Annonces du club</a></li>
    <li><a href="#">Activités</a></li>
    <li><a href="deconnexion.php">Déconnexion</a></li>
</ul>

</body>
</html>

<?php
session_start();

if (!isset($_SESSION["id"]) || $_SESSION["role"] !== "admin") {
    header("Location: login.php");
    exit;
}
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Accueil Admin</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<h2>Bienvenue Admin : <?php echo $_SESSION["username"]; ?></h2>

<ul class="menu">
    <li><a href="#">Liste des membres</a></li>
    <li><a href="#">Annonces internes</a></li>
    <li><a href="deconnexion.php">Déconnexion</a></li>
</ul>

</body>
</html>

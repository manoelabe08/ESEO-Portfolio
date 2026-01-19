<?php
session_start();

if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'user') {
    header('Location: login.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Accueil Membre - Club Informatique</title>
    <link rel="stylesheet" href="style.css">
    <link rel="icon" type="image/x-icon" href="logo.png">
</head>
<body>
<div class="container">
    <h1>Bienvenue, <?= htmlspecialchars($_SESSION['username']) ?></h1>
    <nav>
        <ul>
            <li><a href="#">Annonces du club</a></li>
            <li><a href="#">Activités</a></li>
            <li><a href="deconnexion.php">Déconnexion</a></li>
        </ul>
    </nav>
    <p>Espace réservé aux membres du club informatique.</p>
</div>
</body>
</html>

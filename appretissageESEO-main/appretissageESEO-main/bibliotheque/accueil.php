<?php
include 'db.php';
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bibliothèque MANOEL ABE</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Bienvenue à la Bibliothèque MANOEL ABE</h1>

        <nav class="navbar">
            <ul>
                <li><a href="accueil.php">Accueil</a></li>
                <li><a href="liste.php">Liste des livres</a></li>
                <li><a href="ajouter.php">Ajouter un livre</a></li>
                <li><a href="supprimer.php">Supprimer un livre</a></li>
                <li><a href="rechercher.php">Rechercher un livre</a></li>
            </ul>
        </nav>

        <div class="content">
            <p>Bienvenue sur notre plateforme de gestion de la bibliothèque MANOEL ABE.</p><br>
            <p>Vous pouvez gérer les livres à partir du menu ci-dessus.</p>
        </div>
    </div>
</body>
</html>

<?php
include 'db.php';

$sql = "SELECT code, titre, pages, domaine,
        CONCAT(prenomA, ' ', nomA) AS auteur
        FROM livre
        JOIN auteur ON livre.codeAuteur = auteur.codeAuteur
        ORDER BY titre";
$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Liste des livres</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Liste des livres</h1>
        <nav class="navbar">
            <ul>
                <li><a href="accueil.php">Accueil</a></li>
                <li><a href="liste.php">Liste des livres</a></li>
                <li><a href="ajouter.php">Ajouter un livre</a></li>
                <li><a href="supprimer.php">Supprimer un livre</a></li>
                <li><a href="rechercher.php">Rechercher un livre</a></li>
            </ul>
        </nav>
        <?php
        if ($result->num_rows > 0) {
            echo "<table class='table'>";
            echo "<tr>";
            echo "<th>Code</th>";
            echo "<th>Titre</th>";
            echo "<th>Pages</th>";
            echo "<th>Domaine</th>";
            echo "<th>Auteur</th>";
            echo "</tr>";
            while ($row = $result->fetch_assoc()) {
                echo "<tr>";
                echo "<td>" . $row['code'] . "</td>";
                echo "<td>" . $row['titre'] . "</td>";
                echo "<td>" . $row['pages'] . "</td>";
                echo "<td>" . $row['domaine'] . "</td>";
                echo "<td>" . $row['auteur'] . "</td>";
                echo "</tr>";
            }
            echo "</table>";
        } else {
            echo "<p>Aucun livre trouvé.</p>";
        }
        $conn->close();
        ?>
    </div>
</body>
</html>

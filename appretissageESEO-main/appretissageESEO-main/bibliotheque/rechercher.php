<?php
include 'db.php';

$livres = [];
$recherche = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $recherche = $_POST['recherche'];

    if (!empty($recherche)) {
        $sql = "SELECT code, titre, pages, domaine,
                CONCAT(prenomA, ' ', nomA) AS auteur
                FROM livre
                JOIN auteur ON livre.codeAuteur = auteur.codeAuteur
                WHERE titre LIKE '%$recherche%'
                OR domaine LIKE '%$recherche%'
                ORDER BY titre";

        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $livres[] = $row;
            }
        }
    }
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rechercher un livre</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Rechercher un livre</h1>

        <nav class="navbar">
            <ul>
                <li><a href="accueil.php">Accueil</a></li>
                <li><a href="liste.php">Liste des livres</a></li>
                <li><a href="ajouter.php">Ajouter un livre</a></li>
                <li><a href="supprimer.php">Supprimer un livre</a></li>
                <li><a href="rechercher.php">Rechercher un livre</a></li>
            </ul>
        </nav>

        <form method="POST" class="form">
            <div class="form-group">
                <label for="recherche">Rechercher :</label>
                <input type="text" id="recherche" name="recherche"
                       placeholder="Titre ou domaine..."
                       value="<?= htmlspecialchars($recherche) ?>" required>
            </div>

            <button type="submit" class="btn">Rechercher</button>
        </form>

        <?php
        if (!empty($livres)) {
            echo "<h2>Résultats (" . count($livres) . " livre(s) trouvé(s))</h2>";
            echo "<table class='table'>";
            echo "<tr>";
            echo "<th>Code</th>";
            echo "<th>Titre</th>";
            echo "<th>Pages</th>";
            echo "<th>Domaine</th>";
            echo "<th>Auteur</th>";
            echo "</tr>";

            foreach ($livres as $livre) {
                echo "<tr>";
                echo "<td>" . $livre['code'] . "</td>";
                echo "<td>" . $livre['titre'] . "</td>";
                echo "<td>" . $livre['pages'] . "</td>";
                echo "<td>" . $livre['domaine'] . "</td>";
                echo "<td>" . $livre['auteur'] . "</td>";
                echo "</tr>";
            }
            echo "</table>";
        } elseif ($_SERVER['REQUEST_METHOD'] === 'POST' && empty($livres)) {
            echo "<p>Aucun livre trouvé pour '" . htmlspecialchars($recherche) . "'</p>";
        }

        $conn->close();
        ?>
    </div>
</body>
</html>

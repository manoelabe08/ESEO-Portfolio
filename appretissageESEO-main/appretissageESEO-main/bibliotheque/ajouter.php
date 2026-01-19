<?php
include 'db.php';


$sql_auteurs = "SELECT codeAuteur, nomA, prenomA FROM auteur ORDER BY nomA";
$result_auteurs = $conn->query($sql_auteurs);


$message = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $titre = $_POST['titre'];
    $pages = $_POST['pages'];
    $domaine = $_POST['domaine'];
    $codeAuteur = $_POST['codeAuteur'];


    if (empty($titre) || empty($pages) || empty($domaine) || empty($codeAuteur)) {
        $message = "Tous les champs sont obligatoires!";
    } else {

        $sql = "INSERT INTO livre (titre, pages, domaine, codeAuteur)
                VALUES ('$titre', $pages, '$domaine', '$codeAuteur')";

        if ($conn->query($sql) === TRUE) {
            $message = "Livre ajouté avec succès! Redirection...";
            echo "<script>setTimeout(function(){ window.location.href='liste.php'; }, 2000);</script>";
        } else {
            $message = "Erreur : " . $conn->error;
        }
    }
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ajouter un livre</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Ajouter un livre</h1>

        <nav class="navbar">
            <ul>
                <li><a href="accueil.php">Accueil</a></li>
                <li><a href="liste.php">Liste des livres</a></li>
                <li><a href="ajouter.php">Ajouter un livre</a></li>
                <li><a href="supprimer.php">Supprimer un livre</a></li>
                <li><a href="rechercher.php">Rechercher un livre</a></li>
            </ul>
        </nav>

        <?php if ($message): ?>
            <div class="message <?= strpos($message, 'reussi') ? 'success' : 'error' ?>">
                <?= $message ?>
            </div>
        <?php endif; ?>

        <form method="POST" class="form">
            <div class="form-group">
                <label for="titre">Titre :</label>
                <input type="text" id="titre" name="titre" required>
            </div>

            <div class="form-group">
                <label for="pages">Pages :</label>
                <input type="number" id="pages" name="pages" required>
            </div>

            <div class="form-group">
                <label for="domaine">Domaine :</label>
                <input type="text" id="domaine" name="domaine" placeholder="ex: Roman, Science-Fiction" required>
            </div>

            <div class="form-group">
                <label for="codeAuteur">Auteur :</label>
                <select id="codeAuteur" name="codeAuteur" required>
                    <option value="">-- Sélectionner un auteur --</option>
                    <?php
                    if ($result_auteurs->num_rows > 0) {
                        while ($row = $result_auteurs->fetch_assoc()) {
                            echo "<option value='" . $row['codeAuteur'] . "'>";
                            echo $row['prenomA'] . " " . $row['nomA'];
                            echo "</option>";
                        }
                    } else {
                        echo "<option value=''>Aucun auteur trouvé</option>";
                    }
                    ?>
                </select>
            </div>

            <button type="submit" class="btn">Ajouter</button>
        </form>
    </div>
</body>
</html>

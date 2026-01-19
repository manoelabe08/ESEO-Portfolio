<?php
include 'db.php';

$message = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $code = $_POST['code'];

    if (empty($code)) {
        $message = "Veuillez entrer le code du livre!";
    } else {
        $sql_check = "SELECT * FROM livre WHERE code = $code";
        $result_check = $conn->query($sql_check);

        if ($result_check->num_rows === 0) {
            $message = "Livre non trouvé!";
        } else {
            $sql = "DELETE FROM livre WHERE code = $code";

            if ($conn->query($sql) === TRUE) {
                $message = "Livre supprimé avec succès!";
            } else {
                $message = "Erreur : " . $conn->error;
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
    <title>Supprimer un livre</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Supprimer un livre</h1>

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
            <div class="message <?= strpos($message, 'Reussi') ? 'success' : 'error' ?>">
                <?= $message ?>
            </div>
        <?php endif; ?>

        <form method="POST" class="form">
            <div class="form-group">
                <label for="code">Code du livre :</label>
                <input type="number" id="code" name="code" placeholder="Entrez le code du livre" required>
            </div>

            <button type="submit" class="btn btn-danger">Supprimer</button>
        </form>
    </div>
</body>
</html>

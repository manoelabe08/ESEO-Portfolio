<?php
$host = 'localhost';
$user = 'root';
$password = '';
$dbname = 'miniprojet_bd';

$conn = mysqli_connect($host, $user, $password, $dbname);

if (!$conn) {
    die('Erreur de connexion : ' . mysqli_connect_error());
}

$sql = "SELECT * FROM jouets";
$result = mysqli_query($conn, $sql);
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Liste des jouets</title>
</head>
<body>
    <h1>Liste des jouets</h1>
    <table border="1">
        <tr>
            <th>Id</th>
            <th>Nom</th>
            <th>Description</th>
            <th>Prix</th>
            <th>Catégorie</th>
            <th>Image</th>
        </tr>
        <?php if (mysqli_num_rows($result) > 0): ?>
            <?php while ($row = mysqli_fetch_assoc($result)): ?>
                <tr>
                    <td><?= $row['id'] ?></td>
                    <td><?= htmlspecialchars($row['nom']) ?></td>
                    <td><?= htmlspecialchars($row['description']) ?></td>
                    <td><?= $row['prix'] ?> €</td>
                    <td><?= htmlspecialchars($row['categorie']) ?></td>
                    <td>
    <img src="images/<?= htmlspecialchars($row['image']) ?>" alt="<?= htmlspecialchars($row['nom']) ?>" width="80"> </td>

                </tr>
            <?php endwhile; ?>
        <?php else: ?>
            <tr>
                <td colspan="6">Aucun jouet trouvé.</td>
            </tr>
        <?php endif; ?>
    </table>

    <p><a href="index.php">Retour à l'accueil</a></p>
</body>

</html>

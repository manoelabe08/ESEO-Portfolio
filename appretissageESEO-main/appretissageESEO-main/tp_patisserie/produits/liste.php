<?php
require 'connexion.php';

$sql = "SELECT id, nom, prix, categorie, image FROM produits";
$stmt = $pdo->query($sql);
$produits = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Liste des produits</title>
    <link rel="stylesheet" href="../style.css">
</head>
<body>
<h1>Liste des pâtisseries</h1>

<nav>
    <a href="../index.html">Accueil</a>
    <a href="ajouter.php">Ajouter un produit</a>
</nav>

<table border="1" cellpadding="5">
    <tr>
        <th>ID</th>
        <th>Nom</th>
        <th>Prix (€)</th>
        <th>Catégorie</th>
        <th>Image</th>
        <th>Actions</th>
    </tr>
    <?php foreach ($produits as $p): ?>
        <tr>
            <td><?= htmlspecialchars($p['id']) ?></td>
            <td><?= htmlspecialchars($p['nom']) ?></td>
            <td><?= number_format($p['prix'], 2, ',', ' ') ?></td>
            <td><?= htmlspecialchars($p['categorie']) ?></td>
            <td>
                <?php if (!empty($p['image'])): ?>
                    <img src="../images/<?= htmlspecialchars($p['image']) ?>" alt="" width="80">
                <?php endif; ?>
            </td>
            <td>
                <a href="modifier.php?id=<?= $p['id'] ?>">Modifier</a> |
                <a href="supprimer.php?id=<?= $p['id'] ?>"
                   onclick="return confirm('Supprimer ce produit ?');">Supprimer</a>
            </td>
        </tr>
    <?php endforeach; ?>
</table>

</body>
</html>

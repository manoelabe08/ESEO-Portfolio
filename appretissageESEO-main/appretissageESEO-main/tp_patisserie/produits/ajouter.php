<?php
require 'connexion.php';

$message = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nom = $_POST['nom'] ?? '';
    $prix = $_POST['prix'] ?? '';
    $categorie = $_POST['categorie'] ?? '';
    $image = $_POST['image'] ?? '';

    if ($nom !== '' && $prix !== '') {
        $sql = "INSERT INTO produits (nom, prix, categorie, image)
                VALUES (:nom, :prix, :categorie, :image)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':nom' => $nom,
            ':prix' => $prix,
            ':categorie' => $categorie,
            ':image' => $image
        ]);
        $message = 'Produit ajouté avec succès.';
    } else {
        $message = 'Nom et prix sont obligatoires.';
    }
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Ajouter un produit</title>
    <link rel="stylesheet" href="../style.css">
</head>
<body>
<h1>Ajouter un produit</h1>

<nav>
    <a href="../index.html">Accueil</a>
    <a href="liste.php">Liste des produits</a>
</nav>

<?php if ($message): ?>
    <p><?= htmlspecialchars($message) ?></p>
<?php endif; ?>

<form method="post

<?php
require 'connexion.php';

if (!isset($_GET['id'])) {
    header('Location: liste.php');
    exit;
}

$id = (int) $_GET['id'];
$message = '';

// Récupération du produit existant
$sql = "SELECT * FROM produits WHERE id = :id";
$stmt = $pdo->prepare($sql);
$stmt->execute([':id' => $id]);
$produit = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$produit) {
    die('Produit introuvable.');
}

// Traitement du formulaire
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nom = $_POST['nom'] ?? '';
    $prix = $_POST['prix'] ?? '';
    $categorie = $_POST['categorie'] ?? '';
    $image = $_POST['image'] ?? '';

    if ($nom !== '' && $prix !== '') {
        $sql = "UPDATE produits
                SET nom = :nom, prix = :prix, categorie = :categorie, image = :image
                WHERE id = :id";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':nom' => $nom,
            ':prix' => $prix,
            ':categorie' => $categorie,
            ':image' => $image,
            ':id' => $id
        ]);
        $message = 'Produit modifié avec succès.';
        // Rafraîchir les données
        $produit['nom'] = $nom;
        $produit['prix'] = $prix;
        $produit['categorie'] = $categorie;
        $produit['image'] = $image;
    } else {
        $message = 'Nom et prix sont obligatoires.';
    }
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Modifier un produit</title>
    <link rel="stylesheet" href="../style.css">
</head>
<body>
<h1>Modifier un produit</h1>

<nav>
    <a href="../index.html">Accueil</a>
    <a href="liste.php">Liste des produits</a>
</nav>

<?php if ($message): ?>
    <p><?= htmlspecialchars($message) ?></p>
<?php endif; ?>

<form method="post">
    <label>Nom :</label>
    <input type="text" name="nom" value="<?= htmlspecialchars($produit['nom']) ?>" required><br><br>

    <label>Prix (€) :</label>
    <input type="number" name="prix" step="0.01"
           value="<?= htmlspecialchars($produit['prix']) ?>" required><br><br>

    <label>Catégorie :</label>
    <input type="text" name="categorie"
           value="<?= htmlspecialchars($produit['categorie']) ?>"><br><br>

    <label>Nom du fichier image :</label>
    <input type="text" name="image"
           value="<?= htmlspecialchars($produit['image']) ?>"><br><br>

    <button type="submit">Enregistrer les modifications</button>
</form>
</body>
</html>

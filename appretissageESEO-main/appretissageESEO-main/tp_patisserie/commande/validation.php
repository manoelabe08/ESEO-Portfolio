<?php
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: commander.html');
    exit;
}

$nomClient = $_POST['nomClient'] ?? '';
$produitBrut = $_POST['produit'] ?? '';
$quantite = (int) ($_POST['quantite'] ?? 0);
$livraison = isset($_POST['livraison']);

list($nomProduit, $prixUnitaire) = explode('|', $produitBrut);
$prixUnitaire = (float) $prixUnitaire;

$total = $prixUnitaire * $quantite;
if ($livraison) {
    $total += 2;
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Confirmation de commande</title>
    <link rel="stylesheet" href="../style.css">
</head>
<body>
<h1>Confirmation de commande</h1>

<p>Merci <?= htmlspecialchars($nomClient) ?> pour votre commande.</p>

<ul>
    <li>Produit : <?= htmlspecialchars($nomProduit) ?></li>
    <li>Quantité : <?= $quantite ?></li>
    <li>Prix unitaire : <?= number_format($prixUnitaire, 2, ',', ' ') ?> €</li>
    <li>Livraison : <?= $livraison ? 'Oui (+2 €)' : 'Non' ?></li>
    <li>Total à payer : <strong><?= number_format($total, 2, ',', ' ') ?> €</strong></li>
</ul>

<p><a href="../index.html">Retour à l’accueil</a></p>
</body>
</html>

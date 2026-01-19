<?php
$prix_sucre = [
    'pain_chocolat' => 1,
    'pain_raisin' => 2,
    'pain_suisse' => 3
];
$prix_sale = [
    'sandwich_poulet' => 4,
    'wrap_thon' => 3.50,
    'quiche_saumon' => 5
];
$nom = $_POST['nom'] ?? '';
$prenom = $_POST['prenom'] ?? '';
$sucre = $_POST['sucre'] ?? '';
$qty_sucre = intval($_POST['qty_sucre'] ?? 0);
$sale = $_POST['sale'] ?? '';
$qty_sale = intval($_POST['qty_sale'] ?? 0);
$montant_sucre = ($sucre && isset($prix_sucre[$sucre])) ? $prix_sucre[$sucre] * $qty_sucre : 0;
$montant_sale = ($sale && isset($prix_sale[$sale])) ? $prix_sale[$sale] * $qty_sale : 0;
$total = $montant_sucre + $montant_sale;
$noms_sucre = [
    'pain_chocolat' => 'Pain au Chocolat',
    'pain_raisin' => 'Pain au Raisin',
    'pain_suisse' => 'Pain Suisse'
];
$noms_sale = [
    'sandwich_poulet' => 'Sandwich Poulet',
    'wrap_thon' => 'Wrap au Thon',
    'quiche_saumon' => 'Quiche au Saumon'
];
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Récapitulatif Commande</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Récapitulatif de Votre Commande</h1>
        <div class="recap">
            <h2>Client</h2>
            <p><strong>Nom :</strong> <?= htmlspecialchars($nom) ?></p>
            <p><strong>Prénom :</strong> <?= htmlspecialchars($prenom) ?></p>
            <h2>Produits Sucrés</h2>
            <?php if ($qty_sucre > 0): ?>
                <p>
                    <strong><?= $noms_sucre[$sucre] ?></strong> × <?= $qty_sucre ?>
                    = <strong><?= $montant_sucre ?>€</strong>
                </p>
            <?php else: ?>
                <p>Aucun produit sucré</p>
            <?php endif; ?>
            <h2>Produits Salés</h2>
            <?php if ($qty_sale > 0): ?>
                <p>
                    <strong><?= $noms_sale[$sale] ?></strong> × <?= $qty_sale ?>
                    = <strong><?= $montant_sale ?>€</strong>
                </p>
            <?php else: ?>
                <p>Aucun produit salé</p>
            <?php endif; ?>
            <hr>
            <h2 class="total">Total : <?= number_format($total, 2) ?>€</h2>
            <div class="center">
                <a href="index.php" class="btn">Retour à l'accueil</a>
                <a href="commande.php" class="btn">Nouvelle commande</a>
            </div>
        </div>
    </div>
</body>
</html>

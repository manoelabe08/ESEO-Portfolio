<?php
include 'config.php';
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Produits Salés</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Nos Produits Salés</h1>
        <nav>
            <a href="index.php">Accueil</a>
            <a href="sucre.php">Sucrés</a>
            <a href="sale.php">Salés</a>
            <a href="commande.php" class="btn-primary">Commander</a>
        </nav>

        <div class="produits">
            <div class="produit-card">
                <h3>Sandwich Poulet</h3>
                <p class="prix">4€</p>
                <p class="description">Sandwich poulet frais et savoureux</p>
            </div>

            <div class="produit-card">
                <h3>Wrap au Thon</h3>
                <p class="prix">3,50€</p>
                <p class="description">Wrap délicieux au thon frais</p>
            </div>

            <div class="produit-card">
                <h3>Quiche au Saumon</h3>
                <p class="prix">5€</p>
                <p class="description">Quiche généreuse au saumon</p>
            </div>
        </div>

        <div class="center">
            <a href="commande.php" class="btn">Passer Commande</a>
        </div>
    </div>
</body>
</html>

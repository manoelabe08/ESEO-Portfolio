<?php
include 'config.php';
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Produits Sucrés</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Nos Produits Sucrés</h1>

        <nav>
            <a href="index.php">Accueil</a>
            <a href="sucre.php">Sucrés</a>
            <a href="sale.php">Salés</a>
            <a href="commande.php" class="btn-primary">Commander</a>
        </nav>

        <div class="produits">
            <div class="produit-card">
                <h3>Pain au Chocolat</h3>
                <p class="prix">1€</p>
                <p class="description">Délicieux pain au chocolat croustillant</p>
            </div>

            <div class="produit-card">
                <h3>Pain au Raisin</h3>
                <p class="prix">2€</p>
                <p class="description">Pain sucré aux raisins secs</p>
            </div>

            <div class="produit-card">
                <h3>Pain Suisse</h3>
                <p class="prix">3€</p>
                <p class="description">Traditionnel pain suisse savoureux</p>
            </div>
        </div>

        <div class="center">
            <a href="commande.php" class="btn">Passer Commande</a>
        </div>
    </div>
</body>
</html>

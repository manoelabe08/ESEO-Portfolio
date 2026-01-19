<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Passer Commande</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Passer une Commande</h1>
        <nav>
            <a href="index.php">ccueil</a>
            <a href="sucre.php">Sucrés</a>
            <a href="sale.php">Salés</a>
        </nav>
        <form method="POST" action="resultat.php" class="form-commande">
            <div class="form-group">
                <label for="nom">Nom :</label>
                <input type="text" id="nom" name="nom" placeholder="Votre nom" required>
            </div>
            <div class="form-group">
                <label for="prenom">Prénom :</label>
                <input type="text" id="prenom" name="prenom" placeholder="Votre prénom" required>
            </div>
            <h2>Produits Sucrés</h2>
            <div class="form-group">
                <label for="sucre">Choisir :</label>
                <select id="sucre" name="sucre" required>
                    <option value="">-- Sélectionner --</option>
                    <option value="pain_chocolat">Pain au Chocolat - 1€</option>
                    <option value="pain_raisin">Pain au Raisin - 2€</option>
                    <option value="pain_suisse">Pain Suisse - 3€</option>
                </select>
            </div>
            <div class="form-group">
                <label for="qty_sucre">Quantité :</label>
                <input type="number" id="qty_sucre" name="qty_sucre" min="0" max="5" value="0">
            </div>
            <h2>Produits Salés</h2>
            <div class="form-group">
                <label for="sale">Choisir :</label>
                <select id="sale" name="sale" required>
                    <option value="">-- Sélectionner --</option>
                    <option value="sandwich_poulet">Sandwich Poulet - 4€</option>
                    <option value="wrap_thon">Wrap au Thon - 3,50€</option>
                    <option value="quiche_saumon">Quiche au Saumon - 5€</option>
                </select>
            </div>
            <div class="form-group">
                <label for="qty_sale">Quantité :</label>
                <input type="number" id="qty_sale" name="qty_sale" min="0" max="5" value="0">
            </div>
            <button type="submit" class="btn">Commander</button>
        </form>
    </div>
</body>
</html>

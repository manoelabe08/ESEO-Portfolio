<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Commande</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Passez votre commande</h1>
    <form action="resultat.php" method="POST">
        <label>Nom: <input type="text" name="nom" required minlength="3"></label><br>
        <label>Prénom: <input type="text" name="prenom" required minlength="3"></label><br>

        <label>Nos Produits sucrés:</label>
        <select name="produit_sucre">
            <option value="pain_chocolat:1">Pain au chocolat (1€)</option>
            <option value="pain_raisin:2">Pain au raisin (2€)</option>
            <option value="pain_suisse:3">Pain suisse (3€)</option>
        </select>
        <label>Qté (0-5): <input type="number" name="qte_sucre" min="0" max="5" value="0"></label><br>

        <label>Nos Produits salés:</label>
        <select name="produit_sale">
            <option value="sandwich_poulet:4">Sandwich poulet (4€)</option>
            <option value="wrap_thon:3.5">Wrap au thon (3.5€)</option>
            <option value="quiche_saumon:5">Quiche au saumon (5€)</option>
        </select>
        <label>Qté (0-5): <input type="number" name="qte_sale" min="0" max="5" value="0"></label><br>

        <button type="submit">Commander</button>
    </form>
</body>
</html>

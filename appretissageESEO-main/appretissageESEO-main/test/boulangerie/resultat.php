<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Récapitulatif Client</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Récapitulatif de votre commande :</h1>
    <?php
    if ($_POST) {
        $nom = htmlspecialchars($_POST['nom']);
        $prenom = htmlspecialchars($_POST['prenom']);
        $produit_sucre = $_POST['produit_sucre'];
        $qte_sucre = (int)$_POST['qte_sucre'];
        $produit_sale = $_POST['produit_sale'];
        $qte_sale = (int)$_POST['qte_sale'];

        $erreurs = [];
        if (strlen($nom) < 3 || strlen($prenom) < 3) $erreurs[] = "Nom/Prénom doit faire ≥3 caractères";
        if ($qte_sucre > 5 || $qte_sale > 5) $erreurs[] = "Qté ≤5";

        if (!empty($erreurs)) {
            echo "<p style='color:red'>Erreurs: " . implode(', ', $erreurs) . "</p>";
            exit;
        }

        list($nom_sucre, $prix_sucre) = explode(':', $produit_sucre);
        list($nom_sale, $prix_sale) = explode(':', $produit_sale);

        $total_sucre = $prix_sucre * $qte_sucre;
        $total_sale = $prix_sale * $qte_sale;
        $total = $total_sucre + $total_sale;

        echo "<p>Client: $nom $prenom</p>";
        if ($qte_sucre > 0) echo "<p>Sucré: $nom_sucre x$qte_sucre = " . number_format($total_sucre, 2) . "€</p>";
        if ($qte_sale > 0) echo "<p>Salé: $nom_sale x$qte_sale = " . number_format($total_sale, 2) . "€</p>";
        echo "<p><strong>Total: " . number_format($total, 2) . "€</strong></p>";
    }
    ?>
    <a href="commande.php">Faire une autre commande</a>
</body>
</html>

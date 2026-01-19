<?php
session_start();

// Vérification user ou admin
if (!isset($_SESSION["id"])) {
    header("Location: login.php");
    exit;
}

$conn = new mysqli("localhost", "root", "", "tp_session");

$sql = "SELECT * FROM annonces ORDER BY date_pub DESC";
$result = $conn->query($sql);
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Annonces du club</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<h2>Annonces du club</h2>

<?php while($row = $result->fetch_assoc()): ?>
<div class="annonce">
    <h3><?= $row["titre"] ?></h3>
    <p><?= $row["contenu"] ?></p>
    <small>Publié le : <?= $row["date_pub"] ?></small>
</div>
<hr>
<?php endwhile; ?>

<br>
<?php if($_SESSION["role"] === "admin"): ?>
    <a href="accueil_admin.php">⬅ Retour Admin</a>
<?php else: ?>
    <a href="accueil_membre.php">⬅ Retour Membre</a>
<?php endif; ?>

</body>
</html>

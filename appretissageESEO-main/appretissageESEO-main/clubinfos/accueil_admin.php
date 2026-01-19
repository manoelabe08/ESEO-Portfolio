<?php
session_start();
require_once 'db.php';

if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'admin') {
    header('Location: login.php');
    exit;
}
$sql = "SELECT username, role FROM utilisateur ORDER BY role DESC, username ASC";
$stmt = $pdo->query($sql);
$users = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Accueil Page Admin - Club Informatique</title>
    <link rel="stylesheet" href="style.css">
    <link rel="icon" type="image/x-icon" href="logo.png">
</head>
<body>
<div class="container">
    <h1>Bienvenue, <?= htmlspecialchars($_SESSION['username']) ?></h1>
    <nav>
        <ul>
            <li><a href="#">Liste des membres</a></li>
            <li><a href="#">Annonces internes</a></li>
            <li><a href="deconnexion.php">Déconnexion</a></li>
        </ul>
    </nav>
<h2>Liste des membres du club</h2>
<table class="members-table">
    <thead>
        <tr>
            <th>Nom d'utilisateur</th>
            <th>Poste</th>
        </tr>
    </thead>
    <tbody>
    <?php foreach ($users as $u): ?>
        <tr>
            <td><?= htmlspecialchars($u['username']) ?></td>
            <td>
                <?php
                if ($u['role'] === 'admin') {
                    echo 'Membre du bureau de notre club';
                } else {
                    echo 'Membre simple';
                }
                ?>
            </td>
        </tr>
    <?php endforeach; ?>
    </tbody>
</table>
    <p>Zone réservée à l'administrateur du club Informatique.</p>
</div>
</body>
</html>




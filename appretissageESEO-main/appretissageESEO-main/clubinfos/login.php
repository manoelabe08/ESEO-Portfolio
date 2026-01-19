<?php
session_start();
require_once 'db.php';
$message = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';
    if ($username !== '' && $password !== '') {
        $sql = "SELECT * FROM utilisateur WHERE username = :username AND password = :password";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':username' => $username,
            ':password' => $password
        ]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($user) {
            $_SESSION['user_id']  = $user['id'];
            $_SESSION['username'] = $user['username'];
            $_SESSION['role']     = $user['role'];
            if ($user['role'] === 'admin') {
                header('Location: accueil_admin.php');
                exit;
            } else {
                header('Location: accueil_membre.php');
                exit;
            }
        } else {
            $message = "Identifiants incorrects.";
        }
    } else {
        $message = "Veuillez remplir tous les champs.";
    }
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Connexion - Club Informatique</title>
    <link rel="stylesheet" href="style.css">
    <link rel="icon" type="image/x-icon" href="logo.png">
</head>
<body>
<div class="container">
    <h1>Connexion</h1>
    <?php if ($message): ?>
        <p class="message"><?= htmlspecialchars($message) ?></p>
    <?php endif; ?>
    <form method="post" action="">
        <label>Nom d'utilisateur</label>
        <input type="text" name="username" required>
        <label>Mot de passe</label>
        <input type="password" name="password" required>
        <button type="submit">Se connecter</button>
    </form>
</div>
</body>
</html>

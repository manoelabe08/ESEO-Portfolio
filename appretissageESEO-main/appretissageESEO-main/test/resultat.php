<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Résultat connexion</title>
</head>
<body>
<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $login = $_POST['login'] ?? '';
    $password = $_POST['password'] ?? '';
    if ($login === 'admin' && $password === '123') {
        echo "<h1>Bienvenue, $login !</h1>";
    } else {
        echo "<h1>Erreur : identifiants incorrects.</h1>";
    }

} else {
    echo "<h1>Veuillez passer par le formulaire de connexion.</h1>";
}
?>
</body>
</html>

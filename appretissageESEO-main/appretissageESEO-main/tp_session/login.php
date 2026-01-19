<?php
session_start();

$host = "localhost";
$user = "root";
$pass = "";
$dbname = "tp_session";

$conn = new mysqli($host, $user, $pass, $dbname);

$message = "";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $username = $_POST["username"];
    $password = $_POST["password"];

    $sql = "SELECT * FROM utilisateur WHERE username = ? AND password = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $username, $password);
    $stmt->execute();

    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $user = $result->fetch_assoc();

        // Création de la session
        $_SESSION["id"] = $user["id"];
        $_SESSION["username"] = $user["username"];
        $_SESSION["role"] = $user["role"];

        // Redirection selon rôle
        if ($user["role"] === "admin") {
            header("Location: accueil_admin.php");
        } else {
            header("Location: accueil_membre.php");
        }
        exit;
    } else {
        $message = "Identifiants incorrects";
    }
}
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Connexion</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<h2>Connexion au Club Informatique</h2>

<form method="POST">
    <label>Nom d'utilisateur</label>
    <input type="text" name="username" required>

    <label>Mot de passe</label>
    <input type="password" name="password" required>

    <button type="submit">Se connecter</button>
</form>

<p class="message"><?php echo $message; ?></p>

</body>
</html>

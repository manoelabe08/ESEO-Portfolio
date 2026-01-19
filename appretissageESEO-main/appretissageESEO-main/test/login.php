<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Connexion</title>
    <script>
    function mdp(){
        if (document.getElementById('identifiant').value == 'Admin' && document.getElementsByid('MotsDePasse')[0].value == '1234'){
            return (document.getElementById('identifiant'));
        }
        else{
            return ('Identifiant ou Mots de passe incorrect');
        }
    }
</script>
</head>
<body>
    <h1>Formulaire de connexion</h1>
    <form action="resultat.php" method="POST">
        <label for="login">Login :</label>
        <input type="text" name="login" id="login" required><br><br>

        <label for="password">Mot de passe :</label>
        <input type="password" name="password" id="password" required value="abegouanfoboul"><br><br>

        <input type="submit" value="Se connecter">
    </form>
</body>
</html>



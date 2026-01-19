<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Page non trouvée | Apprentissage MANOEL ABE</title>
    <link rel="stylesheet" href="/css/style-global.css">
    <style>
        .error-404{
            min-height:70vh;
            display:flex;
            align-items:center;
            justify-content:center;
        }
        .error-box{
            text-align:center;
            max-width:600px;
            padding:2rem;
            background:#ecf0f1;
            border-radius:10px;
            box-shadow:0 10px 30px rgba(0,0,0,0.15);
        }
        .error-code{
            font-size:5rem;
            font-weight:800;
            color:#e74c3c;
            margin-bottom:0.5rem;
        }
        .error-title{
            font-size:1.8rem;
            margin-bottom:1rem;
        }
        .error-text{
            color:#7f8c8d;
            margin-bottom:2rem;
        }
    </style>
</head>
<body>
<header class="header">
    <nav class="navbar">
        <div class="navbar-brand">
            <h1>Apprentissage MANOEL ABE</h1>
        </div>
        <ul class="navbar-menu">
            <li><a href="/index.html">Accueil</a></li>
            <li><a href="/index.html#projets">Projets</a></li>
        </ul>
    </nav>
</header>

<section class="error-404">
    <div class="error-box">
        <div class="error-code">404</div>
        <div class="error-title">Oups, page introuvable</div>
        <p class="error-text">
            La page que vous cherchez n’existe pas ou a été déplacée.<br>
            Utilisez le bouton ci‑dessous pour revenir au portail d’apprentissage.
        </p>
        <a href="/index.html" class="btn btn-primary">← Retour au portail</a>
    </div>
</section>

<footer class="footer">
    <div class="container">
        <p>
            &copy;
            <script>
                const startYear = 2025;
                const currentYear = new Date().getFullYear();
                document.write(
                    startYear === currentYear
                        ? "ESEO-" + startYear
                        : "ESEO-" + startYear + " - " + currentYear
                );
            </script>
            | Projet d'Apprentissage web de MANOEL ABE |
            3<sup>ème</sup> année Ingénieur ESEO - Paris Vélizy |<br>
            Tous droits réservés – reproduction interdite sans mention de la source.
        </p>
    </div>
</footer>
</body>
</html>

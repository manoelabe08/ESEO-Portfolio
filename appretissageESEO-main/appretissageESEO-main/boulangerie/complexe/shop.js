
const form = document.getElementById('commandeForm');
const resultatDiv = document.getElementById('resultat');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nom = document.getElementById('nom').value.trim();
    const emballage = document.getElementById('emballage').checked;

    const produitsCoches = document.querySelectorAll('input[name="produits"]:checked');

    let erreur = false;
    let message = '';

    if (nom === '') {
        message = 'Veuillez entrer votre nom!';
        erreur = true;
    }

    if (produitsCoches.length === 0) {
        message = 'Veuillez sélectionner au moins un produit!';
        erreur = true;
    }

    if (erreur) {
        resultatDiv.textContent = message;
        resultatDiv.className = 'resultat error';
        return;
    }

    let total = 0;
    let detailsCommande = `<strong>Commande de ${nom}</strong><br><br>`;

    produitsCoches.forEach(produit => {
        const nom_produit = produit.value;
        const prix = parseFloat(produit.dataset.prix);
        const id_quantite = 'qty-' + nom_produit;
        const quantite = parseInt(document.getElementById(id_quantite).value) || 1;
        const soustotal = prix * quantite;

        total += soustotal;
        detailsCommande += `${nom_produit} × ${quantite} = ${soustotal}€<br>`;
    });

    if (emballage) {
        total += 0.50;
        detailsCommande += `<br>Emballage cadeau = +0,50€`;
    }

    detailsCommande += `<br><br><strong style="font-size: 24px; color: green;"> Total : ${total.toFixed(2)}€</strong>`;

    resultatDiv.innerHTML = detailsCommande;
    resultatDiv.className = 'resultat success';

    console.log('Commande:', { nom, total, emballage });
});

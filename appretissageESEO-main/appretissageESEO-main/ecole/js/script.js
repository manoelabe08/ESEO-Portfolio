
function calculerDevis() {
    let participants = document.getElementById("participants").value;

    if (!document.getElementById("dev").checked &&
        !document.getElementById("design").checked &&
        !document.getElementById("marketing").checked) {
        alert("Veuillez sélectionner une formation !");
        return;
    }
    let prix = 0;
    if (document.getElementById("dev").checked) {
        prix = 1000;
    } else if (document.getElementById("design").checked) {
        prix = 800;
    } else if (document.getElementById("marketing").checked) {
        prix = 1200;
    }

    if (document.getElementById("soir").checked) {
        prix = prix * 1.1;
    }

    let total = prix * participants;

    document.getElementById("resultat").innerHTML =
        "Le devis total est de <strong>" + total.toFixed(2) + " €</strong>.";
}

console.log("Script JavaScript chargé avec succès !");

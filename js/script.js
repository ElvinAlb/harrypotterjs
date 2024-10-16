

async function loadData(house = "all") {
    const response = await fetch("https://hp-api.onrender.com/api/characters");
    const listChara = await response.json();

    // Filtrer les personnages par maison
    let newListChara = house !== "all" ? listChara.filter(chara => chara.house === house) : listChara;

    let i = 0;
    const conteneur = document.getElementById('potterCharacters');
    conteneur.innerHTML = ''; // Vider le conteneur avant de charger les nouveaux personnages

    // Ajouter les personnages filtrés
    for (const chara of newListChara) {
        if (i < 12) {
            conteneur.innerHTML += `
                <div class="${chara.house}">
                    <img src="${chara.image}" alt="${chara.name}">
                    <p>${chara.name}</p>
                </div>`;
            i++;
        }
    }
}

// Fonction pour filtrer par maison
async function addFilterHouse(event) {
    const idHouse = event.currentTarget.id; // Récupérer l'ID de l'élément cliqué
    console.log(idHouse); // Afficher l'ID dans la console
    loadData(idHouse); // Charger les personnages pour cette maison
}

// Charger les personnages par défaut et ajouter les listeners aux maisons
document.addEventListener("DOMContentLoaded", () => {
    loadData(); // Charger tous les personnages au chargement de la page

    // Récupérer tous les éléments de maison
    const elements = document.getElementsByClassName("house_select");

    // Parcourir chaque élément et ajouter un écouteur d'événement "click"
    for (let element of elements) {
        element.addEventListener("click", addFilterHouse); // Ajouter l'écouteur sans exécuter la fonction
    }
});
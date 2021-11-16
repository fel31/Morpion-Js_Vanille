// On charge les informations utiles
const statut = document.querySelector("h2")
let jeuActif = true
let joueurActif = "X"
let etatJeu = ["", "", "", "", "", "", "", "", ""]

// On définit les conditions de victoire dans un tableau par rapport aux index data-index
const conditionsVictoire = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

// Creation de fonctions pour les messages qui vont s'afficher
const gagne = () => `Le joueur ${joueurActif} a gagné`
const egalite = () => "Egalité"
const tourJoueur = () => `C'est au tour du joueur ${joueurActif}`



// On affiche quel joueur commence dans la h2 cf ligne 1 const statut 
statut.innerHTML = tourJoueur()

// On met en place les écouteurs d'évènements
document.querySelectorAll(".case").forEach(cell => cell.addEventListener("click", gestionClicCase)) //ici cell = case mais case est un mot réservé, du coup sur chaque cellule on fait un addeventlistener qui executera gestionclicCase
document.querySelector("#recommencer").addEventListener("click", recommencer) //chercher le bouton qui fait addeventlistener et qui exécutera recommencé

/**
 * Cette fonction gère le clic sur les cases du jeu
 */
function gestionClicCase() {
    // On récupère l'index de la case cliquée en lisant les attributs data
    const indexCase = parseInt(this.dataset.index) //parseInt car je dois récupérer entier
    // console.log(this.dataset.index); affiche les valeurs des data-index au CLICK !!!!
  
  
    // On vérifie si la case est déjà remplie ou le jeu terminé
    if (etatJeu[indexCase] !== "" || !jeuActif) {
        return //je fais rien 
    }

    // On écrit le symbole du joueur dans le tableau etatJeu et la case
    etatJeu[indexCase] = joueurActif //dans etat jeu à l'indexCase j'écris l'état du joueurActif, Attention il faut cliquer !!! donc je stocke l'état actuel du jeu, faire console.log et test
    this.innerHTML = joueurActif //this c'est la case cliqué //ici j'ecris joueurActif soit X soit O

    // On vérifie si le joueur a gagnéFor
    verifGagne()
}

/**
 * Cette fonction vérifie si le joueur a gagné
 */
function verifGagne() {
    let tourGagnant = false

    // On parcourt toutes les conditions de victoire
    for (let conditionVictoire of conditionsVictoire) {
        // On récupère les 3 cases de la condition de victoire
        let val1 = etatJeu[conditionVictoire[0]]
        let val2 = etatJeu[conditionVictoire[1]]
        let val3 = etatJeu[conditionVictoire[2]]

        // Si l'une des cases est vide   //attention if 1 false alors on passe au second etc..
        if (val1 === "" || val2 === "" || val3 === "") {
            continue
        }
        //si if en haut false
        // Si les 3 cases sont identiques
        if (val1 === val2 && val2 === val3) {
            // On gagne
            tourGagnant = true
            break
        }
    }

    // Si on a gagné
    if (tourGagnant) {
        statut.innerHTML = gagne() //je met mon statut à gagné
        jeuActif = false  ///j'arrete le jeu 
        return
    }

    //si if avant false alors 
    // Si toutes les cases sont remplies
    if (!etatJeu.includes("")) {
        statut.innerHTML = egalite() //je passe à un égalité 
        jeuActif = false
        return
    }

    // On change de joueur
    joueurActif = joueurActif === "X" ? "O" : "X" //condition terniaire : joueur X ? alors joueur 0 : sinn Joueur X
    statut.innerHTML = tourJoueur()
}

/**
 * Cette fonction réinitialise le jeu
 */
function recommencer() {
    joueurActif = "X"
    jeuActif = true
    etatJeu = ["", "", "", "", "", "", "", "", ""]
    statut.innerHTML = tourJoueur()
    document.querySelectorAll(".case").forEach(cell => cell.innerHTML = "") //ici j'efface toutes mes cases. 
}

//fonction recommencée réinitaitlise toutes les variables 

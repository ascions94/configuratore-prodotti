/* =========================================
   SUBLIMAMI - HOME PAGE
   ========================================= */

/* Menu a tendina su tablet e smartphone */
const menuToggle = document.getElementById("menuToggle");
const homeNav = document.getElementById("homeNav");

function closeMenu() {
    homeNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Apri menu");
}

menuToggle.addEventListener("click", function () {
    const isOpen = homeNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Chiudi menu" : "Apri menu");
});

/* Chiude il menu quando si sceglie una voce */
homeNav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeMenu();
    }
});


/* Ombra sotto l'header quando si scorre la pagina */
const homeHeader = document.getElementById("homeHeader");

function updateHeaderShadow() {
    homeHeader.classList.toggle("scrolled", window.scrollY > 8);
}

window.addEventListener("scroll", updateHeaderShadow, { passive: true });
updateHeaderShadow();


/*
   Numero di articoli nel carrello.
   Il carrello è salvato dal configuratore con la chiave "mycustomCart":
   qui lo leggiamo soltanto, senza modificarlo.
*/
function updateHomeCartCount() {
    let count = 0;

    try {
        const items = JSON.parse(localStorage.getItem("mycustomCart")) || [];

        count = items.reduce(function (total, item) {
            return total + (Number(item.quantity) || 1);
        }, 0);
    } catch (error) {
        count = 0;
    }

    document.getElementById("homeCartCount").textContent = count;
}

updateHomeCartCount();

/* Si aggiorna anche se il carrello cambia in un'altra scheda */
window.addEventListener("storage", function (event) {
    if (event.key === "mycustomCart") {
        updateHomeCartCount();
    }
});


/* Anno corrente nel footer */
document.getElementById("currentYear").textContent = new Date().getFullYear();

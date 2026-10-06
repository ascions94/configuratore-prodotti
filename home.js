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


/* =========================================
   CONTATTI E SPEDIZIONI DA site-config.js
   =========================================
   Gli elementi con data-contact="email|whatsapp|instagram|tiktok"
   diventano link veri; quelli con data-contact-value mostrano il dato;
   quelli con data-ship="..." mostrano le informazioni di spedizione.
   Se un dato manca, compare l'etichetta "da completare".
*/
const siteData = window.SUBLIMAMI || {};
const contactData = siteData.contatti || {};
const shippingData = siteData.spedizioni || {};

function createTodoBadge() {
    const badge = document.createElement("em");
    badge.className = "todo";
    badge.textContent = "da completare";
    return badge;
}

const contactLinks = {
    email: function (value) { return "mailto:" + value; },
    whatsapp: function (value) { return "https://wa.me/" + value.replace(/\D/g, ""); },
    instagram: function (value) { return "https://www.instagram.com/" + value.replace(/^@/, "") + "/"; },
    tiktok: function (value) { return "https://www.tiktok.com/@" + value.replace(/^@/, ""); }
};

const contactLabels = {
    email: function (value) { return value; },
    whatsapp: function (value) {
        const digits = value.replace(/\D/g, "");

        /* Numero italiano: +39 334 227 4606 */
        if (digits.length === 12 && digits.startsWith("39")) {
            return "+39 " + digits.slice(2, 5) + " " + digits.slice(5, 8) + " " + digits.slice(8);
        }

        return "+" + digits;
    },
    instagram: function (value) { return "@" + value.replace(/^@/, ""); },
    tiktok: function (value) { return "@" + value.replace(/^@/, ""); }
};

document.querySelectorAll("[data-contact]").forEach(function (link) {
    const key = link.dataset.contact;
    const value = String(contactData[key] || "").trim();

    if (value && contactLinks[key]) {
        link.href = contactLinks[key](value);

        if (key !== "email") {
            link.target = "_blank";
            link.rel = "noopener";
        }
        return;
    }

    link.removeAttribute("href");
    link.classList.add("is-missing");
    link.setAttribute("aria-disabled", "true");

    if (!link.querySelector(".todo")) {
        link.appendChild(createTodoBadge());
    }
});

document.querySelectorAll("[data-contact-value]").forEach(function (element) {
    const key = element.dataset.contactValue;
    const value = String(contactData[key] || "").trim();

    element.textContent = "";

    if (value && contactLabels[key]) {
        element.textContent = contactLabels[key](value);
    } else {
        element.appendChild(createTodoBadge());
    }
});

document.querySelectorAll("[data-ship]").forEach(function (element) {
    const value = String(shippingData[element.dataset.ship] || "").trim();

    element.textContent = "";

    if (value) {
        element.textContent = value;
    } else {
        element.appendChild(createTodoBadge());
    }
});


/* Schede facoltative (es. "Spedizione gratuita da"): se il dato manca, la scheda non si mostra */
document.querySelectorAll("[data-ship-optional]").forEach(function (card) {
    const value = String(shippingData[card.dataset.shipOptional] || "").trim();
    card.hidden = !value;
});


/* Barra annunci in alto: se c'è la spedizione gratuita, la annuncia su tutte le pagine */
const announcementBar = document.querySelector(".announcement-bar");
const freeShippingFrom = String(shippingData.gratisDa || "").trim();

if (announcementBar && freeShippingFrom) {
    announcementBar.textContent =
        "Spedizione gratuita per ordini sopra " + freeShippingFrom +
        " · Ritiro in Locker e InPost Point";
}

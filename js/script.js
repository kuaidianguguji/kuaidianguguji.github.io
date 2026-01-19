// Translation Database
const translations = {
    en: {
        "nav.home": "Home",
        "nav.product": "Product",
        "nav.about": "About",
        "hero.title": "Video Introductions",
        "prod.title": "J0222A Professional Series",
        "prod.comp": "Company",
        "prod.brand": "Brand",
        "prod.manuf": "Product Link",
        "prod.pkg_size": "Package Size",
        "prod.item_size": "Item Size",
        "prod.weight": "Weight",
        "prod.color": "Color",
        "prod.special": "Special Feature",
        "prod.feat_desc": "Ergonomic Design",
        "prod.model": "Model",
        "footer.desc": "Premium aesthetic experiences tailored for the European market.",
        "about.title": "Our Story",
        "about.desc": "MANIPURA SIA is dedicated to bringing premium aesthetic designs and ergonomic innovation to the European market. Our focus is quality and the seamless integration of technology and lifestyle."
    },
    de: {
        "nav.home": "Startseite",
        "nav.product": "Produkte",
        "nav.about": "Über uns",
        "hero.title": "Video-Einführungen",
        "prod.title": "J0222A Profi-Serie",
        "prod.comp": "Firma",
        "prod.brand": "Marke",
        "prod.manuf": "Link zum Produkt",
        "prod.pkg_size": "Verpackungsgröße",
        "prod.item_size": "Produktgröße",
        "prod.weight": "Gewicht",
        "prod.color": "Farbe",
        "prod.special": "Besonderheit",
        "prod.feat_desc": "Ergonomisches Design",
        "prod.model": "Modell",
        "footer.desc": "Hochwertige ästhetische Erlebnisse für den europäischen Markt.",
        "about.title": "Unsere Geschichte",
        "about.desc": "MANIPURA SIA widmet sich hochwertigen Designs und ergonomischer Innovation für den europäischen Markt."
    },
    fr: {
        "nav.home": "Accueil",
        "nav.product": "Produit",
        "nav.about": "À propos",
        "hero.title": "Vidéos de présentation",
        "prod.title": "Série Professionnelle J0222A",
        "prod.comp": "Société",
        "prod.brand": "Marque",
        "prod.manuf": "Lien vers le produit",
        "prod.pkg_size": "Taille du paquet",
        "prod.item_size": "Taille de l'article",
        "prod.weight": "Poids",
        "prod.color": "Couleur",
        "prod.special": "Caractéristique",
        "prod.feat_desc": "Design Ergonomique",
        "prod.model": "Modèle",
        "footer.desc": "Expériences esthétiques premium pour le marché européen.",
        "about.title": "Notre Histoire",
        "about.desc": "MANIPURA SIA se consacre à l'innovation ergonomique et au design esthétique pour le marché européen."
    },
    es: {
        "nav.home": "Inicio",
        "nav.product": "Producto",
        "nav.about": "Nosotros",
        "hero.title": "Introducción en video",
        "prod.title": "Serie Profesional J0222A",
        "prod.comp": "Empresa",
        "prod.brand": "Marca",
        "prod.manuf": "Enlace al producto",
        "prod.pkg_size": "Tamaño del paquete",
        "prod.item_size": "Tamaño del artículo",
        "prod.weight": "Peso",
        "prod.color": "Color",
        "prod.special": "Característica",
        "prod.feat_desc": "Diseño Ergonómico",
        "prod.model": "Modelo",
        "footer.desc": "Experiencias estéticas premium para el mercado europeo.",
        "about.title": "Nuestra Historia",
        "about.desc": "MANIPURA SIA se dedica a traer diseños estéticos premium e innovación ergonómica al mercado europeo."
    },
    it: {
        "nav.home": "Home",
        "nav.product": "Prodotto",
        "nav.about": "Chi Siamo",
        "hero.title": "Video Introduttivi",
        "prod.title": "Serie Professionale J0222A",
        "prod.comp": "Azienda",
        "prod.brand": "Marca",
        "prod.manuf": "Collegamento al prodotto",
        "prod.pkg_size": "Dimensione confezione",
        "prod.item_size": "Dimensione articolo",
        "prod.weight": "Peso",
        "prod.color": "Colore",
        "prod.special": "Caratteristica",
        "prod.feat_desc": "Design Ergonomico",
        "prod.model": "Modello",
        "footer.desc": "Esperienze estetiche premium per il mercato europeo.",
        "about.title": "La Nostra Storia",
        "about.desc": "MANIPURA SIA si dedica a portare design estetico premium e innovazione ergonomica nel mercato europeo."
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // 1. Language Logic
    const langBtn = document.getElementById('langBtn');
    const langMenu = document.getElementById('langMenu');
    const currentFlag = document.getElementById('currentFlag');

    // Toggle Menu
    if (langBtn && langMenu) {
        langBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            langMenu.classList.toggle('active');
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', () => {
        if (langMenu) langMenu.classList.remove('active');
    });

    // Handle Language Selection
    document.querySelectorAll('.lang-option').forEach(option => {
        option.addEventListener('click', () => {
            const selectedLang = option.getAttribute('data-lang');
            const selectedFlag = option.querySelector('.flag')?.innerText;

            if (currentFlag && selectedFlag) currentFlag.innerText = selectedFlag;
            changeLanguage(selectedLang);
        });
    });

    // 2. Mobile Menu Logic (index/about)
    const burger = document.getElementById('burger');
    const drawer = document.getElementById('mobileDrawer');
    if (burger && drawer) {
        burger.addEventListener('click', () => {
            drawer.classList.toggle('open');
            burger.innerHTML = drawer.classList.contains('open')
                ? '<i class="fas fa-times"></i>'
                : '<i class="fas fa-bars"></i>';
        });
    }
});

function changeLanguage(lang) {
    const data = translations[lang];
    if (!data) return;

    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (data[key]) element.innerText = data[key];
    });
}

// Optional: keep for future “copy contact” usage (no buttons currently call this)
function copyContact() {
    const info = "Email: laura_zalmane@manipurasia.com | Tel: +44 7897001267";
    navigator.clipboard.writeText(info).then(() => {
        alert("Contact details copied to clipboard!");
    });
}

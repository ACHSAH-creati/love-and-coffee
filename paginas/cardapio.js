const franchises = {
    paulista: {
        name: "Love&Coffee Paulista",
        products: [
            { name: "Café expresso", description: "Um café intenso para acompanhar a correria da cidade.", image: "café expresso" },
            { name: "Sanduíche", description: "Uma opção saborosa para fazer uma pausa durante o dia.", image: "sanduiche" },
            { name: "Bolo de chocolate com frutas vermelhas", description: "Bolo de chocolate coberto com frutas vermelhas.", image: "bolo de chocolate com frutas vermelha" },
            { name: "Misto quente", description: "Um sanduíche quentinho para acompanhar seu café.", image: "Misto quente" }
        ]
    },
    rio: {
        name: "Love&Coffee RIO",
        products: [
            { name: "Coxinha", description: "Um salgado clássico para acompanhar sua pausa.", image: "coxinha" },
            { name: "Café gelado", description: "Uma bebida refrescante para os dias ensolarados.", image: "café gelado" },
            { name: "Bolo de chocolate", description: "Uma fatia macia para deixar o momento mais doce.", image: "bolo de chocolate" },
            { name: "Misto quente", description: "Um sanduíche quentinho para acompanhar seu café.", image: "Misto quente" }
        ]
    },
    minas: {
        name: "Love&Coffee Minas",
        products: [
            { name: "Pão de queijo", description: "Um quitute mineiro para acompanhar seu café.", image: "pão de queijo" },
            { name: "Café quente", description: "Café quentinho para aproveitar com calma.", image: "cafe quente" },
            { name: "Bolo de milho com goiabada", description: "Bolo de milho com um toque doce de goiabada.", image: "bolo de milho com goiabada" },
            { name: "Misto quente", description: "Um sanduíche quentinho para acompanhar seu café.", image: "Misto quente" }
        ]
    }
};

const franchiseButtons = document.querySelectorAll(".franchise-option");
const menuSection = document.querySelector("#franchise-menu");
const menuTitle = document.querySelector("#franchise-menu-title");
const productList = document.querySelector("#franchise-products");

function createProductCard(product) {
    const card = document.createElement("article");
    card.className = "franchise-product";

    const picture = document.createElement("picture");
    for (const size of ["P", "M"]) {
        const source = document.createElement("source");
        source.media = size === "P" ? "(max-width: 600px)" : "(max-width: 1024px)";
        source.srcset = `../midias/${encodeURIComponent(`${product.image} ${size}.jpg`)}`;
        picture.append(source);
    }

    const image = document.createElement("img");
    image.src = `../midias/${encodeURIComponent(`${product.image} G.jpg`)}`;
    image.alt = product.name;
    image.loading = "lazy";
    picture.append(image);

    const details = document.createElement("div");
    details.className = "franchise-product-details";
    const name = document.createElement("h3");
    name.textContent = product.name;
    const description = document.createElement("p");
    description.textContent = product.description;
    details.append(name, description);
    card.append(picture, details);

    return card;
}

function showFranchise(franchiseId) {
    const franchise = franchises[franchiseId];
    if (!franchise) {
        return;
    }

    menuTitle.textContent = franchise.name;
    productList.replaceChildren(...franchise.products.map(createProductCard));
    menuSection.hidden = false;

    for (const button of franchiseButtons) {
        button.setAttribute("aria-pressed", String(button.dataset.franchise === franchiseId));
    }
}

for (const button of franchiseButtons) {
    button.addEventListener("click", () => showFranchise(button.dataset.franchise));
}

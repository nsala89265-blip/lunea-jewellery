/* =========================================================
   LUNEA — WISHLIST
========================================================= */

let wishlist = JSON.parse(
    localStorage.getItem("luneaWishlist")
) || [];


/* =========================================================
   SAVE
========================================================= */

function saveWishlist() {

    localStorage.setItem(
        "luneaWishlist",
        JSON.stringify(wishlist)
    );

}


/* =========================================================
   TOGGLE
========================================================= */

function toggleWishlist(productId) {

    const index =
        wishlist.indexOf(productId);

    if (index === -1) {

        wishlist.push(productId);

    } else {

        wishlist.splice(index, 1);

    }

    saveWishlist();

    renderWishlist();
    renderProducts(
        document.querySelector(
            ".filter-button.active"
        )?.dataset.filter || "all"
    );

}


/* =========================================================
   CHECK
========================================================= */

function isWishlisted(productId) {

    return wishlist.includes(productId);

}


/* =========================================================
   RENDER
========================================================= */

function renderWishlist() {

    const container =
        document.getElementById("wishlistItems");

    const empty =
        document.getElementById("wishlistEmpty");

    if (!container) return;

    container.innerHTML = "";

    if (wishlist.length === 0) {

        empty.classList.add("active");

        return;

    }

    empty.classList.remove("active");

    wishlist.forEach(id => {

        const product =
            products.find(
                item => item.id === id
            );

        if (!product) return;

        const element =
            document.createElement("div");

        element.className = "wishlist-item";

        element.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.name}"
            >

            <div>

                <h4>
                    ${product.name}
                </h4>

                <p>
                    ${product.price} zł
                </p>

            </div>

            <button
                class="remove-item"
                onclick="toggleWishlist(${product.id})"
            >
                ×
            </button>

        `;

        container.appendChild(element);

    });

}


/* =========================================================
   OPEN
========================================================= */

function openWishlist() {

    document
        .getElementById("wishlistPanel")
        .classList.add("active");

    document
        .getElementById("wishlistOverlay")
        .classList.add("active");

    document.body.classList.add("no-scroll");

    renderWishlist();

}


/* =========================================================
   CLOSE
========================================================= */

function closeWishlist() {

    document
        .getElementById("wishlistPanel")
        .classList.remove("active");

    document
        .getElementById("wishlistOverlay")
        .classList.remove("active");

    document.body.classList.remove("no-scroll");

}


/* =========================================================
   INIT
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        document
            .getElementById("wishlistButton")
            ?.addEventListener(
                "click",
                openWishlist
            );

        document
            .getElementById("mobileWishlistButton")
            ?.addEventListener(
                "click",
                openWishlist
            );

        document
            .getElementById("mobileWishlistMenuButton")
            ?.addEventListener(
                "click",
                openWishlist
            );

        document
            .getElementById("closeWishlist")
            ?.addEventListener(
                "click",
                closeWishlist
            );

        document
            .getElementById("wishlistOverlay")
            ?.addEventListener(
                "click",
                closeWishlist
            );

    }
);
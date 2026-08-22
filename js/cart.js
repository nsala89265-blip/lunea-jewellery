/* =========================================================
   LUNEA — CART
========================================================= */

let cart = JSON.parse(
    localStorage.getItem("luneaCart")
) || [];


/* =========================================================
   SAVE
========================================================= */

function saveCart() {

    localStorage.setItem(
        "luneaCart",
        JSON.stringify(cart)
    );

}


/* =========================================================
   ADD PRODUCT
========================================================= */

function addToCart(productId) {

    const product = products.find(
        item => item.id === productId
    );

    if (!product) return;

    const existing = cart.find(
        item => item.id === productId
    );

    if (existing) {

        existing.quantity += 1;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }

    saveCart();
    renderCart();
    updateCartCount();

    openCart();

}


/* =========================================================
   REMOVE PRODUCT
========================================================= */

function removeFromCart(productId) {

    cart = cart.filter(
        item => item.id !== productId
    );

    saveCart();
    renderCart();
    updateCartCount();

}


/* =========================================================
   CHANGE QUANTITY
========================================================= */

function changeQuantity(productId, amount) {

    const item = cart.find(
        product => product.id === productId
    );

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {

        removeFromCart(productId);

        return;
    }

    saveCart();
    renderCart();
    updateCartCount();

}


/* =========================================================
   RENDER
========================================================= */

function renderCart() {

    const container =
        document.getElementById("cartItems");

    const empty =
        document.getElementById("cartEmpty");

    const total =
        document.getElementById("cartTotal");

    if (!container) return;

    container.innerHTML = "";

    if (cart.length === 0) {

        empty.classList.add("active");

        total.textContent = "0 zł";

        return;

    }

    empty.classList.remove("active");

    let totalPrice = 0;

    cart.forEach(item => {

        totalPrice +=
            item.price * item.quantity;

        const element =
            document.createElement("div");

        element.className = "cart-item";

        element.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.name}"
            >

            <div>

                <h4>
                    ${item.name}
                </h4>

                <p>
                    ${item.price} zł
                </p>

                <p>
                    Ilość:
                    ${item.quantity}
                </p>

                <button
                    class="remove-item"
                    onclick="removeFromCart(${item.id})"
                >
                    Usuń
                </button>

            </div>

            <div>

                <strong>
                    ${item.price * item.quantity} zł
                </strong>

            </div>

        `;

        container.appendChild(element);

    });

    total.textContent =
        `${totalPrice.toLocaleString("pl-PL")} zł`;

}


/* =========================================================
   COUNT
========================================================= */

function updateCartCount() {

    const count =
        cart.reduce(
            (sum, item) =>
                sum + item.quantity,
            0
        );

    const desktopCount =
        document.getElementById("cartCount");

    const mobileCount =
        document.getElementById("mobileCartCount");

    if (desktopCount) {
        desktopCount.textContent = count;
    }

    if (mobileCount) {
        mobileCount.textContent = count;
    }

}


/* =========================================================
   OPEN
========================================================= */

function openCart() {

    const panel =
        document.getElementById("cartPanel");

    const overlay =
        document.getElementById("cartOverlay");

    panel.classList.add("active");
    overlay.classList.add("active");

    document.body.classList.add("no-scroll");

}


/* =========================================================
   CLOSE
========================================================= */

function closeCart() {

    const panel =
        document.getElementById("cartPanel");

    const overlay =
        document.getElementById("cartOverlay");

    panel.classList.remove("active");
    overlay.classList.remove("active");

    document.body.classList.remove("no-scroll");

}


/* =========================================================
   INIT
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        renderCart();
        updateCartCount();

        document
            .getElementById("closeCart")
            ?.addEventListener(
                "click",
                closeCart
            );

        document
            .getElementById("cartOverlay")
            ?.addEventListener(
                "click",
                closeCart
            );

        document
            .getElementById("cartButton")
            ?.addEventListener(
                "click",
                openCart
            );

        document
            .getElementById("mobileCartButton")
            ?.addEventListener(
                "click",
                openCart
            );

    }
);
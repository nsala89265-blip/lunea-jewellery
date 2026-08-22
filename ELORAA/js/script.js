/* =========================================================
   LUNEA — FINE JEWELLERY
   MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const body = document.body;

    const mobileMenu = document.getElementById("mobileMenu");
    const mobileMenuButton = document.getElementById("mobileMenuButton");
    const closeMenu = document.getElementById("closeMenu");
    const menuOverlay = document.getElementById("menuOverlay");

    const searchPanel = document.getElementById("searchPanel");
    const searchButton = document.getElementById("searchButton");
    const mobileSearchButton = document.getElementById("mobileSearchButton");
    const closeSearchButton = document.getElementById("closeSearch");
    const searchInput = document.getElementById("searchInput");
    const searchResults = document.getElementById("searchResults");

    const cartButton = document.getElementById("cartButton");
    const mobileBagButton = document.getElementById("mobileBagMenuButton");

    const wishlistButton = document.getElementById("wishlistButton");
    const mobileWishlistButton =
        document.getElementById("mobileWishlistMenuButton");

    const newsletterForm =
        document.getElementById("newsletterForm");

    const newsletterEmail =
        document.getElementById("newsletterEmail");

    const newsletterMessage =
        document.getElementById("newsletterMessage");


    /* =====================================================
       BODY SCROLL
    ===================================================== */

    function lockScroll() {
        body.classList.add("no-scroll");
    }

    function unlockScroll() {
        body.classList.remove("no-scroll");
    }


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    function openMobileMenu() {

        if (!mobileMenu || !menuOverlay) return;

        mobileMenu.classList.add("active");
        menuOverlay.classList.add("active");

        lockScroll();

    }


    function closeMobileMenu() {

        if (!mobileMenu || !menuOverlay) return;

        mobileMenu.classList.remove("active");
        menuOverlay.classList.remove("active");

        unlockScroll();

    }


    mobileMenuButton?.addEventListener(
        "click",
        openMobileMenu
    );


    closeMenu?.addEventListener(
        "click",
        closeMobileMenu
    );


    menuOverlay?.addEventListener(
        "click",
        closeMobileMenu
    );


    /* =====================================================
       MOBILE SUBMENUS
    ===================================================== */

    document
        .querySelectorAll(".mobile-navigation-button")
        .forEach(button => {

            button.addEventListener("click", () => {

                const submenuId =
                    button.dataset.submenu;

                const submenu =
                    document.getElementById(submenuId);

                if (!submenu) return;

                submenu.classList.toggle("active");

                const symbol =
                    button.querySelector("span");

                if (symbol) {

                    symbol.textContent =
                        submenu.classList.contains("active")
                            ? "−"
                            : "+";

                }

            });

        });


    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    document
        .querySelectorAll(".mobile-navigation a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    closeMobileMenu();

                }
            );

        });


    /* =====================================================
       DESKTOP DROPDOWNS
    ===================================================== */

    document
        .querySelectorAll(".nav-dropdown")
        .forEach(dropdown => {

            const button =
                dropdown.querySelector(
                    ".nav-dropdown-button"
                );

            if (!button) return;

            button.addEventListener("click", event => {

                event.stopPropagation();

                document
                    .querySelectorAll(".nav-dropdown")
                    .forEach(item => {

                        if (item !== dropdown) {
                            item.classList.remove("active");
                        }

                    });

                dropdown.classList.toggle("active");

            });

        });


    document.addEventListener("click", event => {

        if (
            !event.target.closest(".nav-dropdown")
        ) {

            document
                .querySelectorAll(".nav-dropdown")
                .forEach(dropdown => {

                    dropdown.classList.remove("active");

                });

        }

    });


    /* =====================================================
       SEARCH
    ===================================================== */

    function openSearch() {

        if (!searchPanel) return;

        searchPanel.classList.add("active");

        lockScroll();

        setTimeout(() => {

            searchInput?.focus();

        }, 250);

    }


    function closeSearch() {

        if (!searchPanel) return;

        searchPanel.classList.remove("active");

        unlockScroll();

        if (searchInput) {
            searchInput.value = "";
        }

        if (searchResults) {
            searchResults.innerHTML = "";
        }

    }


    searchButton?.addEventListener(
        "click",
        openSearch
    );


    mobileSearchButton?.addEventListener(
        "click",
        () => {

            closeMobileMenu();
            openSearch();

        }
    );


    closeSearchButton?.addEventListener(
        "click",
        closeSearch
    );


    /* =====================================================
       SEARCH PRODUCTS
    ===================================================== */

    function getProducts() {

        return Array.from(
            document.querySelectorAll(".product-card")
        );

    }


    searchInput?.addEventListener(
        "input",
        () => {

            const query =
                searchInput.value
                    .trim()
                    .toLowerCase();

            if (!searchResults) return;

            if (!query) {

                searchResults.innerHTML = "";

                return;

            }


            const products =
                getProducts();


            const matches =
                products.filter(card => {

                    const name =
                        card
                            .querySelector("h3")
                            ?.textContent
                            .toLowerCase() || "";

                    const category =
                        card
                            .querySelector(
                                ".product-category"
                            )
                            ?.textContent
                            .toLowerCase() || "";

                    return (
                        name.includes(query) ||
                        category.includes(query)
                    );

                });


            if (matches.length === 0) {

                searchResults.innerHTML = `
                    <div class="search-result">
                        Nie znaleziono produktów.
                    </div>
                `;

                return;

            }


            searchResults.innerHTML =
                matches
                    .slice(0, 8)
                    .map(card => {

                        const name =
                            card
                                .querySelector("h3")
                                ?.textContent
                                .trim() || "";

                        const price =
                            card
                                .querySelector(
                                    ".product-price"
                                )
                                ?.textContent
                                .trim() || "";

                        return `
                            <button
                                class="search-result"
                                type="button"
                            >
                                <strong>
                                    ${name}
                                </strong>

                                <span>
                                    ${price}
                                </span>
                            </button>
                        `;

                    })
                    .join("");


            document
                .querySelectorAll(".search-result")
                .forEach(result => {

                    result.addEventListener(
                        "click",
                        () => {

                            const name =
                                result
                                    .querySelector("strong")
                                    ?.textContent
                                    .trim();

                            const product =
                                getProducts()
                                    .find(card =>
                                        card
                                            .querySelector("h3")
                                            ?.textContent
                                            .trim() === name
                                    );

                            if (!product) return;

                            closeSearch();

                            product.scrollIntoView({
                                behavior: "smooth",
                                block: "center"
                            });

                        }
                    );

                });

        }
    );


    /* =====================================================
       PRODUCT FILTERS
    ===================================================== */

    const filterButtons =
        document.querySelectorAll(
            ".filter-button"
        );

    const productCards =
        document.querySelectorAll(
            ".product-card"
        );


    function filterProducts(category) {

        productCards.forEach(card => {

            const cardCategory =
                card.dataset.category;


            if (
                category === "all" ||
                cardCategory === category
            ) {

                card.style.display = "";

                requestAnimationFrame(() => {

                    card.classList.remove("hidden");

                });

            } else {

                card.classList.add("hidden");

                setTimeout(() => {

                    if (
                        card.classList.contains("hidden")
                    ) {
                        card.style.display = "none";
                    }

                }, 300);

            }

        });


        filterButtons.forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.filter === category
            );

        });

    }


    filterButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                filterProducts(
                    button.dataset.filter
                );

            }
        );

    });


    /* =====================================================
       CATEGORY LINKS
    ===================================================== */

    document
        .querySelectorAll("[data-category-link]")
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    const category =
                        link.dataset.categoryLink;

                    const filterButton =
                        document.querySelector(
                            `.filter-button[data-filter="${category}"]`
                        );

                    if (filterButton) {

                        filterButton.click();

                    }


                    document
                        .querySelectorAll(".nav-dropdown")
                        .forEach(dropdown => {

                            dropdown.classList.remove(
                                "active"
                            );

                        });


                    closeMobileMenu();


                    const productsSection =
                        document.getElementById(
                            "products"
                        );

                    if (!productsSection) return;


                    setTimeout(() => {

                        productsSection.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }, 100);

                }
            );

        });


    /* =====================================================
       PRODUCT WISHLIST BUTTONS
    ===================================================== */

    document
        .querySelectorAll(".product-wishlist")
        .forEach(button => {

            button.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    button.classList.toggle("active");

                    button.textContent =
                        button.classList.contains("active")
                            ? "♥"
                            : "♡";

                }
            );

        });


    /* =====================================================
       ADD TO CART
    ===================================================== */

    let cartCount = 0;

    const cartCountElement =
        document.getElementById("cartCount");


    document
        .querySelectorAll(".product-add")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    cartCount++;

                    if (cartCountElement) {

                        cartCountElement.textContent =
                            cartCount;

                    }


                    const originalText =
                        button.innerHTML;

                    button.innerHTML =
                        "DODANO ✓";

                    button.classList.add("added");


                    setTimeout(() => {

                        button.innerHTML =
                            originalText;

                        button.classList.remove(
                            "added"
                        );

                    }, 1400);

                }
            );

        });


    /* =====================================================
       CART OPEN / CLOSE
    ===================================================== */

    const cartPanel =
        document.getElementById("cartPanel");

    const cartOverlay =
        document.getElementById("cartOverlay");

    const closeCartButton =
        document.getElementById("closeCart");


    function openCart() {

        if (!cartPanel || !cartOverlay) return;

        cartPanel.classList.add("active");
        cartOverlay.classList.add("active");

        lockScroll();

    }


    function closeCart() {

        if (!cartPanel || !cartOverlay) return;

        cartPanel.classList.remove("active");
        cartOverlay.classList.remove("active");

        unlockScroll();

    }


    cartButton?.addEventListener(
        "click",
        openCart
    );


    mobileBagButton?.addEventListener(
        "click",
        () => {

            closeMobileMenu();
            openCart();

        }
    );


    closeCartButton?.addEventListener(
        "click",
        closeCart
    );


    cartOverlay?.addEventListener(
        "click",
        closeCart
    );


    /* =====================================================
       WISHLIST OPEN / CLOSE
    ===================================================== */

    const wishlistPanel =
        document.getElementById(
            "wishlistPanel"
        );

    const wishlistOverlay =
        document.getElementById(
            "wishlistOverlay"
        );

    const closeWishlistButton =
        document.getElementById(
            "closeWishlist"
        );


    function openWishlist() {

        if (
            !wishlistPanel ||
            !wishlistOverlay
        ) return;

        wishlistPanel.classList.add("active");
        wishlistOverlay.classList.add("active");

        lockScroll();

    }


    function closeWishlist() {

        if (
            !wishlistPanel ||
            !wishlistOverlay
        ) return;

        wishlistPanel.classList.remove("active");
        wishlistOverlay.classList.remove("active");

        unlockScroll();

    }


    wishlistButton?.addEventListener(
        "click",
        openWishlist
    );


    mobileWishlistButton?.addEventListener(
        "click",
        () => {

            closeMobileMenu();
            openWishlist();

        }
    );


    closeWishlistButton?.addEventListener(
        "click",
        closeWishlist
    );


    wishlistOverlay?.addEventListener(
        "click",
        closeWishlist
    );


    /* =====================================================
       NEWSLETTER
    ===================================================== */

    newsletterForm?.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            const email =
                newsletterEmail?.value.trim();

            if (!email) return;


            if (newsletterMessage) {

                newsletterMessage.textContent =
                    "Dziękujemy. Witamy w świecie LUNEA.";

                newsletterMessage.classList.add(
                    "success"
                );

            }


            newsletterForm.reset();

        }
    );


    /* =====================================================
       COLLECTION CARDS
    ===================================================== */

    document
        .querySelectorAll(".collection-card")
        .forEach(card => {

            card.addEventListener(
                "click",
                event => {

                    const target =
                        card.getAttribute("href");

                    if (
                        !target ||
                        !target.startsWith("#")
                    ) return;


                    const section =
                        document.querySelector(
                            target
                        );

                    if (!section) return;


                    event.preventDefault();

                    section.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        });


    /* =====================================================
       HERO SLIDER
    ===================================================== */

    const hero =
        document.querySelector(".hero");

    const heroImage =
        document.querySelector(".model-image");

    const dots =
        document.querySelectorAll(".dot");

    const prevButton =
        document.querySelector(".slider-arrow.prev");

    const nextButton =
        document.querySelector(".slider-arrow.next");


    const heroImages = [
        "modelka.jpg",
        "modelka5.jpg",
        "SIGNATURE4.jpg",
        "kolekcja4.png"
    ];


    let currentSlide = 0;


    function showSlide(index) {

        if (!heroImage) return;

        currentSlide =
            (index + heroImages.length)
            % heroImages.length;


        heroImage.style.opacity = "0";


        setTimeout(() => {

            heroImage.src =
                heroImages[currentSlide];

            heroImage.style.opacity = "1";

        }, 180);


        dots.forEach((dot, dotIndex) => {

            dot.classList.toggle(
                "active",
                dotIndex === currentSlide
            );

        });

    }


    prevButton?.addEventListener(
        "click",
        () => {

            showSlide(
                currentSlide - 1
            );

        }
    );


    nextButton?.addEventListener(
        "click",
        () => {

            showSlide(
                currentSlide + 1
            );

        }
    );


    dots.forEach((dot, index) => {

        dot.addEventListener(
            "click",
            () => {

                showSlide(index);

            }
        );

    });


    /* =====================================================
       LOGIN
    ===================================================== */

    const loginButton =
        document.getElementById(
            "loginButton"
        );


    loginButton?.addEventListener(
        "click",
        () => {

            alert(
                "Panel logowania LUNEA będzie dostępny wkrótce."
            );

        }
    );


    /* =====================================================
       CHECKOUT
    ===================================================== */

    const checkoutButton =
        document.querySelector(
            ".checkout-button"
        );


    checkoutButton?.addEventListener(
        "click",
        () => {

            if (cartCount === 0) {

                alert(
                    "Twoja torba jest pusta."
                );

                return;

            }


            alert(
                "Przejście do kasy — funkcja będzie dostępna wkrótce."
            );

        }
    );


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key !== "Escape") return;

            closeMobileMenu();
            closeSearch();
            closeCart();
            closeWishlist();

        }
    );


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const target =
                        link.getAttribute("href");

                    if (
                        !target ||
                        target === "#"
                    ) return;


                    const element =
                        document.querySelector(
                            target
                        );

                    if (!element) return;


                    if (
                        link.hasAttribute(
                            "data-category-link"
                        )
                    ) return;


                    event.preventDefault();


                    element.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        });


    /* =====================================================
       INITIAL STATE
    ===================================================== */

    filterProducts("all");

});

/* =========================================================
   LUNEA — SCROLL REVEAL ANIMATIONS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

 const revealElements = document.querySelectorAll(
    ".intro, .new-section, .bestsellers-section, .collections-section, .products-section, .editorial, .about-section, .newsletter, .footer"
);

  const productElements = document.querySelectorAll(
    ".new-card, .product-card, .bestseller-card"
);

    const observer = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                entry.target.classList.add("is-visible");

                observer.unobserve(entry.target);

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -50px 0px"
        }
    );


    /* SEKCJE */

    revealElements.forEach(element => {
        observer.observe(element);
    });


    /* PRODUKTY */

    productElements.forEach(element => {
        observer.observe(element);
    });

});
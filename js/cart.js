document.addEventListener("partialsLoaded", () => {
    import("./index.js").then(() => {
        console.log('index.js завантажено!');
        updateCartBadge();
    }).catch(err => {
        console.error("Не вдалося завантажити index.js:", err);
    });

let cart = {};

$(document).ready(function() {
    $.getJSON('products.json', function (data) {
        let products = flattenProducts(data);
        checkCart();
        showCart();

        function flattenProducts(data) {
            let flattened = {};
            for (let category in data) {
                for (let key in data[category]) {
                    flattened[key] = data[category][key];
                }
            }
            return flattened;
        }

        function showCart() {
            const cartItems = Object.entries(cart);
            if (cartItems.length === 0) {
                let out = '<p class="add__cart">Кошик порожній. Додайте товар до кошика <span class="home__cart">&#62;</span> <a class="link__cart" href="index.html">Головна сторінка</a></p>';
                $('#my-cart').html(out);
            } else {
                let out = '';
                for (let [key, quantity] of cartItems) {
                    if (products[key]) {
                        out += `<div class="cart__order__cart">`;
                        out += `<img class="img__cart" src="${products[key].image}" alt="Image">`;
                        out += `<div class="cart__text">${products[key].name}</div>`;
                        out += `<div class="cart__price">${products[key].cost} грн</div>`;
                        out += '<div class="button__box">';
                        out += `<button type="button" class="minus" data-art="${key}">-</button>`;
                        out += quantity;
                        out += `<button type="button" class="plus" data-art="${key}">+</button>`;
                        out += '</div>';
                        out += `${quantity * products[key].cost} грн`;
                        out += `<button type="button" class="delete" data-art="${key}"><img class="garb__icon" src="img/icons/garb-icon.png" alt="Del"></button>`;
                        out += '</div>';
                    }
                }
                out += `<div class="total"><p class="total__price">Загальна сума:</p> ${calculateTotalPrice()} грн</div>`;
                out += '<div class="push__push"><button type="button" class="push__buy">Оформити замовлення</button></div>';
                $('#my-cart').html(out);

                $('.plus').on('click', plusProducts);
                $('.minus').on('click', minusProducts);
                $('.delete').on('click', deleteProducts);
            }
            updateCartBadge();
        }

        function plusProducts() {
            let articul = $(this).attr('data-art');
            cart[articul]++;
            saveCart();
            showCart();
            updateCartBadge();
        }

        function minusProducts() {
            let articul = $(this).attr('data-art');
            if (cart[articul] > 1) {
                cart[articul]--;
            } else {
                delete cart[articul];
            }
            saveCart();
            showCart();
            updateCartBadge();
        }

        function deleteProducts() {
            let articul = $(this).attr('data-art');
            delete cart[articul];
            saveCart();
            showCart();
            updateCartBadge();
        }

        function calculateTotalPrice() {
            let total = 0;
            for (let key in cart) {
                total += cart[key] * products[key].cost;
            }
            return total;
        }

        function updateCartBadge() {
            const totalItems = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
            const cartBadge = document.querySelector('.cart-badge');
            if (cartBadge) {
                // Показуємо 0, якщо кількість товарів 0
                cartBadge.textContent = totalItems > 0 ? totalItems : '0';
            }
        }

        function checkCart() {
            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'));
            }
        }

        function saveCart() {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    });
});
});

let cartCount = 0; 
    function addToCart() {
        cartCount++;
        updateCartBadge();
    }
    function updateCartBadge() {
        const cartBadge = document.getElementById("cartEl");
        if (cartBadge) {
            cartBadge.textContent = cartCount;
        }
    }
    const modal = document.getElementById("myModal");
    const span = document.getElementsByClassName("close")[0];

    function openModal() {
        modal.style.display = "block";
        generateModalContent();
    }
    function closeModal() {
        modal.style.display = "none";
    }
    function generateModalContent() {
        const modalContent = document.getElementById("imgCl");
        modalContent.innerHTML = `<div class="model__item">
             <div class="model">Модель:</div>
             <div class="number__model">GFN6F4</div>
         </div>
         <div class="item__info">
     <div class="item__title">
         <p>Косметика</p>
     </div>
 </div>
         <div class="item__stock">
         <div class="item__subtitle">
             <p>В наявності:</p><span class="stock">Є в наявності</span>
         </div>
         <div class="item__price">
          <p class="price__item"> 65 грн. </p>
         </div>
     </div>`; 
    }
    document.addEventListener("DOMContentLoaded", function () {
        const buyButton = document.querySelector(".item__buy");
        if (buyButton) {
            buyButton.addEventListener("click", addToCart);
        }
    });
    span.onclick = closeModal;

document.getElementById("searchButton").addEventListener("click", function () {
    searchProducts();
});
function searchProducts() {
    let searchQuery = document.getElementById("searchInput").value.toLowerCase();
    allProducts = document.querySelectorAll(".item__box");
    allProducts.forEach(function (product) {
        let productTitle = product.querySelector(".item__title p").textContent.toLowerCase();  
        if (productTitle.includes(searchQuery)) {      
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
}

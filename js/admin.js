// let modal = document.getElementById('myModal');
// let btn = document.getElementById('myBtn');
// let span = document.getElementsByClassName("close")[0];

// btn.onclick = function() {
//     modal.style.display = "block";
// }

// span.onclick = function() {
//     modal.style.display = "none";
// }

// window.onclick = function(event) {
//     if(event.target == modal){
//     modal.style.display = "none";
//     }
// }

// let articleInputs = document.querySelectorAll('.i-1');
// let addInput = document.querySelector('.b-1');
// let delInput = document.querySelector('.b-2');

// const storageKey = 'products.json';

// function readLocalStorage() {
//     const data = localStorage.getItem(storageKey);
//     return data ? JSON.parse(data) : {};
// }

// function writeLocalStorage(data) {
//     localStorage.setItem(storageKey, JSON.stringify(data));
// }

// addInput.onclick = function () {
//     const newProduct = {
//         name: document.getElementById('nameInput').value,
//         cost: parseInt(document.getElementById('priceInput').value),
//         model: "Модель",
//         number: document.getElementById('articleInput').value,
//         description: document.getElementById('descriptionInput').value,
//         image: "img/education-toys/tree-toys/image.jpg",
//         buy: "Купити"
//     };

//     const pageSelectElement = document.getElementById('pageSelect');
//     const category = pageSelectElement ? pageSelectElement.value : null;

//     $.ajax({
//         url: 'http://localhost:5500/update-products',
//         type: 'POST',
//         contentType: 'application/json',
//         data: JSON.stringify({ ...newProduct, category }), 
//         success: function(response) {
//             console.log(response);  
//         },
//         error: function(error) {
//             console.error(error);
//         }
//     });

//     let productsData = readLocalStorage();
//     if (!productsData[category]) {
//         productsData[category] = {};
//     }
//     productsData[category][newProduct.number] = newProduct;
//     writeLocalStorage(productsData);
//     articleInputs.forEach(function (input) {
//         input.value = "";
//     });
// };

// delInput.onclick = function () {
//     const productNumberToDelete = document.getElementById('articleInput').value;
//     const categoryToDeleteFrom = document.getElementById('pageSelect').value;

//     $.ajax({
//         url: 'http://localhost:5500/delete-product',
//         type: 'DELETE',
//         contentType: 'application/json',
//         data: JSON.stringify({
//             category: categoryToDeleteFrom,
//             number: productNumberToDelete
//         }),
//         success: function (response) {
//             console.log(response);
//         },
//         error: function (error) {
//             console.error(error);
//         }
//     });

//     let productsData = readLocalStorage();
//     if (productsData[categoryToDeleteFrom] && productsData[categoryToDeleteFrom][productNumberToDelete]) {
//         delete productsData[categoryToDeleteFrom][productNumberToDelete];
//         writeLocalStorage(productsData);
//     }

//     articleInputs.forEach(function (input) {
//         input.value = "";
//     });
// };
$(document).ready(function () {
  const sortMax = document.getElementById('sort__max');
  const sortMin = document.getElementById('sort__min');
  let products = {};
  let currentCategory = '';
  const productsContainer = $('#productsContainer');

  sortMax.addEventListener('click', function () {
    console.log('Sorting by max price...');
    sortAndRenderProducts(true);
  });

  sortMin.addEventListener('click', function () {
    console.log('Sorting by min price...');
    sortAndRenderProducts(false);
  });

  function sortAndRenderProducts(isSortMax) {
    const categoryProducts = products[currentCategory];

    if (categoryProducts) {
      const sortedProducts = Object.values(categoryProducts).sort((a, b) => {
        return isSortMax ? a.cost - b.cost : b.cost - a.cost;
      });

      console.log('Sorted products:', sortedProducts);
      renderSortedProducts(sortedProducts);
    } else {
      console.error(`No products found for the specified category: ${currentCategory}`);
    }
  }

  function renderSortedProducts(sortedProducts) {
    console.log('Rendering sorted products:', sortedProducts);

    productsContainer.html('');

    sortedProducts.forEach(pro => {
      const productDiv = $('<div>').addClass('item__box');
      productDiv.html(`
        <img class="item__image product-image" src="${pro.image}" alt="#">
        <div class="model__item">
            <div class="model">${pro.model}</div>
            <div class="number__model">${pro.number}</div>
        </div>
        <div class="item__info">
            <div class="item__title">
                <p>${pro.name}</p>
            </div>
        </div>
        <div class="item__price">
            <p class="price__item">${pro.cost} грн</p>
            <button type="button" class="item__buy" data-art="">${pro.buy}</button>
        </div>
      `);
      productsContainer.append(productDiv);
    });
  }

  fetch('http://127.0.0.1:5500/products.json')
    .then(response => response.json())
    .then(data => {
      console.log('Data loaded successfully:', data);
      products = data || {};

      const pathArray = window.location.pathname.split('/');
      const categoryNameFromUrl = pathArray[pathArray.length - 1].replace('.html', '');
      if (categoryNameFromUrl) {
        currentCategory = categoryNameFromUrl;
      } else {
        currentCategory = Object.keys(products)[0] || '';
      }
    
      console.log('Current category:', currentCategory);
      currentCategory = Object.keys(products)[0];
      console.log(currentCategory);
      sortAndRenderProducts(true);
    })
    .catch(error => console.error('Error fetching data:', error));
});







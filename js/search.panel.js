let currentSearchResults = [];

$(document).ready(function () {
  let products;

  const productsURL = 'products.json';

  function flattenProducts(data) {
    let flattened = {};
    for (let category in data) {
      for (let key in data[category]) {
        flattened[key] = data[category][key];
      }
    }
    return flattened;
  }

  function searchProductsByName(name) {
    const results = [];
    for (const key in products) {
      if (products.hasOwnProperty(key) && products[key].name) {
        const productName = products[key].name.toLowerCase();
        if (productName.includes(name)) {
          results.push(products[key]);
        }
      }
    }
    return results;
  }

  function displaySearchResults(results) {
    const resultsContainer = $('#searchResults');
    resultsContainer.empty();

    if (results.length === 0) {
      resultsContainer.append('<p>Немає результатів</p>');
    } else {
      results.forEach(function (product) {
        const productLink = `<a href="product.html?key=${product.key}">${product.name}</a>`;
        resultsContainer.append(`<p>${productLink}</p>`);
      });
    }
  }

  function navigateToProductPage(category) {
    let pageUrl;

    switch (category) {
      case 'dolls':
        pageUrl = './dolls.html';
        break;
      case 'kitchens':
        pageUrl = './kitchen.html';
        break;
      case 'educationsTree':
        pageUrl = './education-tree.html';
        break;
      case 'logics':
        pageUrl = './logic.html';
        break;
      case 'laptops':
        pageUrl = './laptop.html';
        break;
      case 'cosmetics':
        pageUrl = './cosmetic.html';
        break;
      case 'heir':
        pageUrl = './heir.html';
        break;
      default:
        pageUrl = './default.html';
        break;
    }

    console.log('Page URL:', pageUrl);
    window.location.href = pageUrl;
  }

  function updateSearchResults(results) {
    currentSearchResults = results;

    const resultsContainer = $('#searchResults');
    resultsContainer.empty();

    if (results.length > 0) {
      const resultList = $('<ul></ul>');

      results.forEach(result => {
        const listItem = $('<li></li>').text(result.name);
        listItem.data('result', result);

        listItem.on('click', function () {
          console.log('Click event triggered');
          const result = $(this).data('result');
          console.log('Selected Result:', result);
          navigateToProductPage(result.category);
        });

        resultList.append(listItem);
      });

      resultsContainer.append(resultList);
    } else {
      resultsContainer.html('<p>Немає результатів</p>');
    }
  }

  $.getJSON(productsURL, function (data) {
    products = flattenProducts(data);

    $('#searchButton').on('click', function () {
      const searchTermElement = $('#searchInput');
      const searchTerm = searchTermElement.val();

      if (searchTerm !== undefined && searchTerm !== null && searchTerm.trim() !== '') {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        const searchResults = searchProductsByName(lowerCaseSearchTerm);
        displaySearchResults(searchResults);
      } else {
        console.error('Invalid search term');
      }
    });

    $('#searchInput').on('input', function () {
      const searchQuery = $(this).val().trim().toLowerCase();
      const searchResults = searchProductsByName(searchQuery);
      updateSearchResults(searchResults);
    });

    $('#delButton').on('click', function () {
      $('#searchInput').val('');
      $('#searchResults').empty();
    });
  });
});

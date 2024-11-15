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

  function updateSearchResults(results) {
    const resultsContainer = $('#searchResults');
    resultsContainer.empty();

    if (results.length > 0) {
      const resultList = $('<ul></ul>');

      results.forEach(result => {
        const listItem = $('<li></li>').text(result.name);
        listItem.data('result', result);

        listItem.on('click', function () {
          const result = $(this).data('result');
          navigateToProductPage(result.category);
        });

        resultList.append(listItem);
      });

      resultsContainer.append(resultList);
    } else {
      resultsContainer.html('<p>Немає результатів</p>');
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
      case 'constructors':
        pageUrl = './constructor.html';
        break;
      case 'robots':
        pageUrl = './robot.html';
        break;
      case 'radioCars':
        pageUrl = './radio-car.html';
        break;
      case 'parkingTrack':
        pageUrl = './parking.html';
        break;
      case 'twoWheeled':
        pageUrl = './two-wheeled.html';
        break;
      case 'threeWheeled':
        pageUrl = './three-wheeled.html';
        break;
      case 'quadBike':
        pageUrl = './quad-bike.html';
        break;
      case 'jeep':
        pageUrl = './jeep.html';
        break;
      default:
        pageUrl = './default.html';
        break;
    }

    window.location.href = pageUrl;
  }

  $.getJSON(productsURL, function (data) {
    products = flattenProducts(data);

    $('#searchButton').on('click', function () {
      const searchTermElement = $('#searchInput');
      const searchTerm = searchTermElement.val();

      if (searchTerm !== undefined && searchTerm !== null && searchTerm.trim() !== '') {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        const searchResults = searchProductsByName(lowerCaseSearchTerm);
        updateSearchResults(searchResults);
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

    $(document).on('click', function (e) {
      if (!$(e.target).closest('#searchResults').length && !$(e.target).closest('#searchInput').length) {
        $('#searchResults').empty();
      }
    });

  });
});
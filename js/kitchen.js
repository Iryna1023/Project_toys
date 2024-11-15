let cart= {}; 

$('document').ready(function(){
    loadProducts();
    checkCart();
    showMiniCart();
});

    $('#sort__max').on('click', function () {
      loadProducts('asc');
  });

  $('#sort__min').on('click', function () {
      loadProducts('desc');
  });

function loadProducts(sortOrder = 'asc') {
  $.getJSON('products.json', function (data) {
      let out = '';
      let category = 'kitchens';
      let products = data[category];

      if (!products) {
          console.error('Категорія "kitchens" не знайдена в даних!');
          return;
      }

      products = Object.values(products).sort((a, b) => {
          if (sortOrder === 'asc') {
              return a.cost - b.cost;
          } else {
              return b.cost - a.cost;
          }
      });

      products.forEach((product) => {
          out += '<div class="item__box">';
          out += '<img class="item__image product-image" src="' + product.image + '" alt="#">';
          out += '<div class="model__item">';
          out += '<div class="model">' + product.model + '</div>';
          out += '<div class="number__model">' + product.number + '</div>';
          out += '</div>';
          out += '<div class="item__info">';
          out += '<div class="item__title">';
          out += '<p>' + product.name + '</p>';
          out += '</div>';
          out += '</div>';
          out += '<div class="item__price">';
          out += '<p class="price__item">' + product.cost + ' грн</p>';
          out += '<button type="button" class="item__buy" data-art="' + product.number + '">Купити</button>';
          out += '</div>';
          out += '</div>';
      });
      $('#kitchensContainer').html(out);
      $('button.item__buy').on('click', addToCart);
    });
}

function addToCart() {
    let articul = $(this).attr('data-art'); 
    if(cart[articul]!=undefined){
      cart[articul]++;
    }else{
      cart[articul] = 1;
    }
   localStorage.setItem('cart',JSON.stringify(cart));
    showMiniCart();
}
function checkCart() {
   if(localStorage.getItem('cart') != null){            
       cart = JSON.parse(localStorage.getItem('cart'));   
   }  
}
function showMiniCart() {
      let totalQuantity = 0;
      for (let key in cart) {
        totalQuantity += cart[key];
      }
      $('.cart-badge').html(totalQuantity);  
}

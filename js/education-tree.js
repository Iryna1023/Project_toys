let cart= {};  // кошик

$('document').ready(function(){
    loadProducts();
    checkCart();
    showMiniCart();
});

function loadProducts(){
  //загружаю товари
  $.getJSON('products.json', function(data){
  /* console.log(data);*/
    let out = '';
      for (let key in data['educations-tree']) {  // перебор масива або обьекта 
        out+='<div class="item__box">';
        out+='<img class="item__image product-image" src="'+data['educations-tree'][key].image+'" alt="#">';  
        out+='<div class="model__item">';
        out+='<div class="model">'+data['educations-tree'][key].model+'</div>';
        out+='<div class="number__model">'+data['educations-tree'][key].number+'</div>';
        out+='</div>';
        out+='<div class="item__info">';
        out+='<div class="item__title">';
        out+='<p>'+data['educations-tree'][key].name+'</p>'; 
        out+='</div>';
        out+='</div>';
        out+='<div class="item__price">';
        out+='<p class="price__item">'+data['educations-tree'][key].cost+' грн</p>';  
        out+='<button type="button" class="item__buy" data-art="'+key+'">'+data['educations-tree'][key].buy+'</button>';
        out+='</div>';
        out+='</div>';
      }
    
    $('.item').html(out);
    $('button.item__buy').on('click', addToCart);
  });
}



function addToCart() {
  // додаєм товар в кошик
    let articul = $(this).attr('data-art');  //this це кнопка яку ми нажимаєм ,читаєм її артикул
    if(cart[articul]!=undefined){
      cart[articul]++;
    }else{
      cart[articul] = 1;
    }
   localStorage.setItem('cart',JSON.stringify(cart));
   /* console.log(cart);*/
    showMiniCart();
}
function checkCart() {
  // провірка наявність кошика в localStorage
   if(localStorage.getItem('cart') != null){            // якщо в локал щось є і воно не рівно 0
       cart = JSON.parse(localStorage.getItem('cart'));   //то ми додаєм в карт те що є в кошику
   }  
}
function showMiniCart() {
  // показуєм  кількість доданих товарів дл кошика
      let totalQuantity = 0;
      for (let key in cart) {
        totalQuantity += cart[key];
      }
      $('.cart-badge').html(totalQuantity);  
}

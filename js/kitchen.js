let cart= {}; 

$('document').ready(function(){
    loadProducts();
    checkCart();
    showMiniCart();
});

function loadProducts(){
   
    $.getJSON('products.json', function(data){
     
      let out = '';
      for (let key in data['kitchens']){       
          out+='<div class="item__box">';
          out+='<img class="item__image product-image" src="'+data['kitchens'][key].image+'" alt="#">';  
          out+='<div class="model__item">';
          out+='<div class="model">'+data['kitchens'][key]['model']+'</div>';
          out+='<div class="number__model">'+data['kitchens'][key]['number']+'</div>';
          out+='</div>';
          out+='<div class="item__info">';
          out+='<div class="item__title">';
          out+='<p>'+data['kitchens'][key]['name']+'</p>'; 
          out+='</div>';
          out+='</div>';
          out+='<div class="item__price">';
          out+='<p class="price__item">'+data['kitchens'][key]['cost']+' грн</p>';  
          out+='<button type="button" class="item__buy" data-art="'+key+'">'+data['kitchens'][key]['buy']+'</button>';
          out+='</div>';
          out+='</div>';

      }
      $('.item__kitchen').html(out);
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
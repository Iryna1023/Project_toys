let cart= {}; 

$('document').ready(function(){
    loadProducts();
    checkCart();
    showMiniCart();
});

function loadProducts(){
  
    $.getJSON('products.json', function(data){
      
      let out = '';
      for (let key in data['quadBike']){     
          out+='<div class="item__box">';
          out+='<img class="item__image product-image" src="'+data['quadBike'][key].image+'" alt="#">';  
          out+='<div class="model__item">';
          out+='<div class="model">'+data['quadBike'][key]['model']+'</div>';
          out+='<div class="number__model">'+data['quadBike'][key]['number']+'</div>';
          out+='</div>';
          out+='<div class="item__info">';
          out+='<div class="item__title">';
          out+='<p>'+data['quadBike'][key]['name']+'</p>'; 
          out+='</div>';
          out+='</div>';
          out+='<div class="item__price">';
          out+='<p class="price__item">'+data['quadBike'][key]['cost']+' грн</p>';  
          out+='<button type="button" class="item__buy" data-art="'+key+'">'+data['quadBike'][key]['buy']+'</button>';
          out+='</div>';
          out+='</div>';

      }
      $('.item__quad').html(out);
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
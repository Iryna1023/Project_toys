let cart = {};

$.getJSON('products.json', function(data){   
 let products = data;   // всі товари в масиві
  /*console.log(data['educations-tree']);
  console.log(data['logics']);
  console.log(data['laptops']);
  /*let educationsTreeProducts = data['educations-tree'];
  let logicProducts = data['logics'];
  let laptopProducts = data['laptops'];

  let products = (logicProducts,educationsTreeProducts,laptopProducts);*/
 
  checkCart();
  showCart();
  
   function showCart(){
    if($.isEmptyObject(cart)){
        let out ='<p class="add__cart">Кошик порожній. Додайте товар до кошика <span class="home__cart">&#62;</span> <a class="link__cart" href="index.html">Головна сторінка</a></p>';
        $('#my-cart').html(out);
    }else{
    let out = '';
    for (let key in cart){
        out+='<div class="cart__order__cart">';
        out+='<button type="button" class="delete" data-art="'+key+'"><img  class="garb__icon" src="img/icons/garb-icon.png" alt="Del"></button>';
        out+='<img class="img__cart" src="'+products[key].image+'" alt="Image">';
        out+='<div class="cart__text">'+products[key].name+'</div>';
        out+='<div class="cart__price">'+products[key].cost+ ' грн'+'</div>';
        out+='<div class="button__box">';
        out+='<button type="button" class="minus" data-art="'+key+'">-</button>';
        out+= cart[key];
        out+='<button type="button" class="plus" data-art="'+key+'">+</button>';
        out+='</div>';
        out+= cart[key]*products[key].cost+ ' грн'; 
        out+='<br>'; 
        out+='</div>';
        out+='<br>';  
        
    }
    out+= '<div class="total"><p class="total__price">Загальна сума:</p>   ' + calculateTotalPrice() + ' грн</div>';
    out+= '<div class="push__push"><button type="button" class="push__buy">Оформити замовлення</button></div>';
    $('#my-cart').html(out);
    $('.plus').on('click', plusProducts);
    $('.minus').on('click', minusProducts);
    $('.delete').on('click', deleteProducts);
   }
}

function plusProducts(){
  let articul = $(this).attr('data-art');
  cart[articul]++;
  saveCart();
  showCart();  
 
 }
 
 function totalPrice() {
  let total = calculateTotalPrice();
  $('.total').remove();
  $('.cart__order__cart').append('<div class="total">Загальна сума: ' + total + ' грн</div>');
}

function calculateTotalPrice() {
  let total = 0;
  for (let key in cart) {
    total += cart[key] * products[key].cost;
  }
  return total;
}


 function minusProducts(){
  let articul = $(this).attr('data-art');
  if(cart[articul]>1){
  cart[articul]--;
  }else{
       delete cart[articul];
  }  
  saveCart();  //зберігаєм корзину в local
  showCart();
  
 }
 function deleteProducts(){
  let articul = $(this).attr('data-art');
  delete cart[articul];
  saveCart();
  showCart();
  
 }
});
function checkCart() {
  // провірка наявність кошика в localStorage
   if(localStorage.getItem('cart') != null){            // якщо в локал щось є і воно не рівно 0
       cart = JSON.parse(localStorage.getItem('cart'));   //то ми додаєм в карт те що є в кошику
   }  
}

  function saveCart() {
    localStorage.setItem('cart',JSON.stringify(cart));
  }


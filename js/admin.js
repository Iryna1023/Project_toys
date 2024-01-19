let modal = document.getElementById('myModal');
let btn = document.getElementById('myBtn');
let span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if(event.target == modal){
    modal.style.display = "none";
    }
}

let btnInput = document.getElementById('add');
let inputArticle = document.getElementById('articleInput');
let inputName = document.getElementById('nameInput');
let inputDescription = document.getElementById('descriptionInput');
let inputPrice =document.getElementById('priceInput');
let inputAvatar = document.getElementById('avatar');

btnInput.onclick = function () {
    [inputArticle, inputName, inputDescription, inputPrice, inputAvatar].forEach(input => input.value = "");
};




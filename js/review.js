document.querySelector('.btn__5').onclick = function () {
  try {
    const inputText = document.getElementById('textId').value;
    const nameText = document.getElementById('nameId').value;

    const review = {
      name: nameText,
      text: inputText,
      id: generateUniqueId(),
      category: 'reviews',
    };

    saveReviewToLocalStorage(review);
    appendReviewToDOM(review);

    document.getElementById('textId').value = '';
    document.getElementById('nameId').value = '';
  } catch (error) {
    console.error('Error saving review:', error);
  }
};

function saveReviewToLocalStorage(review) {
  let reviewsData = JSON.parse(localStorage.getItem('reviewsData')) || {};
  let productsData = JSON.parse(localStorage.getItem('productsData')) || {};

  if (!reviewsData[review.category]) {
    reviewsData[review.category] = {};
  }
  reviewsData[review.category][review.id] = review;

  if (!productsData['reviews']) {
    productsData['reviews'] = {};
  }
  productsData['reviews'][review.id] = {
    category: 'reviews',
    name: review.name,
    text: review.text,
  };

  localStorage.setItem('reviewsData', JSON.stringify(reviewsData));
  localStorage.setItem('productsData', JSON.stringify(productsData));

  $.ajax({
    url: 'http://localhost:5500/update-products',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(productsData),
    success: function (response) {
      console.log(response);
    },
    error: function (error) {
      console.error(error);
    }
  });
}


function loadReviewsFromLocalStorage() {
  let reviewsData = JSON.parse(localStorage.getItem('reviewsData')) || {};

  for (let category in reviewsData) {
    for (let reviewId in reviewsData[category]) {
      appendReviewToDOM(reviewsData[category][reviewId]);
    }
  }
}

function appendReviewToDOM(review) {
  let newReviewDiv = document.createElement('div');
  newReviewDiv.classList.add('review__our');

  let nameParagraph = document.createElement('p');
  nameParagraph.textContent = `Ім'я: ${review.name}`;
  newReviewDiv.appendChild(nameParagraph);

  let textParagraph = document.createElement('p');
  textParagraph.textContent = `Відгук: ${review.text}`;
  newReviewDiv.appendChild(textParagraph);

  document.getElementById('reviewsContainer').appendChild(newReviewDiv);
}

function generateUniqueId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

loadReviewsFromLocalStorage();
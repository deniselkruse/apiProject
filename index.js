const baseURL = 'https://api.spoonacular.com/recipes/complexSearch';
const key = '2dbc75257fac4190bf31c59b6f2d347c';
let url;

//SEARCH FORM

const searchTerm = document.querySelector('.search');
const searchForm = document.querySelector('form');
const submitBtn = document.querySelector('.submit');
const section = document.querySelector('section');

//RESULTS SECTION
searchForm.addEventListener('submit', fetchResults);

function fetchResults(e) {
    console.log(e);
    e.preventDefault();
    url = baseURL + '?apiKey=' + key + '&query=' + searchTerm.value + '&addRecipeInformation=true';

    fetch(url)
    .then(res => res.json())    
    .then(json => display(json))
}

function display(json) {    
    console.log(json);

    let row = document.getElementsByClassName('row no-gutters');

    let card = document.getElementsByClassName('card mb-3');

    let img = document.getElementById("card-image");
    img.src = json.results[1].image;
    console.log(json.results[1].image);
    console.log(img);

    let cardBody = document.getElementsByClassName('card-body');

    let cardTitle = document.getElementById("cardTitle");
    cardTitle.innerText = json.results[1].title;
    console.log(json.results[1].title);

    let cardText = document.getElementById('cardText');
    cardText.innerText = json.results[1].analyzedInstructions[0].steps;
}

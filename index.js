const baseURL = 'https://api.spoonacular.com/recipes/complexSearch';
const key = 'd664d2fb9a9f4cd5bc0b614cab3f62c0';
let url;

const searchTerm = document.querySelector('.search');
const searchForm = document.querySelector('form');
const submitBtn = document.querySelector('.submit');

const recipe = document.getElementById("recipe");
const ingredientList = document.getElementById("ingredients");

searchForm.addEventListener('submit', fetchResults);

function fetchResults(e) {
    console.log(e);
    e.preventDefault();
    url = baseURL + '?apiKey=' + key + '&query=' + searchTerm.value + '&addRecipeInformation=true';

    fetch(url)
        .then(res => res.json())
        .then(json => displayRecipe(json))
}

function displayRecipe(json) {
    console.log(json);
    while (recipe.firstChild) {
        recipe.removeChild(recipe.firstChild);
    }
    while (ingredientList.firstChild) {
        ingredientList.removeChild(ingredientList.firstChild);
    }

    let recipeInfo = json.results;

    if (recipeInfo.length === 0) {
        console.log("No Results");
    } else {
        for (let i = 0; i < Math.floor(Math.random() * recipeInfo.length); i++) {
            
            // Math.floor(Math.random() * recipeInfo.length);

            let row = document.getElementsByClassName('row no-gutters');

            let card = document.getElementsByClassName('card mb-3');

            let img = document.getElementById("card-image");
            img.src = json.results[i].image;
            // console.log(json.results[1].image);
            // console.log(img);

            let cardBody = document.getElementsByClassName('card-body');

            let cardTitle = document.getElementById("cardTitle");
            cardTitle.innerText = json.results[i].title;
            // console.log(json.results[1].title);

            directions = json.results[i].analyzedInstructions[0].steps;
            // console.log(directions);

            directions.forEach(element => {
                console.log(element.step);
                let direction = document.createElement('li');
                direction.innerText = element.step;
                recipe.appendChild(direction);
            });

            components = json.results[i].analyzedInstructions[0].steps[i].ingredients;
            // console.log(components);

            components.forEach(ingr => {
                console.log(ingr.name);
                let ingredientName = document.createElement('li');
                ingredientName.innerText = ingr.name;
                ingredientList.appendChild(ingredientName);
            });

            document.getElementById('ingr').innerHTML = 'Ingredients';

            document.getElementById('dir').innerHTML = 'Directions';
        }
    }
}


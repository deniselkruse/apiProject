const baseURL = 'https://api.spoonacular.com/recipes/complexSearch'
let url;

//SEARCH FORM

const searchTerm = document.querySelector('.search');
const searchForm = document.querySelector('form');
const submitBtn = document.querySelector('.submit');
const section = document.querySelector('section');

//RESULTS NAVIGATION

const nav = document.querySelector('nav');

//RESULTS SECTION
searchForm.addEventListener('submit', fetchResults);

function fetchResults(e) {
    console.log(e);
    e.preventDefault();
    url = baseURL + '&q=' + searchTerm.value;
    console.log("URL:", url);

    fetch(url)
        .then(function (result) {
            console.log(result);
            return result.json();
        })
        .then(function (json) {
            console.log(json);
            displayResults(json);
        })
}

function displayResults(json) {
    while (section.firstChild) {
        section.removeChild(section.firstChild);
    }

    let articles = json.response.docs;

    if (articles.length === 0) {
        console.log("No results");
    } else {
        for (let i = 0; i < articles.length; i++) {
            let article = document.createElement('article');
            let heading = document.createElement('h2');
            let link = document.createElement('a');
            let img = document.createElement('img');
            let para = document.createElement('p');
            let clearfix = document.createElement('div');

            let current = articles[i];
            console.log("Current:", current);

            link.href = current.web_url;
            link.textContent = current.headline.main;

            para.textContent = 'Keywords: ';

            for (let j = 0; j < current.keywords.length; j++) {
                let span = document.createElement('span');
                span.textContent += current.keywords[j].value + ' ';
                para.appendChild(span);
            }

            if (current.multimedia.length > 0) {
                img.src = 'https://spoonacular.com/recipeImages/' + current.multimedia[0].url;
                img.alt = current.headline.main;
            }

            clearfix.setAttribute('class', 'clearfix');

            article.appendChild(heading);
            heading.appendChild(link);
            article.appendChild(img);
            article.appendChild(para);
            article.appendChild(clearfix);
            section.appendChild(article);
        }
    }
}

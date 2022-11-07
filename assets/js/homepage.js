var dropDownOptions = document.querySelector("select");
var searchBtn = document.querySelector("#search");
var itemField = document.querySelector(".itemSearch");
var resultsSection = document.querySelector('#results');
var priceInput = document.querySelector('#price');
var drinksList= document.querySelector('.drinks')

// Determines the input selected by the dropdown menu
function determineSearch() {
    //needs a way to determine which API to use...
    if (dropDownOptions.value == "drink") {
        getDrinkApi();
    } else if (dropDownOptions.value == "starter" || "entree") {
        getFoodApi();
    }
}
// An event listener that takes the input from the drink field and
// pulls data from the api
function getDrinkApi() {
    clearResults();
    var drinkUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + itemField.value;
    fetch(drinkUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    for (i = 0; i < data.drinks.length; i++) {
                        let drinkName = data.drinks[i].strDrink;
                        let ingredients = [];
                        for (j = 1; j < 15; j++) {
                            let key = "strIngredient" + j;
                            if (data.drinks[i][key]) {
                                ingredients.push(data.drinks[i][key]);
                            } else {
                                break;
                            }
                        }

                        let displayResult = document.createElement('div');
                        let displayName = document.createElement('p');
                        let displayIng = document.createElement('p');
                        let addBtn = document.createElement('button');

                        displayResult.setAttribute('class', 'drinkResult');

                        displayName.textContent = drinkName;
                        displayIng.textContent = 'Ingredients: ' + ingredients.join(', ');
                        addBtn.textContent = 'Add Drink to Menu';

                        displayResult.appendChild(displayName);
                        displayResult.appendChild(displayIng);
                        displayResult.appendChild(addBtn);

                        addBtn.addEventListener('click', function(){
                            addDrink(this);
                        })

                        resultsSection.appendChild(displayResult);
                    }
                })
            }
        })
    }
// someButton.addeventlistener('click', function(){})

// An event listener that takes the input from the dish field and
// pulls data from the api
function getFoodApi() {
    var foodUrl = "https://api.edamam.com/api/recipes/v2?type=public&app_id=e8edd3f6&app_key=965507dba90927c9c7322fa83aa1bdb8"
    fetch(foodUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                })
            }
        })
}

function clearResults() {
    var resultElements = Array.from(resultsSection.children);
    resultElements.forEach(element => {
        element.remove();
    });
}

// getDrinkApi();
// getFoodApi();
searchBtn.addEventListener("click", determineSearch);
// someButton.addeventlistener('click', function(){})

function addDrink(button) {
    console.log(button.parentNode.children[1]);
    let newItem = document.createElement('li');
    let drinkName = button.parentNode.children[0].textContent;
    let ingredients = button.parentNode.children[1].textContent;
    let price = priceInput.value;

    newItem.textContent = drinkName + "- " + ingredients + ' $' + price;
    drinksList.appendChild(newItem);
}

// A function that takes the data pulled from the food API and
// adds it to the menu + add price

// A function that saves the menu to local storage so you can pick
// up where you left off

// A function that lets you delete items from the menu

// A function that prints the menu to a PDF?

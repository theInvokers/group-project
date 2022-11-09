var dropDownOptions = document.querySelector("select");
var searchBtn = document.querySelector("#search");
var itemField = document.querySelector(".itemSearch");
var resultsSection = document.querySelector('#results');
var priceInput = document.querySelector('#price');
var drinksList = document.querySelector('.drinks');
var entreeList = document.querySelector(".entree");
var starterList = document.querySelector(".starter")
// Determines the input selected by the dropdown menu
function determineSearch() {
    //needs a way to determine which API to use...
    if (dropDownOptions.value == "drink") {
        getDrinkApi();
    } else if (dropDownOptions.value == "food") {
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

                        addBtn.addEventListener('click', function () {
                            let nameCheck = this.parentNode.children[0].textContent;
                            if (!checkDuplicate(nameCheck, '.drinks')) {
                                addDrink(this);
                            }
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
    clearResults();
    var foodUrl = "https://api.edamam.com/api/recipes/v2?type=public&q=" + itemField.value + "&app_id=e8edd3f6&app_key=965507dba90927c9c7322fa83aa1bdb8"
    fetch(foodUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data.hits);
                    for (var i = 0; i < data.hits.length; i++) {
                        if (data.hits[i].recipe.dishType == "main course") {
                            var mealName = data.hits[i].recipe.label
                            var foodIngredients = [];
                            for (var j = 0; j < data.hits[i].recipe.ingredients.length; j++)
                                if (data.hits[i].recipe.ingredients.length) {
                                    console.log(i);
                                    foodIngredients.push(data.hits[i].recipe.ingredients[j].food);
                                } else {
                                    break;
                                }
                            var displayResult = document.createElement("div");
                            var displayName = document.createElement("p");
                            var displayIng = document.createElement("p");
                            var addBtn = document.createElement("button");

                            displayResult.setAttribute("class", "entree-result");
                            displayName.textContent = mealName;
                            displayIng.textContent = "Ingredients: " + foodIngredients.join(", ");
                            addBtn.textContent = "Add Entree to Menu";

                            addBtn.addEventListener("click", function () {
                                let nameCheck = this.parentNode.children[0].textContent;
                                if (!checkDuplicate(nameCheck, '.entree')) {
                                    addEntree(this);
                                }
                            })
                            displayResult.appendChild(displayName);
                            displayResult.appendChild(displayIng);
                            displayResult.appendChild(addBtn);
                            resultsSection.appendChild(displayResult);
                            console.log("this is an entree");
                        } else {
                            var mealName = data.hits[i].recipe.label
                            var foodIngredients = [];
                            for (var j = 0; j < data.hits[i].recipe.ingredients.length; j++)
                                if (data.hits[i].recipe.ingredients.length) {
                                    foodIngredients.push(data.hits[i].recipe.ingredients[j].food);
                                } else {
                                    break;
                                }
                            var displayResult = document.createElement("div");
                            var displayName = document.createElement("p");
                            var displayIng = document.createElement("p");
                            var addBtn = document.createElement("button");

                            displayResult.setAttribute("class", "starter-result");
                            displayName.textContent = mealName;
                            displayIng.textContent = "Ingredients: " + foodIngredients.join(", ");
                            addBtn.textContent = "Add Starter to Menu";

                            addBtn.addEventListener("click", function () {
                                let nameCheck = this.parentNode.children[0].textContent;
                                if (!checkDuplicate(nameCheck, '.starter')) {
                                    addStarter(this);
                                }
                            })
                            displayResult.appendChild(displayName);
                            displayResult.appendChild(displayIng);
                            displayResult.appendChild(addBtn);
                            resultsSection.appendChild(displayResult);
                            console.log("this is a starter");
                        }
                    }

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
    // console.log(button.parentNode.children[1]);
    let newItem = document.createElement('li');
    let drinkName = button.parentNode.children[0].textContent;
    let ingredients = button.parentNode.children[1].textContent;
    let delBtn = document.createElement('button');
    let price = priceInput.value;
    delBtn.setAttribute("class", 'delBtn');

    newItem.textContent = drinkName + "- " + ingredients + ' - $' + price;
    delBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    drinksList.appendChild(newItem);
    newItem.appendChild(delBtn);

    //remove menu item
    function remove() {
        this.parentNode.parentNode.removeChild(this.parentNode);
    }

    var lis = document.querySelectorAll('li');
    var button = document.querySelectorAll('.delBtn');

    for (var i = 0, len = lis.length; i < len; i++) {
        button[i].addEventListener('click', remove, false);
    }
};

function addEntree(button) {
    // console.log(button.parentNode.children[1]);
    let newItem = document.createElement('li');
    let foodName = button.parentNode.children[0].textContent;
    let ingredients = button.parentNode.children[1].textContent;
    let delBtn = document.createElement('button');
    let price = priceInput.value;

    delBtn.setAttribute("class", "delBtn");

    newItem.textContent = foodName + "- " + ingredients + ' - $' + price;
    delBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    entreeList.appendChild(newItem);
    newItem.appendChild(delBtn);

    //remove menu item
    function remove() {
        this.parentNode.parentNode.removeChild(this.parentNode);
    }

    var lis = document.querySelectorAll('li');
    var button = document.querySelectorAll('.delBtn');

    for (var i = 0, len = lis.length; i < len; i++) {
        button[i].addEventListener('click', remove, false);
    };
};

function addStarter(button) {
    // console.log(button.parentNode.children[1]);
    let newItem = document.createElement('li');
    let foodName = button.parentNode.children[0].textContent;
    let ingredients = button.parentNode.children[1].textContent;
    let delBtn = document.createElement('button');
    let price = priceInput.value;

    delBtn.setAttribute("class", "delBtn");

    newItem.textContent = foodName + "- " + ingredients + ' - $' + price;
    delBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    starterList.appendChild(newItem);
    newItem.appendChild(delBtn);

    //remove menu item
    function remove() {
        this.parentNode.parentNode.removeChild(this.parentNode);
    }

    var lis = document.querySelectorAll('li');
    var button = document.querySelectorAll('.delBtn');

    for (var i = 0, len = lis.length; i < len; i++) {
        button[i].addEventListener('click', remove, false);
    };
};

//returns True if there is a duplicate entry to the string within the passed section, False otherwise
function checkDuplicate(string, section) {
    var parentEl = document.querySelector(section);
    for (i = 0; i < parentEl.children.length; i++) {
        if (parentEl.children[0].textContent.split("-")[0] == string) {
            return true;
        }
    }
    return false;
}


// A function that saves the menu to local storage so you can pick
// up where you left off

// A function that prints the menu to a PDF?

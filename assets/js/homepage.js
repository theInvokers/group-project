var dropDownOptions = document.querySelectorAll("option");
var searchBtn = document.querySelector("#search");

// Determines the input selected by the dropdown menu
function determineSearch(){
//needs a way to determine which API to use...
	if (dropDownSelected == "drink"){
		console.log("working");
		getDrinkApi();
	} else if (dropDownSelected == "starter" || "entree"){
		console.log("working also");
		getFoodApi();
	}
}
// An event listener that takes the input from the drink field and
// pulls data from the api
function getDrinkApi(){
	var drinkUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita"
	fetch(drinkUrl)
		.then(function (response) {
			if (response.ok) {
				response.json().then(function (data){
					console.log(data);
				})
			}
		})
}
// someButton.addeventlistener('click', function(){})

// An event listener that takes the input from the dish field and
// pulls data from the api
function getFoodApi(){
	var foodUrl = "https://api.edamam.com/api/recipes/v2?type=public&app_id=e8edd3f6&app_key=965507dba90927c9c7322fa83aa1bdb8"
	fetch(foodUrl)
		.then(function (response){
			if (response.ok) {
				response.json().then(function(data){
					console.log(data);
				})
			}
		})
}

// getDrinkApi();
// getFoodApi();
searchBtn.addEventListener("click", determineSearch);
// someButton.addeventlistener('click', function(){})

// A function that takes the data pulled from the drink API and
// adds it to the menu + add price

// A function that takes the data pulled from the food API and
// adds it to the menu + add price

// A function that saves the menu to local storage so you can pick
// up where you left off

// A function that lets you delete items from the menu

// A function that prints the menu to a PDF?

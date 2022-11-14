const { jsPDF } = window.jspdf;

var drinksList = document.querySelector('.drinks');
var entreeList = document.querySelector(".entree");
var starterList = document.querySelector(".starter");
var createBtn = document.querySelector(".create");

function saveToPDF() {
    // Variable to set the y position of objects in the PDF
    var y = 0;

    var drinkSave = [];
    for (var i = 0; i < drinksList.children.length; i++) {
        drinkSave.push(drinksList.children[i].textContent);
    }
    var starterSave = [];
    for (var i = 0; i < starterList.children.length; i++) {
        starterSave.push(starterList.children[i].textContent);
    }
    var entreeSave = [];
    for (var i = 0; i < entreeList.children.length; i++) {
        entreeSave.push(entreeList.children[i].textContent);
    }

    const doc = new jsPDF();
    console.log(doc.getFontList());

    var maxWidth = {
        maxWidth: '170'
    }

    var centerAlign = {
        align: 'center'
    }

    var rightAlign = {
        align: 'right'
    }

    doc.setFont('courier');

    doc.setFontSize(36);
    y += 15;
    doc.text("Menu", 105, y, centerAlign);

    y += 5;
    doc.line(20, y, 190, y, 'S');

    doc.setFontSize(24);
    y += 10;
    doc.text("Drinks", 20, y);

    for (i=0; i<drinkSave.length; i++){
        let itemsList = drinkSave[i].split('-');
        let drinkName = itemsList[0].trim();
        let ingredients = itemsList[1].trim();
        let price = itemsList[2].trim();

        y += 10;
        doc.setFontSize(12);
        doc.text(drinkName, 20, y);
        doc.text(price, 190, y, rightAlign);

        y += 5;
        doc.setFontSize(8);
        doc.text(ingredients, 20, y, maxWidth);
    }

    y += 5;
    doc.line(20, y, 190, y, 'S');

    doc.setFontSize(24);
    y += 10;
    doc.text("Starters", 20, y);

    for (i=0; i<starterSave.length; i++){
        let itemsList = starterSave[i].split('-');
        let starterName = itemsList[0].trim();
        let ingredients = itemsList[1].trim();
        let price = itemsList[2].trim();

        y += 10;
        doc.setFontSize(12);
        doc.text(starterName, 20, y);
        doc.text(price, 190, y, rightAlign);

        y += 5;
        doc.setFontSize(8);
        doc.text(ingredients, 20, y, maxWidth);
    }

    y += 5;
    doc.line(20, y, 190, y, 'S');

    doc.setFontSize(24);
    y += 10;
    doc.text("Entrees", 20, y);

    for (i=0; i<entreeSave.length; i++){
        let itemsList = entreeSave[i].split('-');
        let entreeName = itemsList[0].trim();
        let ingredients = itemsList[1].trim();
        let price = itemsList[2].trim();

        y += 10;
        doc.setFontSize(12);
        doc.text(entreeName, 20, y);
        doc.text(price, 190, y, rightAlign);

        y += 5;
        doc.setFontSize(8);
        doc.text(ingredients, 20, y, maxWidth);
    }

    doc.save('Menu.pdf');
}

createBtn.addEventListener('click', saveToPDF);
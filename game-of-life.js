var user = prompt("What is your name?");

var output_div = document.getElementById('output');
output_div.innerHTML = "Welcome Master " + user + "! I am so glad you are here!";

console.log('Get used to opening the developer tools!');

var dimension = 10;
var chanceOFLifeCell = 0.5;
var table;
var cells;

$(document).ready(function() {
	table = $('#main');
	startGame();
	cells = table.find('td');
	placeRandomCells();
		playGame();
});

function startGame(){
	var trHtml = [];
	for (var y = 0; y < dimension; y++) {
		trHtml.push('<tr>');
		for (var x = 0; x < dimension; x++){
			trHtml.push('<td>&nbsp;</td>');
		}
		trHtml.push('</tr>');
	}
	trHtml = trHtml.join('');
	table.append($(trHtml));
}

function placeRandomCells(){
	for (var y = 0; y < dimension; y++) {
		for (var x = 0; x < dimension; x++){
			var cell = getCell(x, y);
			if (Math.random () > chanceOFLifeCell) cell.addClass('alive'); 
			else { cell.removeClass('alive'); }
		}
	}
}

function playGame() {
	playGeneration();

}

function playGeneration (){
	prepareNextGeneration();
	renderNextGeneration();

	setTimeout('playGeneraton()', 200);
}

function prepareNextGeneration() {
	for (var y = 0; y < dimension; y++) {
		for (var x = 0; x < dimension; x++){
			var cell = getCell(x, y);
			var neighbours = getLiveNeighboursCount(x, y);

			if (isCellAlive(x, y)) {
				if(neighbours === 2 || neighbours === 3) {
					cell.attr('isalive', 'true');
				} 
			} else if(neighbours === 3){
				cell.attr('isalive', 'true');
			}
		}
	}
}

function renderNextGeneration() {
	cells.each(function () {
		var cell = $(this);
		cell.removeClass('alive');
		if (cell.attr('isalive') === 'true') cell.addClass('alive');
		cell.removeAttr('isalive');
	});
}

function getLiveNeighboursCount(x, y) {
	var count = 0;
	if (isCellAlive(x-1, y-1)) count ++;
	if (isCellAlive(x, y-1)) count ++;
	if (isCellAlive(x+1, y-1)) count ++;
	if (isCellAlive(x-1, y)) count ++;
	if (isCellAlive(x+1, y)) count ++;
	if (isCellAlive(x-1, y+1)) count ++;
	if (isCellAlive(x, y+1)) count ++;
	if (isCellAlive(x+1, y+1)) count ++;
	return count;
}

function isCellAlive(x, y) {
	return getCell(x, y).attr('class') === 'alive';
}

function getCell(x, y) {
	if (x >= dimension) { x = 0;}
	if (y >= dimension) { y = 0; }
	if (x < 0) { x = dimension - 1; }
	if (y < 0) { y = dimension - 1; }
	return $(cells[y * dimension + x]);
}
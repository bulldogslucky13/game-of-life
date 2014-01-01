

var user = prompt("What is your name?");

var output_div = document.getElementById('output');
output_div.innerHTML = "Welcome" + " " + user + "! I am so glad you are here!";

console.log('Get used to opening the developer tools!');

var grid = document.getElementById('grid');

var number_of_columns = 10;
var number_of_rows = 10;
var current_column;
var current_row;
var current_cell;

for ( current_row = 0; current_row < number_of_rows; current_row++ ) {
    grid.innerHTML = grid.innerHTML + '<div class="row">ROW ' + current_row + '</div>';


}
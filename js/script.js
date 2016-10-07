
//Please find my code for challenge 2 below. The code is perhaps a bit cumbersome in places but I've managed to get all features to work.

//Below runs on load.
$( document ).ready(function() {
    console.log( "ready!" );
    $("h2").after('<div class="student-search page-header"><input type="text" id="searchForm" placeholder="Search for students..."><button>Search</button></div>'); //insert search bar and button on page load.
    launcher(); //run launcher function on page load.
    buttonPress(); //activate search button
});


/////////////////////////////////////////////////////////////////
// Variables
/////////////////////////////////////////////////////////////////
var $allStudents = $("student-list"); //stores the entire student list. A constant that is never altered.
var $studentsToShow; // stores LIs that match search or $allStudents, depending on conditional executed.
var studentsPerPage; //only needs to be global for pagination function to access it.

function launcher() {
     if(document.getElementById("searchForm").value ==='') {
     //if search bar is empty (as it will be on page load and if content of search bar area deleted, set value of $studentsToShow to all students.
         $studentsToShow = $( "ul.student-list" ).children( "li" ); //Sets value to all students, but not using the $allStudents variable, as for some reason this won't work?
         wrap();
         pages();
     }
}

/////////////////////////////////////////////////////////////////
// Functions
/////////////////////////////////////////////////////////////////

function wrap() { //search function placed in a wrap as a fix to get search button working.
$(function() { //Search Function
    var $textInput = $('input:text').change( function () {}).keyup( function () { //below is run when a change is detected in the search bar.
    console.log("Search function has fired");

   $(".pagination").detach(); //this removes any previous pagination div and li elements. Re-inserted as required below.
   $(".message").detach(); //this remove the 'no matches' message if present. Re-inserted as required below.
   $(this).change(); //'this' is referring to the whole input element and its classes.
   console.log(this);

   var $newText = $textInput.val().toLowerCase(); //stores search bar text. Any capitals converted to lower case.
   console.log($newText);
   $( "ul.student-list" ).children( "li" ).hide(); // hide all students.
   $studentsToShow = $( "li" ).filter( ":contains('" + $newText + "')" ); //$studentsToShow contains only those that match the search text.
   pages();
});});
}

//All elements have been hidden as they arrive to this point.
function pages() {
    console.log("Pages function has fired");
    var $arrayLength = $studentsToShow.length; //calc no. of students in the filtered results.
    studentsPerPage = 10; //number of students per page. Global Var as used in more than one function.
    var numberOfPages = Math.ceil($arrayLength/studentsPerPage); //calc no. of pages required. Needs to be .ceil as if were to use .floor you'd lose any LI's after the last ten from having rounded down.
    console.log($arrayLength); //checking things are OK
    console.log(numberOfPages); //checking things are OK

    if ($arrayLength == '0') { //if array length is zero display message.
        console.log("pages IF has fired...");
        $("ul.student-list" ).after('<p class="message">No matches have been found. Please try another search. </p>'); //inserting message for user


    } else { //where $studentsToShow contains students, create required number of pages
        console.log("pages ELSE has fired...");
        var listItemsPag =''; //holding variable for 'for' loop
        for (var i =1; i<=numberOfPages; i+=1) {
            listItemsPag += '<li>'+'<a href="#">'+i+'</a>'+'</li>';} //loop to create required amount of pages.

        var paginationDiv = '<div class="pagination"><ul>' + listItemsPag + '</ul></div>';
        $( "ul").after(paginationDiv); //inserts pagination html after the student list ul.
        paginate(); //now pages have been set up, paginate dictates how they are to be displayed.
    }
}


function paginate() {
    $( "div.pagination" ).find( "a" ).first().addClass("active");
    var index = $(".active").parent().index(); //The links are not siblings to each other but the parent li's are. So if you get the parent of the active link and then call .index() on the li it will give you the index of that li in relation to it's siblings.
    console.log("Index is:" + " " +index);

    // calculate the list items to show based on index value
    var upper = (index+1)*studentsPerPage; //this needs to be calculated before the lower value.
    var lower = upper - studentsPerPage + 1;

    console.log("Lower nth value:" + " " +lower);
    console.log("Upper nth value:" + " " +upper);
    $( "ul.student-list" ).children( "li" ).hide(); //hide all list items
    $($studentsToShow).slice(lower - 1, upper).show(); //slice list items that don't fall within the range.
    pagination2(); //activate pagination2 so that it's ready for page clicks
}


function pagination2 () {
$( "div.pagination" ).find( "a" ).on('click', function(){
    console.log("Page turner function has fired"); //to know that the function is firing on click.
    $("a").removeClass("active"); //removes any "active" value from the anchor within the list items
    $( "ul.student-list" ).children( "li" ).slideUp(); //hide all the students
    $(this).addClass("active"); //make the clicked page "active"

    var index = $(".active").parent().index(); //The links are not siblings to each other but the parent list items are. So if you get the parent of the active link and then call .index() on the li it will give you the index of that li in relation to it's siblings.

    // calculate the list items to show based on index value
    var upper = (index+1)*studentsPerPage; //this needs to be calculated before the lower value.
    var lower = upper - studentsPerPage + 1;

    $($studentsToShow).slice(lower - 1, upper).slideDown(); ///slice list items that don't fall within the range.
});
}


function buttonPress () {
    //Search button will activate wrap() but its effects are not seen as everything inside wrap() automatically runs on key press. Comment out 'change( function () {}).keyup( function () {' to see search button working.
    $( "div.student-search" ).find( "button" ).on('click', function(){
    console.log("Button has been pressed");
    wrap(); //when user pressed search button fire off wrap function
});
}

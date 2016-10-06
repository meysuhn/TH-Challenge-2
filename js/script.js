$( document ).ready(function() {
    console.log( "ready!" );
    $("h2").after('<div class="student-search page-header"><input type="text" id="searchForm" placeholder="Search for students..."><button>Search</button></div>'); //insert search bar and button on page load.
    launcher(); //run launcher function on page load.
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
         pages();
     }
}

//TO CONSIDER:
    //when user deleted search bar contents what happens as launcher isn't fired?
    // In launcher, if $studentsToShow = $allStudents; then the script doesn't work.
        //is rhis a problem with using different selectors throughout?
        //is there another selctor issue below, with $( "ul.student-list" ).children( "li" ).hide(); ?

/////////////////////////////////////////////////////////////////
// Functions
/////////////////////////////////////////////////////////////////

//Search Function
$(function() {
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
        $("ul.student-list" ).after('<p class="message">No matches have been found. Please try another search. </p>');


    } else { //where $studentsToShow contains students, create required number of pages
        console.log("pages ELSE has fired...");

        //listItemsPag = '<li>'+'<a href="#" class="active">'+1+'</a>'+'</li>'; //ADDING CLASS TO FIRST LI HERE. This seems a bit cheeky...
        var listItemsPag =''; //if set up like this 'var listItemsPag;' undefined is returned. A curiosity to figure out later.
        for (var i =1; i<=numberOfPages; i+=1) { //starts at 2 as already made page 1 above
            listItemsPag += '<li>'+'<a href="#">'+i+'</a>'+'</li>';}
            //console.log(listItemsPag);

        var paginationDiv = '<div class="pagination"><ul>' + listItemsPag + '</ul></div>';
        $( "ul").after(paginationDiv); //inserts pagination html after the student list ul.
        //$($studentsToShow).show().css( "background-color", "green" ); //This moved down to paginate function.
        paginate(); //- let's see...
    }
}

function paginate() {
    $( "div.pagination" ).find( "a" ).first().addClass("active");

    var index = $(".active").parent().index(); //The links are not siblings to each other but the parent li's are. So if you get the parent of the active link and then call .index() on the li it will give you the index of that li in relation to it's siblings.
    console.log("Index is:" + " " +index);

    var upper = (index+1)*studentsPerPage; //this needs to be calculated before the lower value.
    var lower = upper - studentsPerPage + 1;
    console.log("Lower nth value:" + " " +lower);
    console.log("Upper nth value:" + " " +upper);

// WHEN 'HIDE' RUNS IN THE SEARCH FUNCTION IT IS DOING SO WITH THIS SELECTOR: "ul.student-list"


    //here is where a show conflict may come in.
    //$( "ul.student-list" ).children('li:nth-of-type(n+' + lower + '):nth-of-type(-n+' + upper + ')').show();
        //above is from pag function
    //$($studentsToShow).show().css( "background-color", "green" );
        //above is pages function in this script that worked fine to display ALL the required results. Currently commented out above.

    //experiments
        //$($studentsToShow).show('li:nth-of-type(n+' + lower + '):nth-of-type(-n+' + upper + ')').css( "background-color", "green" ); //this does not work.
        //$( $studentsToShow ).children('li:nth-of-type(n+' + lower + '):nth-of-type(-n+' + upper + ')').show().css( "background-color", "red" ); //this does not work and breaks the search function in the process.
            //this could be due to more selector errors.
        $( "ul.student-list" ).children( "li" ).hide();

        $($studentsToShow).slice(lower - 1, upper).show();
            //this makes the first 10 students green but keep all other students on display.
                // Event if I place this above, $($allStudents).hide();, it has no effect and all students still show.
                // This however will hide all students and make it work: $( "ul.student-list" ).children( "li" ).hide();

//PLAY WITH IT LIKE IT IS FOR NOW TO MAKE IT WORK, THEN FIX SELECTOR ISSUES LATER.
    //have a go at pagination. Then when you get stuck, go to the community and then get on with your day.

}


//Page turner
$( "div.pagination" ).find( "a" ).on('click', function(){

    console.log("Page turner function has fired"); //to know that the function is firing on click.
    
});




/* Remaining pagination code to adapt to this script
    $("a").removeClass("active"); //removes any "active" value from the list items
    $(displayableStudents).hide(); //hide all the students
    $(this).addClass("active"); //make the clicked page "active"

    var index = $(".active").parent().index(); //The links are not siblings to each other but the parent li's are. So if you get the parent of the active link and then call .index() on the li it will give you the index of that li in relation to it's siblings.


    //$(displayableStudents).hide();

    var upper = (index+1)*studentsPerPage;
    var lower = upper - studentsPerPage + 1;
    //$( "ul.student-list" ).children('li:nth-of-type(n+' + lower + '):nth-of-type(-n+' + upper + ')').show(); // old method

    // either...
    $($studentsToShow).slice(lower - 1, upper).show();
    //or use:


    if (pageNum=='0') {
        $($studentsToShow).slice(0, 10).show().css( "background-color", "blue" );
    } else if (pageNum=='1') {
        $($studentsToShow).slice(11, 20).show().css( "background-color", "green" );
    } else if (pageNum=='2') {
        $($studentsToShow).slice(21, 30).show().css( "background-color", "red" );
    } else if (pageNum=='3') {
        $($studentsToShow).slice(31, 40).show().css( "background-color", "orange" );
    } else if (pageNum=='4') {
        $($studentsToShow).slice(41, 50).show().css( "background-color", "pink" );
    } else if (pageNum=='5') {
        $($studentsToShow).slice(51, 60).show().css( "background-color", "purple" );
    }
    */

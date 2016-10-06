

var listItemsPag = ''; //holds the list items inserted for pagination
var displayableStudents = $( "ul.student-list" ).children( "li" ).css( "background-color", "blue" );
//this variable to hold the students that either a) match the search criteria or b) all the students (if no search created)
// later this may need to be converted to a function, once search is incorporated.
var numberOfPages = ''; //this isn't neccessary just yet, here only for experimenting on final pagination
var studentsPerPage = 10; //number of students per page



$( document ).ready(function() {
    $( "ul.student-list" ).children( "li" ).hide(); //on page load all elements are hidden.
    pagination1(); //pagination1 is executed.
    //pagination2();
});

//need to start with a function that runs on page load, assesses how many LIs there are and executes.



//Need to move function around so that onload the pagination thing runs. On click should then execute that same function.  split into 2?

//onload it is loading everything, but then hiding things as soon as I click on a number.
    //because they're part of the html so of course they're going to load!
    //you're only saying to hide them once you click something.


//calculates number of pages/LIs required. Creates LIs.
function pagination1() {
    console.log( "pagination!" );
      // var studentsPerPage = 10; //this taken out to be replaced with global variable for second function.
      var $arrayLength = displayableStudents.length; //number students in selection
      var numberOfPages = Math.floor($arrayLength/studentsPerPage); //calc no. of pages required

      console.log(numberOfPages);

      for (var i =1; i<=numberOfPages; i+=1) {
          listItemsPag += '<li>'+'<a href="#">'+i+'</a>'+'</li>';
          console.log(listItemsPag);
      }

      var paginationDiv = '<div class="pagination"><ul>' + listItemsPag + '</ul></div>';
      $( "ul").after(paginationDiv); //inserts pagination html after the student list ul.

      $( "div.pagination" ).find( "a" ).on('click', function(){
          $("a").removeClass("active"); //removes any "active" value from the LIs
          $( "ul.student-list" ).children( "li" ).hide(); //hide all the students
          $(this).addClass("active"); //make the clicked page "active"

          var index = $(".active").parent().index(); /*The links are not siblings to each other but the parent li's are. So if you get the parent of the active link and then call .index() on the li it will give you the index of that li in relation to it's siblings.*/
          console.log(index);
          $( "ul.student-list" ).children( "li" ).hide();

          var nthStart = ((index+1)*studentsPerPage)-(studentsPerPage-1);
          var nthEnd = (index+1)*studentsPerPage;
          console.log(nthStart);
          console.log(nthEnd);
          //$( "ul.student-list" ).children('li:nth-of-type(nthStartn):nth-of-type(nthEnd-n)').show();
          //FYI I don't think 'nth of type' accepts equations.

          /*
          $( "ul.student-list" ).children('li:nth-of-type(n+(index+1)*studentsPerPage)-(studentsPerPage-1)):nth-of-type(n+(index+1)*studentsPerPage)').show();
          */
          //$( "ul.student-list" ).children('li:nth-of-type(n+10):nth-of-type(-n+20)').show();

          // I want to write the below in a better way to make it not brittle
          if (index=='0') {
              $( "ul.student-list" ).children('li:nth-of-type(n+0):nth-of-type(-n+10)').show();
          } else if (index=='1') {
              $( "ul.student-list" ).children('li:nth-of-type(n+11):nth-of-type(-n+20)').show();
          } else if (index=='2') {
                  $( "ul.student-list" ).children('li:nth-of-type(n+21):nth-of-type(-n+30)').show();
          } else if (index=='3') {
              $( "ul.student-list" ).children('li:nth-of-type(n+31):nth-of-type(-n+40)').show();
          } else if (index=='4') {
              $( "ul.student-list" ).children('li:nth-of-type(n+41):nth-of-type(-n+50)').show();
          } else if (index=='5') {
              $( "ul.student-list" ).children('li:nth-of-type(n+51):nth-of-type(-n+60)').show();
          }

}
      //pagination2();
);}

//this function tests to see if any students match the search criteria. Before any search is implemented the first page is set as active.
/*
function pagination2() {
    $( "div.pagination" ).find( "a" ).on('click', function(){
        $("a").removeClass("active"); //removes any "active" value from the LIs
        $( "ul.student-list" ).children( "li" ).hide(); //hide all the students
        $(this).addClass("active"); //make the clicked page "active"

        var index = $(".active").parent().index(); /*The links are not siblings to each other but the parent li's are. So if you get the parent of the active link and then call .index() on the li it will give you the index of that li in relation to it's siblings.*/
        /*
        console.log(index);
        $( "ul.student-list" ).children( "li" ).hide();

        var nthStart = ((index+1)*studentsPerPage)-(studentsPerPage-1);
        var nthEnd = (index+1)*studentsPerPage;
        console.log(nthStart);
        console.log(nthEnd);
        //$( "ul.student-list" ).children('li:nth-of-type(nthStartn):nth-of-type(nthEnd-n)').show();
        //FYI I don't think 'nth of type' accepts equations.

        /*
        $( "ul.student-list" ).children('li:nth-of-type(n+(index+1)*studentsPerPage)-(studentsPerPage-1)):nth-of-type(n+(index+1)*studentsPerPage)').show();
        */
        //$( "ul.student-list" ).children('li:nth-of-type(n+10):nth-of-type(-n+20)').show();
/*
        // I want to write the below in a better way to make it not brittle
        if (index=='0') {
            $( "ul.student-list" ).children('li:nth-of-type(n+0):nth-of-type(-n+10)').show();
        } else if (index=='1') {
            $( "ul.student-list" ).children('li:nth-of-type(n+11):nth-of-type(-n+20)').show();
        } else if (index=='2') {
                $( "ul.student-list" ).children('li:nth-of-type(n+21):nth-of-type(-n+30)').show();
        } else if (index=='3') {
            $( "ul.student-list" ).children('li:nth-of-type(n+31):nth-of-type(-n+40)').show();
        } else if (index=='4') {
            $( "ul.student-list" ).children('li:nth-of-type(n+41):nth-of-type(-n+50)').show();
        } else if (index=='5') {
            $( "ul.student-list" ).children('li:nth-of-type(n+51):nth-of-type(-n+60)').show();
        }
        /*
        //Does it matter that I've not done it exactly like this:

        .student-item.cf:nth-of-type(n+11) {
            display: none;
        }

    }
);}

//    $( "div.pagination" ).find( "a" ).on('click', function(){
*/



///////////////////////////////////////////////////////////////////
//SEARCH function
///////////////////////////////////////////////////////////////////

/*
$(document).ready(function(){
    if (displayableStudents === 0) {
        $( "ul.student-list" ).children( "li" ).hide();
        $("ul.student-list" ).after('<p>Sorry, there are no students that match your search</p>');
        //the above is totally experimental. See if works later.
            //requires displayableStudents to be used as part of search function.
    }
    else {
    $( "div.pagination" ).find( "a" ).eq(0).addClass("active"); //sets the first page to 'active' on load
    }
}
);
*/




// inserts search box on page load.
$( document ).ready(function() {
    console.log( "ready!" );
$("h2").after('<div class="student-search page-header"><input placeholder="Search for students..."><button>Search</button></div>');
});


/* Here is how the students are set up in HTML:
<ul class="student-list">
    <li class="student-item cf">
        <div class="student-details">
            <img class="avatar" src="https://randomuser.me/api/portraits/thumb/women/67.jpg">
            <h3>iboya vat</h3> //Name is insude h3 element.
            <span class="email">iboya.vat@example.com</span> //email address.
        </div>
        <div class="joined-details">
               <span class="date">Joined 07/15/15</span>
       </div>
    </li>
</ul>
*/


// Function 2: Search - This may need to get broken down into more than one function. Think about it some more.
//1. Capture the click event on the search bar.
//$("select the search button here later").click(function(){
    //1.1 find();
        //Users should be able to search by name or e-mail address. And partial matches, like just a first name, should be displayed in the results.


//});



//Thoughts
    //Essentially, a scan of the number of li items in the student ul is first going to take place, and depending on how many results there are the number of 'pages' required in the HTML is going to be different.

    //the page will load, onload will fire the pagination function
        //the pagination function scans the HTML document...
            //the function is set up to analyse the total number of li and divide by 10, displays the li items 10 per page
        //the user then begins to interact with the search area
            //a function then needs to take the user input and search through the list items
            //maybe their is a separate function that handles the search query
                //the results of the search query are then fed to the pagination function (parameter/argument) and the pagination function does it's thing of displaying these LIs 10 per page
                //using an else/if (if there are search results, give to pagination, else if there are no search results then display an HTML message to the user)


//////////////////////////////////
//Wiring
//////////////////////////////////

//onload
//$(document).ready(handler).append(); //handler to be replaced with the function name once code is written, the pagination function, for example.

//$(document).append('<div class="student search"><input placeholder="Search for students..."><button>Search</button></div>');

//$(document).ready('<div class="student search"><input placeholder="Search for students..."><button>Search</button></div>').insertAfter(".header");
    //one of the above hopefulolds the answer. Need to play around with it later.
    //the above code hopefully, once the document loads, throws in the search function. So if the browswer has js activated, this wil just run. If js not activited, the html will look normal.
    // to run pagination function in order to just display 10
        //as the js file is placed at the botom of the HTML body, the DOM wil automatically 'ready' itself before firing off any Javascript, so technically .ready isn't strinctly necessary.
        //ready handler used when the js file is included further up the html file, e.g. in he head. Using .ready in that scenario ensures the javascript/jQuery only first once the full dom tree has loaded and is 'ready'
        //see https://teamtreehouse.com/library/jquery-basics/introduction-to-jquery/-ways-to-include-jquery-in-a-project






//event listener required for search button
    //this should fire a function, search perhaps?
    //Add an event listener to the search button. When the user clicks on the button it should use the text in the search input to filter the results.
    //Searching should be case insensitive. e.g. a search for “Susan” should return results for “susan” and “Susan".
    //do they want me to use jQuery for this? e.g. https://teamtreehouse.com/instructions/jquery-javascript-and-the-dom-2

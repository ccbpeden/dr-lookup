var DrSearch = require('./../js/drSearch.js').drSearchModule;
var searchSample = require('./../js/search_sample.js').searchResultSample;
var total;
var skip;

var displaySuccess = function(searchResult, numberskipped, totaldocs)
{
  var displayResult = "";
  var complete = false;
  total = totaldocs;
  skip = numberskipped;

  if(searchResult.length === 0)
  {
    displayResult +="<p>No results matched your criteria</p>";
    complete = true;
  } else if (searchResult.length > 0)
  {
    displayResult +="<p>" + searchResult.length + " results matched your criteria.</p>";
    displayResult += "<ul>";
    searchResult.forEach(function(doctor){
      var image = doctor[0];
      var last_name = doctor[1];
      var first_name = doctor[2];
      var spec = doctor[3];
      var rating = doctor[4];
      var practices = doctor[5];

      displayResult +='<li>';
      displayResult +='<img src="' + image + '" alt="Dr. ' + first_name + ' ' + last_name + '">';
      displayResult +='<p>Dr. ' + first_name + ' ' + last_name + '</p>';
      displayResult +='<p>Specialty:' + spec + '</p>';
      displayResult +='<p>Rating: ' + rating + '</p>';
      displayResult +='<p>' + practices + '</p>';
      displayResult +='</li>';
    });
    displayResult += "</ul>";
    displayResult +="Some doctor Info here!";
    complete = true;
  }

  if(complete)
  {
    $("#searchOutput").append(displayResult);
  }
};


var displayFailure = function(searchResult)
{
  displayResult = "";

  if(typeof searchResult == "object" && typeof searchResult.responseJSON == "object" && typeof searchResult.responseJSON.meta.message == "string")
  {
    displayResult += '<p>Search failed for reason: ' + searchResult.responseJSON.meta.message + '</p>';
  } else {
    displayResult += '<p>Search failed for unknown reason</p>';

  }


  $("#searchOutput").append(displayResult);
};

$(document).ready(function(){
  $("#search_terms").submit(function(event) {
    $("#searchOutput").empty();
    event.preventDefault();
    total = 0;
    skip = 0;
    var medicalIssue = $("#medical_issue").val();
    newDrSearch = new DrSearch(medicalIssue);
    newDrSearch.getResults(skip, displaySuccess, displayFailure);
    console.log(total);
  });
  $(window).scroll(function(){
    if($(document).height() - $(window).height() == $(window).scrollTop()){
      console.log("end of document reached.");
      console.log(total);
      console.log(skip);
      if((total - skip)> 0){
        skip +=20;
        console.log(skip);
        newDrSearch.getResults(skip, displaySuccess, displayFailure);
      }
    }
  });
});

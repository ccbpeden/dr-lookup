var DrSearch = require('./../js/drSearch.js').drSearchModule;
var searchSample = require('./../js/search_sample.js').searchResultSample;

var displaySuccess = function(searchResult, skip)
{
  var displayResult = "";
  var complete = false;

  if(searchResult.length === 0)
  {
    displayResult +="<p>No results matched your criteria</p>";
    complete = true;
  } else if (searchResult.length > 0)
  {
    displayResult +="<p>" + searchResult.length + " results matched your criteria.</p>";
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
    event.preventDefault();
    var medicalIssue = $("#medical_issue").val();
    newDrSearch = new DrSearch(medicalIssue);
    newDrSearch.getResults(0, displaySuccess, displayFailure);
  });
  $(window).scroll(function(){
    if($(document).height() - $(window).height() == $(window).scrollTop())
    console.log("end of document reached.");

  });
});

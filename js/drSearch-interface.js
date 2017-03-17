var DrSearch = require('./../js/drSearch.js').drSearchModule;
var searchSample = require('./../js/search_sample.js').searchResultSample;

var displaySuccess = function(searchResult)
{

};

var displayFailure = function(searchResult)
{
  displayResult = "";

  if(typeof searchResult == "object" && typeof searchResult.responseJSON == "object")
  {
    displayResult += '<p>Response Message: ' + searchResult.responseJSON.meta.message + '</p>';
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

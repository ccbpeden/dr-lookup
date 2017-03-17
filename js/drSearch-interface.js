var DrSearch = require('./../js/drSearch.js').drSearchModule;
var searchSample = require('./../js/search_sample.js').searchResultSample;

var displaySuccess = function(searchResult)
{
  var displayResult = "";
  var complete = false;

  if(searchResult.meta.count === 0)
  {
    displayResult +="<p>No results matched your criteria</p>";
    complete = true;
  } else if (searchResult.meta.count > 0 && searchResult.meta.skip === 0)
  {
    displayResult +="<p>" + searchResult.meta.count + " results matched your criteria.</p>";
  }
  if(searchResult.meta.count > 0)
  {
    displayResult +="Some doctor Info here!";
    searchResult.data.forEach(function(doctor){
      sievedDoc = outputSieve(doctor);
    });
    complete = true;
  }

  if(complete)
  {
    $("#searchOutput").append(displayResult);
  }
};

var outputSieve = function (doctor)
{
  console.log(doctor);
  var output = [];
  if (doctor.profile.image_url)
  {
    output.push(doctor.profile.image_url);
  } else {
    ouput.push("./../img/genericdricon.jpg");
  }

  if (doctor.profile.last_name)
  {
    output.push(doctor.profile.last_name);
  } else
  {
    output.push("No last name provided");
  }

  if (doctor.profile.first_name)
  {
    output.push(doctor.profile.first_name);
  } else
  {
    output.push("No first name provided");
  }
  var specialties = "";
  doctor.specialties.forEach(function(specialty){
    if (specialty.name)
    {
      specialties += specialty.name + ", ";
    }
  });
  specialties = specialties.slice(0,-2);
  output.push(specialties);

  if (doctor.ratings.length != 0)
  {
    output.push(doctor.ratings.image_url_small)
  } else
  {
    output.push("No rating available");
  }
  console.log(output);
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

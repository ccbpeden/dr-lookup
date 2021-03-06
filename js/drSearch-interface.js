var DrSearch = require('./../js/drSearch.js').drSearchModule;
var specialties = require('./../js/drSearch.js').specialtiesModule;
var total;
var skip;

var displaySuccess = function(searchResult, numberskipped, totaldocs) {
  var displayResult = "";
  var complete = false;
  total = totaldocs;
  skip = numberskipped;

  if (searchResult.length === 0) {
    displayResult += "<p>No results matched your criteria</p>";
    complete = true;
  } else if (searchResult.length > 0) {
    displayResult += "<p>" + totaldocs + " results matched your criteria.</p>";
    displayResult += "<ul>";
    searchResult.forEach(function(doctor) {
      var image = doctor[0];
      var last_name = doctor[1];
      var first_name = doctor[2];
      var spec = doctor[3];
      var rating = doctor[4];
      var practices = doctor[5];

      displayResult += '<li>';
      displayResult += '<img src="' + image + '" alt="Dr. ' + first_name + ' ' + last_name + '">';
      displayResult += '<p>Dr. ' + first_name + ' ' + last_name + '</p>';
      displayResult += '<p>Specialty:' + spec + '</p>';
      displayResult += '<p>Rating: ' + rating + '</p>';
      displayResult += '<p>' + practices + '</p>';
      displayResult += '</li>';
    });
    displayResult += "</ul>";
    complete = true;
  }

  if (complete) {
    $("#searchOutput").append(displayResult);
  }
};


var displayFailure = function(searchResult) {
  displayResult = "";

  if (typeof searchResult == "object" && typeof searchResult.responseJSON == "object" && typeof searchResult.responseJSON.meta.message == "string") {
    displayResult += '<p>Search failed for reason: ' + searchResult.responseJSON.meta.message + '</p>';
  } else {
    displayResult += '<p>Search failed for unknown reason</p>';

  }


  $("#searchOutput").append(displayResult);
};

var createSpecialtyList = function(specialties) {
  output = "";
  output += '<label for="doc_spec">Looking for a particular specialization?</label>';
  output += '<select id="doc_spec" class="form-control" name="specialties">';
  output += '<option value=' + "" + '>' + "none" + '</option>';
  for (var i = 0; i < specialties[0].length; i++) {
    output += '<option value=' + specialties[1][i] + '>' + specialties[0][i] + '</option>';
  }
  output += '</select>';
  $("#specialty_dropdown").append(output);
};

$(document).ready(function() {
  specialties(createSpecialtyList);
  $("#search_terms").submit(function(event) {
    $("#searchOutput").empty();
    event.preventDefault();
    total = 0;
    skip = 0;
    var medicalIssue = $("#medical_issue").val();
    var doctorName = $("#doctor_name").val();
    var docSpecialty = $("#doc_spec").val();
    console.log(medicalIssue + doctorName + docSpecialty);
    newDrSearch = new DrSearch(medicalIssue, doctorName, docSpecialty);
    newDrSearch.getResults(skip, displaySuccess, displayFailure);
  });
  $(window).scroll(function() {
    if ($(document).height() - $(window).height() == $(window).scrollTop()) {
      if ((total - skip) > 0) {
        skip += 20;
        newDrSearch.getResults(skip, displaySuccess, displayFailure);
      }
    }
  });
});

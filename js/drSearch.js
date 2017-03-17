 var apiKey = require ('./../.env').apiKey;

 function DrSearch(medicalIssue)
 {
   this.medicalIssue = medicalIssue;
 }

 DrSearch.prototype.constructURL = function(query)
 {
   var url = 'https://api.betterdoctor.com/2016-03-01/doctors?query=';
   url += query;
   url += '&location=45.5231%2C-122.6765%2C%205&user_location=45.5231%2C-122.6765&skip=0&limit=20&user_key=';
   url += apiKey;
   return url;
 };

 DrSearch.prototype.getResults = function (page, doneCallBack, failCallBack) {
   var apiRequest = this.constructURL(this.medicalIssue); //change input for more complex queries later
   var boundSieve = this.outputSieve.bind();
   $.get(apiRequest)
   .done(function(response){
     console.log(response);
     var result = [];
     var output = [];
     response.data.forEach(function(doctor){
       result.push(doctor);
     });
     result.forEach(function(doctor){
        var doc = boundSieve(doctor);
        output.push(doc);
     });
     console.log(output);
     doneCallBack(output);
   })
   .fail(function(response){
     console.log(response);
     failCallBack(response);
   });
 };

 DrSearch.prototype.outputSieve = function (doctor){
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

    if (doctor.ratings.length !== 0)
    {
      output.push(doctor.ratings.image_url_small);
    } else
    {
      output.push("No rating available");
    }
    return output;
  };

 exports.drSearchModule = DrSearch;

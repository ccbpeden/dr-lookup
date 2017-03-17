var apiKey = require ('./../.env').apiKey;

function DrSearch(medicalIssue, doctorName, doctorSpecialty){
  this.medicalIssue = medicalIssue;
  this.doctorName = doctorName;
  this.doctorSpecialty = doctorSpecialty;
}

DrSearch.prototype.constructURL = function(skip) {
  var url = 'https://api.betterdoctor.com/2016-03-01/doctors?';
  if(this.doctorName !== ""){
  url += 'last_name=';
  url += this.doctorName;
  }
  if(this.medicalIssue !== "" && this.doctorName !== ""){
    console.log("and issue");
    url += '&query=';
    url += this.medicalIssue;
  } else if (this.medicalIssue !== "") {
    console.log("only doc");
    url += 'query=';
    url += this.medicalIssue;
  }
  if(this.doctorSpecialty !== "" && (this.doctorName !== "" || this.medicalIssue !== "")){
    console.log("and spec");
    url += '&specialty_uid=';
    url += this.doctorSpecialty;
  } else if (this.doctorSpecialty !== "")
  {
    console.log("only spec");
    url += 'specialty_uid=';
    url += this.doctorSpecialty;
  }
  url += '&location=45.5231%2C-122.6765%2C%205&user_location=45.5231%2C-122.6765&skip=';
  url += skip;
  url += '&limit=20&user_key=';
  url += apiKey;
  return url;
};

DrSearch.prototype.getResults = function (skip, doneCallBack, failCallBack) {
  var apiRequest = this.constructURL(skip);
  console.log(apiRequest);
  var boundSieve = this.outputSieve.bind();
  $.get(apiRequest)
  .done(function(response){
    console.log(response);
    var result = [];
    var output = [];
    total = response.meta.total;
    skip = response.meta.skip;
    response.data.forEach(function(doctor){
      result.push(doctor);
    });
    result.forEach(function(doctor){
      var doc = boundSieve(doctor);
      output.push(doc);
    });
   doneCallBack(output, skip, total);
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
  if(doctor.specialties)
  {
    doctor.specialties.forEach(function(specialty){
      if (specialty.name)
      {
        specialties += specialty.name + ", ";
      }
    });
    specialties = specialties.slice(0,-2);
    output.push(specialties);
  }

  if (doctor.ratings.length > 0)
  {
    doctor.ratings.forEach(function(rating){
      output.push(rating.rating);
    });
  } else
  {
    output.push("No rating available");
  }

  if (doctor.practices.length > 0)
  {
    var practices = "";
    doctor.practices.forEach(function(practice)
    {
      practices += "Practice: " + practice.name +", ";
      practice.phones.forEach(function(phone)
      {
        if (phone.type === "landline"){
          practices += "Phone: " + phone.number + ", ";
        }
      });
    });
    practices = practices.slice(0,-2);
    output.push(practices);
  }
  return output;
};

getSpecialties = function (doneCallBack) {
   var apiRequest = 'https://api.betterdoctor.com/2016-03-01/specialties?user_key=';
   apiRequest+= apiKey;
   $.get(apiRequest)
   .done(function(response){
     specialties = specialtySieve(response);
     doneCallBack(specialties);
   })
   .fail(function(response){
   });
 };

specialtySieve = function(specialtiesobject){
  specialtynames = [];
  specialtyuid = []
  specialtiesobject.data.forEach(function(object){
    specialtynames.push(object.name);
    specialtyuid.push(object.uid);
  });
  var specialties = [specialtynames, specialtyuid];
  return specialties;
};

 exports.specialtiesModule = getSpecialties;
 exports.drSearchModule = DrSearch;

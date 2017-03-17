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
   $.get(apiRequest)
   .done(function(response){
     console.log(response);
     doneCallBack(response);
   })
   .fail(function(response){
     console.log(response);
     failCallBack(response);
   });
 };

 exports.drSearchModule = DrSearch;

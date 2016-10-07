var $ = require('jquery');
var _ = require('underscore');
var Handlebars = require('handlebars');
var githubtoken = require('./gitapikey.js');

if(githubtoken !== undefined){
  $.ajaxSetup({
    headers: {
      'Authorization': 'token ' + githubtoken.token
    }
  });
}

$.ajax('https://api.github.com/users/matiasironyard').then(getProfile);
$.ajax('https://api.github.com/users/matiasironyard/repos').then(getRepos);

// Fetch & append profile data---------------------------------------------------------------------------------
function getProfile(data){

  var myProfile = data;
  console.log(myProfile);
}


// Fetch & append repo data-----------------------------------------------------------------------------------

function getRepos(repos){

  var myRepos = repos[0];

  console.log(myRepos);

  _.forEach(myRepos, function(individualRepos){
    // console.log(myRepos);

  });
}

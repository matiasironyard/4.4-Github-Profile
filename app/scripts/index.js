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
  console.log(data);

  var $profileContainer = $('#profilepane-container');
  var source = $('#profile-pane-template').html();
  var profileTemplate = Handlebars.compile(source);
  $profileContainer.append(profileTemplate(myProfile));
}


// Fetch & append repo data-----------------------------------------------------------------------------------

function getRepos(repos){

  var myRepos = repos;
  console.log(myRepos);

  var reposSource = $("#repo-list-template").html();
  var reposTemplate = Handlebars.compile(reposSource);
  console.log(reposTemplate);

  _.forEach(myRepos, function(repos){
    var $reposDataHtml = $(reposTemplate(myRepos));
      $('.repos-container').append($reposDataHtml);
  });
}

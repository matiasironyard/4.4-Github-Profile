var $ = require('jquery');
var _ = require('underscore');
var Handlebars = require('handlebars');
var githubtoken = require('./gitapikey.js').token;
// 
// if(githubtoken !== undefined){
//   $.ajaxSetup({
//     headers: {
//       'Authorization': 'token ' + githubtoken
//     }
//   });
// }

$.ajax('https://api.github.com/users/matiasironyard').then(getProfile);
$.ajax('https://api.github.com/users/matiasironyard').then(getRepoNav);
$.ajax('https://api.github.com/users/matiasironyard/repos?sort=pushed').then(getRepos);
$.ajax('https://api.github.com/users/matiasironyard/orgs').then(getOrgImage);
$.ajax('https://api.github.com/users/matiasironyard').then(getDate);

// Fetch & append profile data---------------------------------------------------------------------------------
function getProfile(data){

  var myProfile = data;
  console.log(myProfile);

  var $profileContainer = $('#profilepane-container');
  var source = $('#profile-pane-template').html();
  var profileTemplate = Handlebars.compile(source);
  $profileContainer.append(profileTemplate(myProfile));
  $('#nav-avatar').css('background-image', 'url('+myProfile.avatar_url+')');
}

function getRepoNav(data){
  var myRepoNav = data;
  console.log(myRepoNav);
  var $repoNavContainer = $('#repos-pane-nav');
  var repoNavSource = $('#repo-pane-nav-template').html();
  var repoNavTemplate = Handlebars.compile(repoNavSource);
  $repoNavContainer .append(repoNavTemplate(myRepoNav));
}

// function getRepoSearch(data){
//   var myRepoSearch = data;
//   console.log(myRepoSearch);
//   var $repoSearchContainer = $('#repo-search-pane');
//   var repoSearchSource = $('#repo-search-template').html();
//   var repoSearchTemplate = Handlebars.compile(repoSearchSource);
//   $repoSearchContainer.append(repoSearchTemplate(myRepoSearch));
// }



// Fetch & format date---------------------------------------------------------------------------------------------
function getDate(data){
  var dateFormat = require('dateformat');
  var joinDate = data.created_at;
  // console.log(joinDate);
  dateFormat(joinDate, "mmm dd, yyyy");
  console.log(dateFormat(joinDate, "mmm dd, yyyy"));
  document.getElementById('join-date').textContent = dateFormat(joinDate, "mmm dd, yyyy");
}

// Fetch & append repo data-----------------------------------------------------------------------------------

function getRepos(data){
  var myRepos = data;
  console.log(myRepos);
  var $reposContainer = $('#repo-pane');

  var reposSource = $("#repo-list-template").html();
  var Template = Handlebars.compile(reposSource);

  _.each(myRepos,function(repo){
  $reposContainer.append(Template(repo));
});
}

// Fetch 0rg info---------------------------------------------------------------------------------------------------

function getOrgImage(orgInfo){
  var myOrgs = orgInfo;
  console.log(myOrgs);
  var $myOrgsContainer = $('#user-orgs-pane');
  var myOrgsSource = $('#orgs-template').html();
  console.log(myOrgsSource);
  var orgsTemplate = Handlebars.compile(myOrgsSource);
  $myOrgsContainer.append(orgsTemplate(myOrgs[0]));
}

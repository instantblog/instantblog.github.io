'use strict';

angular
  .module('instantblog')
  .service('InstagramApiServices', InstagramApiServices);

//InstagramApiServices.$inject = ['$http', '$templateCache'];
function InstagramApiServices($http, $templateCache,$log) {

  //var myUserId = 2180465817;
  //var clientId = '2bebdf6a7b71473f86629687183d3a62';
  var token = '2180465817.467ede5.b539e364139049fdb1e1637a81337a61';
  var urlPrefix = 'https://api.instagram.com/v1/';
  var urlPostfix = '?access_token=' + token + '&count=500&callback=JSON_CALLBACK';
  var log = $log;

  return ({
    getMyMedia: getMyMedia,
    getMyMedia20: getMyMedia20,
    getUserId: getUserId,
    getUser: getUser,
    getUserRecentMedia: getUserRecentMedia,
    getUserFeed: getUserFeed,
    getUserLiked: getUserLiked,
    getUserFollows: getUserFollows,
    loadMore:loadMore
  });

  //--------------------------------------------------------------------

  //var url =   'https://api.instagram.com/v1/users/' + this.userId + '/media/recent?client_id=' + clientId + '&callback=JSON_CALLBACK';
  //var url_user ='https://api.instagram.com/v1/users/' + userId + '?access_token=' + token + '&callback=JSON_CALLBACK';
  //var url_recent = 'https://api.instagram.com/v1/users/' + userId + '/media/recent?access_token=' + token + '&count=1000&callback=JSON_CALLBACK';
  //var url_feed = 'https://api.instagram.com/v1/users/self/feed?access_token=' + token + '&count=1000&callback=JSON_CALLBACK';
  //var url_liked = 'https://api.instagram.com/v1/users/self/media/liked?access_token=' + token + '&count=1000&callback=JSON_CALLBACK';
  //var url_follows = 'https://api.instagram.com/v1/users/' + userId + '/follows?access_token=' + token + '&callback=JSON_CALLBACK';
  //var url_follow_by = 'https://api.instagram.com/v1/users/' + userId + '/followed-by?access_token=' + token + '&callback=JSON_CALLBACK';
  //var url_media_detail = 'https://api.instagram.com/v1/media/' + mediaId + '?access_token=ACCESS-TOKEN=' + token + '&callback=JSON_CALLBACK';
  //var url_media_comments = 'https://api.instagram.com/v1/media/' + mediaId + '/comments?access_token=' + token + '&callback=JSON_CALLBACK';
  //var url_media_likes = 'https://api.instagram.com/v1/media/' + mediaId + '/likes?access_token=' + token + '&callback=JSON_CALLBACK';
  //var url_popular = 'https://api.instagram.com/v1/media/popular?access_token=' + token + '&callback=JSON_CALLBACK';

  function getData(url) {
    return $http({
      method: 'JSONP',
      url: url,
      cache: $templateCache
    })
      .then(function (response) {
        //log.log(response.data);
        return response.data;
      }, function (response) {
        log.log('failed', response.status);
      });
  }

  function getMyMedia() {
    var url = urlPrefix + 'users/self/media/recent' + urlPostfix;
    return getData(url);
  }
  function getMyMedia20() {
    var url = urlPrefix + 'users/self/media/recent?access_token='+token+'&min_id=1&callback=JSON_CALLBACK';
    return getData(url);
  }

  function getUserId(username) {
    var url = urlPrefix + 'users/search?q=' + username + '&access_token=' + token + '&callback=JSON_CALLBACK';
    return getData(url);
  }

  function getUser(userId) {
    var url = urlPrefix + 'users/' + userId + urlPostfix;
    return getData(url);
  }

  function getUserRecentMedia(userId) {
    var url = urlPrefix + 'users/' + userId + '/media/recent?access_token='+token+'&min_id=1&callback=JSON_CALLBACK';
    return getData(url);
  }

  function getUserFeed() {
    var url = urlPrefix + 'users/self/feed' + urlPostfix;
    return getData(url);
  }

  function getUserLiked() {
    var url = urlPrefix + 'users/self/media/liked' + urlPostfix;
    return getData(url);
  }

  function getUserFollows(userId) {
    var url = urlPrefix + 'users/' + userId + '/follows' + urlPostfix;
    return getData(url);
  }

  function loadMore(url){
    return getData(url + '&callback=JSON_CALLBACK');
  }
}

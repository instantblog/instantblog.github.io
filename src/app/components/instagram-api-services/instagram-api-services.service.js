'use strict';

angular
  .module('instantblog')
  .service('InstagramApiServices', InstagramApiServices);

//InstagramApiServices.$inject = ['$http', '$templateCache'];
function InstagramApiServices($http, $templateCache, $log) {

  var token = '2242645048.f70a9cb.4754007deba943ffb47a3a1f2a8b757b';
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
    getRecentComments: getRecentComments,
    loadMore: loadMore
  });

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
    var url = urlPrefix + 'users/self/media/recent?access_token=' + token + '&min_id=1&callback=JSON_CALLBACK';
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
    var url = urlPrefix + 'users/' + userId + '/media/recent?access_token=' + token + '&min_id=1&callback=JSON_CALLBACK';
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

  function loadMore(url) {
    return getData(url + '&callback=JSON_CALLBACK');
  }

  function getRecentComments(mediaId) {
    var url = urlPrefix + 'media/' + mediaId + '/comments?access_token=' + token + '&callback=JSON_CALLBACK';
    return getData(url);
  }
}

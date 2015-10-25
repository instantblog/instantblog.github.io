(function () {

  'use strict';

  angular
    .module('instantblog')
    .service('FireBaseService', FireBaseService);

  function FireBaseService($log, $firebaseArray, $state, $q, $window, $timeout) {
    var vm = this;
    var log = $log;
    var Firebase = $window.Firebase;
    var ref = new Firebase("https://instantblog.firebaseio.com");
    var commentsRef = new Firebase("https://instantblog.firebaseio.com/comments");

    vm.isStatUpdated = false;
    vm.isCommentUpdated = false;
    vm.fireBaseObject = $firebaseArray(ref);
    vm.updateFireStat = updateFireStat;
    vm.initializeStat = initializeStat;
    vm.initializeComments = initializeComments;
    vm.addToComments = addToComments;

    return vm;
    //---------------------------------------

    //Initializing Stat
    function initializeStat() {
      ref.child("pagestat").set({
        totalPageViews: 0,
        users: [
          {
            username: $state.params.instauser,
            lastTimeStamp: Firebase.ServerValue.TIMESTAMP,
            viewCounts: 0
          }
        ]
      });
    }

    function updateFireStat(username) {
      vm.isStatUpdated = false;
      ref.once('value', function (dataSnapshot) {
        var pagestat = dataSnapshot.val().pagestat;
        var temp = {};

        temp.totalPageViews = pagestat.totalPageViews + 1;
        temp.users = pagestat.users;

        addToUsersIfNotExist(temp.users, username).then(function (data) {
          if (!data.isInArray) {
            temp.users.push({
              username: $state.params.instauser,
              lastTimeStamp: Firebase.ServerValue.TIMESTAMP,
              viewCounts: 1
            });
          }
          ref.child("pagestat").set(temp, onStatComplete);
        });
        vm.totalPageViews = temp.totalPageViews;
        vm.totalUniqueUsers = temp.users.length;

      })
    }

    function addToUsersIfNotExist(userArray, username) {
      var isInArray = false;
      return $q(function (resolve) {
        $timeout(function () {
          for (var i = 0; i < userArray.length; i++) {
            if (userArray[i].username === username) {
              userArray[i].viewCounts = userArray[i].viewCounts + 1;
              isInArray = true;
              break;
            }
          }
          resolve({'array': userArray, 'isInArray': isInArray});
        }, 0)
      })
    }


    //var viewCountRef = new Firebase("https://instantblog.firebaseio.com/pagestat");
    //viewCountRef.once('value', function (dataSnapshot) {
    //  var viewCounts = dataSnapshot.val().totalViewCounts + 1;
    //  viewCountRef.child("totalViewCounts").set(viewCounts);
    //});
    //
    //var userRef = new Firebase("https://instantblog.firebaseio.com/pagestat/users");
    //userRef.push(
    //  {
    //    username: $state.params.instauser,
    //    lastTimeStamp: Firebase.ServerValue.TIMESTAMP,
    //    viewCounts: 1
    //  }
    //);

    //Initializing Comments
    function initializeComments() {
      ref.child("comments").set({
        totalComments: 0,
        comments: []
      });
    }

    function addToComments(obj) {
      vm.isCommentUpdated = false;
      commentsRef.push(
        {
          name: obj.name,
          email: obj.email,
          content: obj.message,
          timeStamp: Firebase.ServerValue.TIMESTAMP
        },
        onCommentComplete
      );
    }

    function onStatComplete(error) {
      if (error) {
        log.log('Stat synchronization failed');
      } else {
        vm.isStatUpdated = true;
        log.log('Stat Info Received');
      }
    }

    function onCommentComplete(error) {
      if (error) {
        log.log('Comment synchronization failed');
      } else {
        vm.isCommentUpdated = true;
        log.log('Comment Received');
      }
    }


  }
})
();

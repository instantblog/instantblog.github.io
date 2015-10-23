function InstagramApiServices(e,t,a){function n(a){return e({method:"JSONP",url:a,cache:t}).then(function(e){return e.data},function(e){v.log("failed",e.status)})}function s(){var e=p+"users/self/media/recent"+b;return n(e)}function r(){var e=p+"users/self/media/recent?access_token="+g+"&min_id=1&callback=JSON_CALLBACK";return n(e)}function i(e){var t=p+"users/search?q="+e+"&access_token="+g+"&callback=JSON_CALLBACK";return n(t)}function o(e){var t=p+"users/"+e+b;return n(t)}function l(e){var t=p+"users/"+e+"/media/recent?access_token="+g+"&min_id=1&callback=JSON_CALLBACK";return n(t)}function c(){var e=p+"users/self/feed"+b;return n(e)}function m(){var e=p+"users/self/media/liked"+b;return n(e)}function u(e){var t=p+"users/"+e+"/follows"+b;return n(t)}function d(e){return n(e+"&callback=JSON_CALLBACK")}var g="2180465817.467ede5.b539e364139049fdb1e1637a81337a61",p="https://api.instagram.com/v1/",b="?access_token="+g+"&count=500&callback=JSON_CALLBACK",v=a;return{getMyMedia:s,getMyMedia20:r,getUserId:i,getUser:o,getUserRecentMedia:l,getUserFeed:c,getUserLiked:m,getUserFollows:u,loadMore:d}}!function(){"use strict";angular.module("instantblog",["ngAnimate","ngCookies","ngTouch","ngSanitize","ngMessages","ngAria","ui.router","ngMaterial","firebase","toastr"])}(),function(){"use strict";function e(){function e(){return t}var t=[{title:"AngularJS",url:"https://angularjs.org/",description:"HTML enhanced for web apps!",logo:"angular.png"},{title:"BrowserSync",url:"http://browsersync.io/",description:"Time-saving synchronised browser testing.",logo:"browsersync.png"},{title:"GulpJS",url:"http://gulpjs.com/",description:"The streaming build system.",logo:"gulp.png"},{title:"Jasmine",url:"http://jasmine.github.io/",description:"Behavior-Driven JavaScript.",logo:"jasmine.png"},{title:"Karma",url:"http://karma-runner.github.io/",description:"Spectacular Test Runner for JavaScript.",logo:"karma.png"},{title:"Protractor",url:"https://github.com/angular/protractor",description:"End to end test framework for AngularJS applications built on top of WebDriverJS.",logo:"protractor.png"},{title:"Angular Material Design",url:"https://material.angularjs.org/#/",description:"The Angular reference implementation of the Google's Material Design specification.",logo:"angular-material.png"},{title:"Less",url:"http://lesscss.org/",description:"Less extends the CSS language, adding features that allow variables, mixins, functions and many other techniques.",logo:"less.png"}];this.getTec=e}angular.module("instantblog").service("webDevTec",e)}(),function(){"use strict";function e(){function e(e,t,a){var n=this;n.state=a,n.relativeDate=e(n.creationDate).fromNow(),n.searchUser=function(e){return""===e?void 0:t.getUserId(e).then(function(e){return e.data.slice(0,19)})},n.changeUser=function(e){angular.isUndefined(e)||null===e||a.go("/",{instauser:e})}}var t={restrict:"E",templateUrl:"app/components/navbar/navbar.html",scope:{creationDate:"="},controller:e,controllerAs:"vm",bindToController:!0};return e.$inject=["moment","InstagramApiServices","$state"],t}angular.module("instantblog").directive("ibNav",e)}(),function(){"use strict";function e(e){function t(t,a){var n=e(a[0],{typeSpeed:150,deleteSpeed:30,pauseDelay:1e3,loop:!0,postfix:" "});a.addClass("acme-malarkey"),angular.forEach(t.extraValues,function(e){n.type(e).pause()["delete"]()})}var a={restrict:"E",scope:{extraValues:"="},template:"&nbsp;",link:t};return a}angular.module("instantblog").directive("acmeMalarkey",e),e.$inject=["malarkey"]}(),angular.module("instantblog").service("InstagramApiServices",InstagramApiServices),InstagramApiServices.$inject=["$http","$templateCache","$log"],function(){"use strict";function e(e,t){function a(a){function s(e){return e.data}function r(t){e.error("XHR Failed for getContributors.\n"+angular.toJson(t.data,!0))}return a||(a=30),t.get(n+"/contributors?per_page="+a).then(s)["catch"](r)}var n="https://api.github.com/repos/Swiip/generator-gulp-angular",s={apiHost:n,getContributors:a};return s}angular.module("instantblog").factory("githubContributor",e),e.$inject=["$log","$http"]}(),angular.module("instantblog").directive("footer",["$mdBottomSheet","$mdToast","$document",function(e,t,a){return{templateUrl:"app/components/footer/footer.html",controller:function(){var e=this;e.showInfoToast=function(e){t.show({parent:a[0].querySelector(".ib-footer"),controller:["FireBaseService",function(a){var n=this;n.FireBaseService=a,n.infoType=e,n.closeToast=function(){t.hide()}}],controllerAs:"toast",templateUrl:"app/components/footer/ib-info-template.html",hideDelay:!1,position:"bottom"})}},controllerAs:"footer",restrict:"EA",link:function(){}}}]),function(){"use strict";function e(e,t,a,n,s,r){function i(){v.child("pagestat").set({totalPageViews:1,users:[{username:a.params.instauser,lastTimeStamp:b.ServerValue.TIMESTAMP,viewCounts:1}]})}function o(e){g.isStatUpdated=!1,v.once("value",function(t){var n=t.val().pagestat;if("mynameisyan"===e||"about"===e)return g.totalPageViews=n.totalPageViews,void(g.totalUniqueUsers=n.users.length);var s={};s.totalPageViews=n.totalPageViews+1,s.users=n.users,l(s.users,e).then(function(e){e.isInArray||s.users.push({username:a.params.instauser,lastTimeStamp:b.ServerValue.TIMESTAMP,viewCounts:1}),v.child("pagestat").set(s,u),g.totalPageViews=s.totalPageViews,g.totalUniqueUsers=s.users.length})})}function l(e,t){var a=!1;return n(function(n){r(function(){for(var s=0;s<e.length;s++)if(e[s].username===t){e[s].viewCounts=e[s].viewCounts+1,a=!0;break}n({array:e,isInArray:a})},0)})}function c(){v.child("comments").set({totalComments:0,comments:[]})}function m(e){g.isCommentUpdated=!1,h.push({name:e.name,email:e.email,content:e.message,timeStamp:b.ServerValue.TIMESTAMP},d)}function u(e){e?p.log("Stat synchronization failed"):(g.isStatUpdated=!0,p.log("Stat Info Received"))}function d(e){e?p.log("Comment synchronization failed"):(g.isCommentUpdated=!0,p.log("Comment Received"))}var g=this,p=e,b=s.Firebase,v=new b("https://instantblog.firebaseio.com"),h=new b("https://instantblog.firebaseio.com/comments");return g.isStatUpdated=!1,g.isCommentUpdated=!1,g.fireBaseObject=t(v),g.updateFireStat=o,g.initializeStat=i,g.initializeComments=c,g.addToComments=m,g}angular.module("instantblog").service("FireBaseService",e),e.$inject=["$log","$firebaseArray","$state","$q","$window","$timeout"]}(),function(){"use strict";function e(){var e={link:function(e,t,a){a.ngSrc||a.$set("src",a.errsrc),t.bind("error",function(){a.$set("src",a.errsrc)}),t.on("$destroy",function(){})}};return e}angular.module("instantblog").directive("errsrc",e)}(),angular.module("instantblog").directive("blogTimeline",function(){return{templateUrl:"app/components/blog-timeline/blog-timeline.html",scope:{galleries:"=galleries"},restrict:"EA",link:function(){}}}),function(){"use strict";function e(e,t,a){function n(){r(),e(function(){i.classAnimation="rubberBand"},4e3)}function s(){a.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>'),i.classAnimation=""}function r(){i.awesomeThings=t.getTec(),angular.forEach(i.awesomeThings,function(e){e.rank=Math.random()})}var i=this;i.awesomeThings=[],i.classAnimation="",i.creationDate=1445280787871,i.showToastr=s,n()}angular.module("instantblog").controller("MainController",e),e.$inject=["$timeout","webDevTec","toastr"]}(),function(){"use strict";function e(e,t){e.state("/",{url:"/:instauser",templateUrl:function(e){return"about"===e.instauser||""===e.instauser||null===e.instauser?"app/blog/about.html":"app/blog/blog.html"},controller:"BlogController",controllerAs:"blog",resolve:{CurrentInstaUser:["InstagramApiServices","$stateParams",function(e,t){function a(t){return t?e.getUser(t.id).then(function(t){return s.currentUser=t.data,t.data?e.getUserRecentMedia(t.data.id).then(function(e){return s.nextUrl=e.pagination.next_url,s.currentMedia=e.data,s.errorMessage="",s.isPrivate=!1,s}):(s.errorMessage=t.meta.error_message,s.isPrivate=!0,s)}):(s.errorMessage="user not found",s)}var n=t.instauser,s={};return s.usernameSearched=n,"about"===n?s:e.getUserId(n).then(function(e){if(!e.data||e.data.length<1)return s.errorMessage="user ( "+n+" ) not found",s;for(var t,r=0;r<e.data.length;r++)if(e.data[r].username===n){t=e.data[r];break}return s.currentUser=t,a(t)})}]}}),t.otherwise("/about")}angular.module("instantblog").config(e),e.$inject=["$stateProvider","$urlRouterProvider"]}(),function(){"use strict";function e(e,t,a,n){var s=this;s.timelineView=!0,s.CurrentInstaUser=t,s.currentUser=t.currentUser||{},s.currentMedia=t.currentMedia||{},s.nextUrl=t.nextUrl||null,s.FireBaseService=a,s.loadMore=function(){e.loadMore(s.nextUrl).then(function(e){Array.prototype.push.apply(s.currentMedia,e.data),s.nextUrl=e.pagination.next_url})},s.searchUser=function(t){return""===t?void 0:e.getUserId(t).then(function(e){return e.data.slice(0,19)})},s.changeUser=function(e){angular.isUndefined(e)||null===e||n.go("/",{instauser:e})}}angular.module("instantblog").controller("BlogController",e),e.$inject=["InstagramApiServices","CurrentInstaUser","FireBaseService","$state"]}(),function(){"use strict";function e(e,t,a,n){var s=t;s.$on("$stateChangeStart",function(){s.isPageLoading=!0}),s.$on("$stateChangeSuccess",function(){s.isPageLoading=!1,a.updateFireStat(n.params.instauser)}),e.debug("runBlock end")}angular.module("instantblog").run(e),e.$inject=["$log","$rootScope","FireBaseService","$state"]}(),function(){"use strict";function e(){}angular.module("instantblog").config(e)}(),function(){"use strict";angular.module("instantblog").constant("malarkey",malarkey).constant("moment",moment)}(),function(){"use strict";function e(e,t){e.debugEnabled(!0),t.allowHtml=!0,t.timeOut=3e3,t.positionClass="toast-top-right",t.preventDuplicates=!0,t.progressBar=!0}angular.module("instantblog").config(e),e.$inject=["$logProvider","toastrConfig"]}(),angular.module("instantblog").run(["$templateCache",function(e){e.put("app/blog/about.html",'<div class="ib-about-container ib-info-block" ng-cloak=""><md-tabs md-dynamic-height="" md-border-bottom=""><md-tab ng-cloak=""><md-tab-label>About</md-tab-label><md-tab-body><md-content layout-padding=""><p class="text-4x">InstantBlog creates an instant blog page for you by information from your <a href="https://instagram.com">Instagram</a> account. All you need to do is to replace YourUserName with your Instagram\'s username in this link: <span class="text-italic">http://instantblog.me/<span class="text-red">YourUserName</span></span>. For example:</p></md-content><md-content layout-padding=""><div class="text-center text-5x">http://instantblog.me/<acme-malarkey extra-values="[\'mynameisyan\', \'instagram\', \'awesome_name\']"></acme-malarkey></div></md-content><div class="text-right ib-search-wrapper"><div class="ib-nav-search"><form ng-submit="$event.preventDefault()"><md-autocomplete md-selected-item="blog.user" md-search-text-change="blog.searchUser(blog.username)" md-search-text="blog.username" md-items="user in blog.searchUser(blog.username)" md-item-text="user.username" md-min-length="1" placeholder="Search for an Instagram user" md-menu-class="autocomplete-custom-template"><md-item-template><div ng-click="blog.changeUser(user.username)"><img ng-src="{{user.profile_picture}}" alt="{{user.username}}" class="img-circle searched-user-thumb-sm"> <span>{{user.username}}</span></div></md-item-template></md-autocomplete></form></div></div><md-content layout-padding="" class="ib-preview"><img class="full-width" src="assets/images/preview.jpg" alt=""></md-content><md-content layout-padding=""><p class="text-3x text-italic">You might want to know ...</p><hr><p>- InstantBlog uses are for <strong>FREE</strong>.</p><p>- Private users\' accounts are NOT viewable on InstantBlog.</p><p>- Feel free to use InstantBlog\'s link as your personal blog page, and to share it with your friends.</p><p>- <span class="text-blue text-3x">{{blog.FireBaseService.totalPageViews}}</span> page views since InstantBlog is published on Oct 22, 2015, with <span class="text-blue text-3x">{{blog.FireBaseService.totalUniqueUsers}}</span> unique Instagram usernames searched.</p></md-content><md-content layout-padding=""><blockquote class="text-3x"><p>"Thank you for using InstantBlog. I hope you are liking it so far! ^ - ^</p><p>I created InstantBlog because I was trying to help my cousin build a simple online \'Baby Journal\' for her baby, where she can post pictures and write stories daily, then to share with family and friends who cares. At that time, I just got finished making a "Gallery" for <a href="http://yan-chen.github.io/#/gallery">my own website</a> by pulling images from my <a href="https://instagram.com">Instagram</a> account, I then came up with this idea of creating InstantBlog.</p><p>I will keep improving and refining InstantBlog when time allows. If you have any questions and suggestions, you are welcome to leave me a message under the <strong>Contact</strong> section.</p><p>Thank you for your support ~ !"</p><p>&nbsp;</p><p>--<i>Yan Chen</i></p></blockquote><br><br><md-content layout-padding=""><p class="text-center text-1x text-grey"><i class="glyphicon glyphicon-copyright-mark"></i> InstantBlog 2015. All rights reserved.</p></md-content></md-content></md-tab-body></md-tab><md-tab ng-cloak=""><md-tab-label>Contact</md-tab-label><md-tab-body><div class="ib-md-input"><p>If you have any questions/comments/suggestions, please feel free to send me an <a href="mailto:ychen.0931@gmail.com"><md-icon class="text-10x text-blue">email</md-icon><md-tooltip>ychen.0931@gmail.com</md-tooltip></a> , or leave me a message below.</p><br><form name="commentForm"><div><md-input-container><label>Your Comment</label> <textarea required="" name="message" rows="3" ng-model="toast.message" minlength="1" maxlength="1000"></textarea><div ng-messages="commentForm.message.$error"><div ng-message="required">This is required.</div></div></md-input-container></div><div layout="" layout-sm="column"><md-input-container flex="50" flex-sm="100"><label>Your Name</label> <input required="" name="name" type="text" ng-model="toast.name" minlength="1" maxlength="100"><div ng-messages="commentForm.name.$error"><div ng-message="required">This is required.</div></div></md-input-container><md-input-container flex="50" flex-sm="100"><label>Your Emai</label> <input type="email" name="email" ng-model="toast.email" ng-pattern="/^.+@.+\\..+$/" minlength="0" maxlength="100"><div ng-messages="commentForm.email.$error" role="alert"><div ng-message-exp="[\'minlength\', \'maxlength\', \'pattern\']">Please enter a valid e-mail address.</div></div></md-input-container></div><br><md-button class="md-raised" ng-click="toast.FireBaseService.addToComments(toast)">Submit Comments</md-button><p class="text-red" ng-if="toast.FireBaseService.isCommentUpdated">Thank you! Your message has been received.</p></form></div></md-tab-body></md-tab></md-tabs></div>'),e.put("app/blog/blog.html",'<div class="blog-container"><md-content class="blog-container"><div class="blog-header text-center"><img class="full-width" ng-src="{{blog.currentUser.profile_picture}}" errsrc="assets/images/tree.jpg" alt=""></div><p class="lead user-profile"><img class="img-circle" ng-src="{{blog.currentUser.profile_picture}}" errsrc="assets/images/user_profile.png" alt=""><br></p><div class="text-center user-info"><p class="text-5x"><a href="http://www.instagram.com/{{blog.currentUser.username}}">{{blog.currentUser.username}}</a></p><p class="text-2x text-grey" layout-padding="" ng-if="blog.currentUser.counts"><strong>{{blog.currentUser.counts.media}}</strong> Posts &nbsp;| &nbsp; <strong>{{blog.currentUser.counts.followed_by}}</strong> Followers &nbsp;| &nbsp; <strong>{{blog.currentUser.counts.follows}}</strong> Followering</p><p class="text-4x text-red ib-user-error" ng-if="blog.CurrentInstaUser.isPrivate">Private User Account.</p><p class="text-4x text-red ib-user-error" ng-if="blog.CurrentInstaUser.errorMessage">Sorry, {{blog.CurrentInstaUser.errorMessage}}.</p><p class="text-3x">{{blog.currentUser.bio}}</p><p class="text-2x"><a href="{{blog.currentUser.website}}">{{blog.currentUser.website}}</a></p></div><div class="blog-content"><div ng-if="blog.timelineView" class="timeline-view"><div data-blog-timeline="" data-galleries="blog.currentMedia"></div></div><div class="row text-center blog-loadmore margin-0" ng-if="blog.nextUrl && blog.currentMedia.length<blog.currentUser.counts.media"><md-button class="md-flat yy-md-blue yy-btn-lg" ng-click="blog.loadMore()">Load More &nbsp; &nbsp;<i class="glyphicon glyphicon-chevron-down text-1x"></i></md-button></div><div class="row text-center blog-loadmore margin-0" ng-if="!blog.nextUrl && blog.currentMedia.length>=blog.currentUser.counts.media"><p class="text-3x text-blue">E&nbsp;N&nbsp;D</p></div></div></md-content><footer></footer></div>'),e.put("app/main/main.html",'<div layout="vertical" layout-fill=""><md-content><header><acme-navbar creation-date="main.creationDate"></acme-navbar></header><section class="jumbotron"><h1>\'Allo, \'Allo!</h1><p class="lead"><img src="assets/images/yeoman.png" alt="I\'m Yeoman"><br>Always a pleasure scaffolding your apps.</p><md-button class="md-raised animated infinite" ng-class="main.classAnimation" ng-click="main.showToastr()">Splendid Toastr</md-button><p>With ♥ thanks to the contributions of<acme-malarkey extra-values="[\'Yeoman\', \'Gulp\', \'Angular\']"></acme-malarkey></p></section><div class="techs" layout-align="center"><md-card ng-repeat="awesomeThing in main.awesomeThings | orderBy:\'rank\'"><md-card-content><img class="pull-right" ng-src="assets/images/{{ awesomeThing.logo }}" alt="{{ awesomeThing.title }}"><h3 class="md-title">{{ awesomeThing.title }}</h3><p class="">{{ awesomeThing.description }}</p></md-card-content><div class="md-action-buttons"><md-button ng-href="{{ awesomeThing.url }}">Website</md-button></div></md-card></div></md-content></div>'),e.put("app/components/blog-timeline/blog-timeline.html",'<div class="yy-blog-timeline"><div class="row margin-0 full-width hidden-xs" ng-repeat="gallery in galleries track by $index"><div class="yy-blog-timeline-box" ng-class-odd="\'right\'" ng-class-even="\'left\'"><div class="clearfix"><div class="yy-blog-timeline-date">{{gallery.created_time*1000| date:\'MMM dd, yyyy\'}}</div><div class="yy-blog-timeline-index">#{{$index+1}}</div></div><div class="yy-blog-timeline-box-inner"><div class="yy-blog-timeline-image-container"><a href=""><img class="" ng-src="{{gallery.images.low_resolution.url}}" alt=""></a></div><div class="yy-blog-timeline-node"><i class="glyphicon glyphicon-time"></i></div><div class="yy-blog-timeline-content"><div class="yy-blog-timeline-location"><a href="https://instagram.com/explore/locations/{{gallery.location.id}}/">{{gallery.location.name}}</a></div><div class="clearfix text-1x"><i class="glyphicon glyphicon-heart-empty text-red"></i> {{gallery.likes.count}}&nbsp;&nbsp; <i class="glyphicon glyphicon-comment text-blue"></i> {{gallery.comments.count}}</div><div class="gallery-image-caption">{{gallery.caption.text}}</div><div ng-repeat="comment in gallery.comments.data track by $index" ng-if="!!gallery.comments.data"><div class="gallery-image-comment"><a href="https://instagram.com/{{comment.from.username}}"><img src="{{comment.from.profile_picture}}" class="img-circle"> <strong>{{comment.from.username}}</strong></a> &nbsp;&nbsp;&nbsp;{{comment.text}}</div></div></div></div></div></div><div class="row margin-0 full-width visible-xs" ng-repeat="gallery in galleries track by $index"><div class="yy-blog-timeline-box right"><div class="clearfix"><div class="yy-blog-timeline-date">{{gallery.created_time*1000| date:\'MMM dd, yyyy\'}}</div><div class="yy-blog-timeline-index">#{{$index+1}}</div></div><div class="yy-blog-timeline-box-inner"><div class="yy-blog-timeline-node">o</div><div class="yy-blog-timeline-content"><div class="yy-blog-timeline-location"><a href="https://instagram.com/explore/locations/{{gallery.location.id}}/">{{gallery.location.name}}</a></div><div class="yy-blog-timeline-image-container"><a href=""><img class="full-width" ng-src="{{gallery.images.standard_resolution.url}}" alt=""></a></div><div class="gallery-image-caption">{{gallery.caption.text}}</div><div ng-repeat="comment in gallery.comments.data track by $index" ng-if="!!gallery.comments.data"><div class="gallery-image-comment"><a href="https://instagram.com/{{comment.from.username}}"><img src="{{comment.from.profile_picture}}" class="img-circle"> <strong>{{comment.from.username}}</strong></a> &nbsp;&nbsp;&nbsp;{{comment.text}}</div></div></div></div></div></div></div>'),e.put("app/components/footer/footer.html",'<div layout="row" layout-align="center center" class="ib-footer"><div class="text-center text-2x"><md-button flex="50" class="md-flat"><a href="/about">Home</a></md-button>|<md-button flex="50" class="md-flat" ng-click="footer.showInfoToast(\'About\')">About</md-button>|<md-button flex="50" class="md-flat" ng-click="footer.showInfoToast(\'Contact\')">Contact</md-button><p class="text-center text-1x"><i class="glyphicon glyphicon-copyright-mark"></i> InstantBlog 2015. All rights reserved.</p></div></div>'),e.put("app/components/footer/ib-info-template.html",'<md-toast class="md-has-header ib-info-block text-left" ng-cloak=""><div class="ib-toast-content"><div class="text-right"><md-button ng-click="toast.closeToast()">Close X</md-button></div><div class="text-4x">{{toast.infoType}}</div><hr><div ng-if="toast.infoType===\'About\'"><div layout-padding=""><p class="text-3x">InstantBlog creates an instant blog page for you by information from your <a href="https://instagram.com">Instagram</a> account. All you need to do is to replace YourUserName with your Instagram\'s username in this link: <span class="text-italic">http://instantblog.me/<span class="text-red">YourUserName</span></span>. For example:</p><md-content><div class="text-center text-3x">http://instantblog.me/<acme-malarkey extra-values="[\'mynameisyan\', \'instagram\', \'awesome_name\']"></acme-malarkey></div></md-content></div><div layout-padding="" class="text-3x"><p class="text-italic">You might want to know ...</p><hr><p>- InstantBlog uses are for <strong>FREE</strong>.</p><p>- Private users\' accounts are NOT viewable on InstantBlog.</p><p>- Feel free to use InstantBlog\'s link as your personal blog page, and to share it with your friends.</p><p>- <span class="text-blue text-3x">{{blog.FireBaseService.totalPageViews}}</span> page views since InstantBlog is published on Oct 22, 2015, with <span class="text-blue text-3x">{{blog.FireBaseService.totalUniqueUsers}}</span> unique Instagram usernames searched.</p></div></div><div ng-if="toast.infoType===\'Contact\'" class="ib-md-input"><p>If you have any questions/comments/suggestions, please feel free to send me an<md-icon class="text-3x">email</md-icon>, or leave me a message below.</p><br><form name="commentForm"><div><md-input-container><label>Your Comment</label> <textarea required="" name="message" rows="3" ng-model="toast.message" minlength="1" maxlength="1000"></textarea><div ng-messages="commentForm.message.$error"><div ng-message="required">This is required.</div></div></md-input-container></div><div layout="" layout-sm="column"><md-input-container style="width:50%"><label>Your Name</label> <input required="" name="name" type="text" ng-model="toast.name" minlength="1" maxlength="100"><div ng-messages="commentForm.name.$error"><div ng-message="required">This is required.</div></div></md-input-container><md-input-container style="width:50%"><label>Your Email (optional)</label> <input type="email" name="email" ng-model="toast.email" ng-pattern="/^.+@.+\\..+$/" minlength="0" maxlength="100"><div ng-messages="commentForm.email.$error" role="alert"><div ng-message-exp="[\'minlength\', \'maxlength\', \'pattern\']">Please enter a valid e-mail address.</div></div></md-input-container></div><md-button class="md-raised" ng-click="toast.FireBaseService.addToComments(toast)">Submit Comments</md-button><p class="text-red" ng-if="toast.FireBaseService.isCommentUpdated">Thank you! Your message has been received.</p></form></div></div></md-toast>'),e.put("app/components/navbar/navbar.html",'<div class="ib-nav"><div layout="row" layout-sm="column" ng-class="{\'on-blog\':vm.state.params.instauser!==\'about\'}"><div flex="30" flex-sm="100" class="ib-logo-wrapper" ng-class="{\'is-hidden\':vm.state.params.instauser!==\'about\'}"><div class="ib-logo"><a href="#/about">InstantBlog</a></div></div><div flex="70" flex-sm="100" class="text-right ib-search-wrapper" ng-class="{\'is-hidden\':vm.state.params.instauser===\'about\'}"><div class="ib-nav-search"><div class="search-box"><form ng-submit="$event.preventDefault()"><md-autocomplete md-selected-item="vm.user" md-search-text-change="vm.searchUser(vm.username)" md-search-text="vm.username" md-items="user in vm.searchUser(vm.username)" md-item-text="user.username" md-min-length="1" placeholder="Search for an Instagram user" md-menu-class="autocomplete-custom-template"><md-item-template><div ng-click="vm.changeUser(user.username)"><img ng-src="{{user.profile_picture}}" alt="{{user.username}}" class="img-circle searched-user-thumb-sm"> <span>{{user.username}}</span></div></md-item-template></md-autocomplete></form></div></div></div></div></div>')}]);
//# sourceMappingURL=../maps/scripts/app-5e066a807e.js.map

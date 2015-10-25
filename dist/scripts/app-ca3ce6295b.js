function InstagramApiServices(e,t,a){function n(a){return e({method:"JSONP",url:a,cache:t}).then(function(e){return e.data},function(e){v.log("failed",e.status)})}function i(){var e=b+"users/self/media/recent"+h;return n(e)}function s(){var e=b+"users/self/media/recent?access_token="+p+"&min_id=1&callback=JSON_CALLBACK";return n(e)}function o(e){var t=b+"users/search?q="+e+"&access_token="+p+"&callback=JSON_CALLBACK";return n(t)}function r(e){var t=b+"users/"+e+h;return n(t)}function l(e){var t=b+"users/"+e+"/media/recent?access_token="+p+"&min_id=1&callback=JSON_CALLBACK";return n(t)}function c(){var e=b+"users/self/feed"+h;return n(e)}function m(){var e=b+"users/self/media/liked"+h;return n(e)}function d(e){var t=b+"users/"+e+"/follows"+h;return n(t)}function g(e){return n(e+"&callback=JSON_CALLBACK")}function u(e){var t=b+"media/"+e+"/comments?access_token="+p+"&callback=JSON_CALLBACK";return n(t)}var p="2242645048.f70a9cb.4754007deba943ffb47a3a1f2a8b757b",b="https://api.instagram.com/v1/",h="?access_token="+p+"&count=500&callback=JSON_CALLBACK",v=a;return{getMyMedia:i,getMyMedia20:s,getUserId:o,getUser:r,getUserRecentMedia:l,getUserFeed:c,getUserLiked:m,getUserFollows:d,getRecentComments:u,loadMore:g}}!function(){"use strict";angular.module("instantblog",["ngAnimate","ngCookies","ngTouch","ngSanitize","ngMessages","ngAria","ui.router","ngMaterial","firebase","toastr"])}(),function(){"use strict";function e(){function e(){return t}var t=[{title:"AngularJS",url:"https://angularjs.org/",description:"HTML enhanced for web apps!",logo:"angular.png"},{title:"BrowserSync",url:"http://browsersync.io/",description:"Time-saving synchronised browser testing.",logo:"browsersync.png"},{title:"GulpJS",url:"http://gulpjs.com/",description:"The streaming build system.",logo:"gulp.png"},{title:"Jasmine",url:"http://jasmine.github.io/",description:"Behavior-Driven JavaScript.",logo:"jasmine.png"},{title:"Karma",url:"http://karma-runner.github.io/",description:"Spectacular Test Runner for JavaScript.",logo:"karma.png"},{title:"Protractor",url:"https://github.com/angular/protractor",description:"End to end test framework for AngularJS applications built on top of WebDriverJS.",logo:"protractor.png"},{title:"Angular Material Design",url:"https://material.angularjs.org/#/",description:"The Angular reference implementation of the Google's Material Design specification.",logo:"angular-material.png"},{title:"Less",url:"http://lesscss.org/",description:"Less extends the CSS language, adding features that allow variables, mixins, functions and many other techniques.",logo:"less.png"}];this.getTec=e}angular.module("instantblog").service("webDevTec",e)}(),function(){"use strict";function e(){function e(e,t,a){var n=this;n.state=a,n.relativeDate=e(n.creationDate).fromNow(),n.searchUser=function(e){return""===e?void 0:t.getUserId(e).then(function(e){return e.data.slice(0,19)})},n.changeUser=function(e){angular.isUndefined(e)||null===e||a.go("/",{instauser:e})}}var t={restrict:"E",templateUrl:"app/components/navbar/navbar.html",scope:{creationDate:"="},controller:e,controllerAs:"vm",bindToController:!0};return e.$inject=["moment","InstagramApiServices","$state"],t}angular.module("instantblog").directive("ibNav",e)}(),function(){"use strict";function e(e){function t(t,a){var n=e(a[0],{typeSpeed:150,deleteSpeed:30,pauseDelay:1e3,loop:!0,postfix:" "});a.addClass("acme-malarkey"),angular.forEach(t.extraValues,function(e){n.type(e).pause()["delete"]()})}var a={restrict:"E",scope:{extraValues:"="},template:"&nbsp;",link:t};return a}angular.module("instantblog").directive("acmeMalarkey",e),e.$inject=["malarkey"]}(),angular.module("instantblog").service("InstagramApiServices",InstagramApiServices),InstagramApiServices.$inject=["$http","$templateCache","$log"],function(){"use strict";function e(e,t){function a(a){function i(e){return e.data}function s(t){e.error("XHR Failed for getContributors.\n"+angular.toJson(t.data,!0))}return a||(a=30),t.get(n+"/contributors?per_page="+a).then(i)["catch"](s)}var n="https://api.github.com/repos/Swiip/generator-gulp-angular",i={apiHost:n,getContributors:a};return i}angular.module("instantblog").factory("githubContributor",e),e.$inject=["$log","$http"]}(),angular.module("instantblog").directive("footer",["$mdBottomSheet","$mdToast","$document",function(e,t,a){return{templateUrl:"app/components/footer/footer.html",controller:function(){var e=this;e.showInfoToast=function(e){t.show({parent:a[0].querySelector(".ib-footer"),controller:["FireBaseService",function(a){var n=this;n.FireBaseService=a,n.infoType=e,n.closeToast=function(){t.hide()}}],controllerAs:"toast",templateUrl:"app/components/footer/ib-info-template.html",hideDelay:!1,position:"bottom"})}},controllerAs:"footer",restrict:"EA",link:function(){}}}]),function(){"use strict";function e(e,t,a,n,i,s){function o(){h.child("pagestat").set({totalPageViews:0,users:[{username:a.params.instauser,lastTimeStamp:b.ServerValue.TIMESTAMP,viewCounts:0}]})}function r(e){u.isStatUpdated=!1,h.once("value",function(t){var n=t.val().pagestat,i={};i.totalPageViews=n.totalPageViews+1,i.users=n.users,l(i.users,e).then(function(e){e.isInArray||i.users.push({username:a.params.instauser,lastTimeStamp:b.ServerValue.TIMESTAMP,viewCounts:1}),h.child("pagestat").set(i,d)}),u.totalPageViews=i.totalPageViews,u.totalUniqueUsers=i.users.length})}function l(e,t){var a=!1;return n(function(n){s(function(){for(var i=0;i<e.length;i++)if(e[i].username===t){e[i].viewCounts=e[i].viewCounts+1,a=!0;break}n({array:e,isInArray:a})},0)})}function c(){h.child("comments").set({totalComments:0,comments:[]})}function m(e){u.isCommentUpdated=!1,v.push({name:e.name,email:e.email,content:e.message,timeStamp:b.ServerValue.TIMESTAMP},g)}function d(e){e?p.log("Stat synchronization failed"):(u.isStatUpdated=!0,p.log("Stat Info Received"))}function g(e){e?p.log("Comment synchronization failed"):(u.isCommentUpdated=!0,p.log("Comment Received"))}var u=this,p=e,b=i.Firebase,h=new b("https://instantblog.firebaseio.com"),v=new b("https://instantblog.firebaseio.com/comments");return u.isStatUpdated=!1,u.isCommentUpdated=!1,u.fireBaseObject=t(h),u.updateFireStat=r,u.initializeStat=o,u.initializeComments=c,u.addToComments=m,u}angular.module("instantblog").service("FireBaseService",e),e.$inject=["$log","$firebaseArray","$state","$q","$window","$timeout"]}(),function(){"use strict";function e(){var e={link:function(e,t,a){a.ngSrc||a.$set("src",a.errsrc),t.bind("error",function(){a.$set("src",a.errsrc)}),t.on("$destroy",function(){})}};return e}angular.module("instantblog").directive("errsrc",e)}(),angular.module("instantblog").directive("blogTimeline",["$window","InstagramApiServices",function(e,t){return{templateUrl:"app/components/blog-timeline/blog-timeline.html",restrict:"EA",link:function(a){function n(e){a.isMoreCommentVisible?a.isMoreCommentVisible=!1:t.getRecentComments(e).then(function(e){a.gallery.recentComments=e.data.slice(0,e.data.length-8),i()})}function i(){a.isMoreCommentVisible=!a.isMoreCommentVisible}function s(){return e.innerWidth<767?!0:!1}a.isSmallScreen=s(),a.isMoreCommentVisible=!1,a.getRecentComments=n,a.isVisible=i,angular.element(e).bind("resize",function(){a.$apply(a.isSmallScreen=s())})}}}]),angular.module("instantblog").directive("blogBlock",["$window","InstagramApiServices",function(e,t){return{templateUrl:"app/components/blog-block/blog-block.html",restrict:"EA",link:function(e){function a(a){e.isMoreCommentVisible?e.isMoreCommentVisible=!1:t.getRecentComments(a).then(function(t){e.gallery.recentComments=t.data.slice(0,t.data.length-8),n()})}function n(){e.isMoreCommentVisible=!e.isMoreCommentVisible}e.isMoreCommentVisible=!1,e.getRecentComments=a,e.isVisible=n}}}]),function(){"use strict";function e(e,t,a){function n(){s(),e(function(){o.classAnimation="rubberBand"},4e3)}function i(){a.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>'),o.classAnimation=""}function s(){o.awesomeThings=t.getTec(),angular.forEach(o.awesomeThings,function(e){e.rank=Math.random()})}var o=this;o.awesomeThings=[],o.classAnimation="",o.creationDate=1445280787871,o.showToastr=i,n()}angular.module("instantblog").controller("MainController",e),e.$inject=["$timeout","webDevTec","toastr"]}(),function(){"use strict";function e(e,t){e.state("/",{url:"/:instauser",templateUrl:function(e){return"about"===e.instauser||""===e.instauser||null===e.instauser?"app/blog/about.html":"app/blog/blog.html"},controller:"BlogController",controllerAs:"blog",resolve:{CurrentInstaUser:["InstagramApiServices","$stateParams",function(e,t){function a(t){return t?e.getUser(t.id).then(function(t){return i.currentUser=t.data,t.data?e.getUserRecentMedia(t.data.id).then(function(e){return i.nextUrl=e.pagination.next_url,i.currentMedia=e.data,i.errorMessage="",i.isPrivate=!1,i}):(i.errorMessage=t.meta.error_message,i.isPrivate=!0,i)}):(i.errorMessage="user not found",i)}var n=t.instauser,i={};return i.usernameSearched=n,"about"===n?i:e.getUserId(n).then(function(e){if(!e.data||e.data.length<1)return i.errorMessage="user ( "+n+" ) not found",i;for(var t,s=0;s<e.data.length;s++)if(e.data[s].username===n){t=e.data[s];break}return i.currentUser=t,a(t)})}]}}),t.otherwise("/")}angular.module("instantblog").config(e),e.$inject=["$stateProvider","$urlRouterProvider"]}(),function(){"use strict";function e(e,t,a,n,i,s){function o(){s.hash("top"),i()}function r(){e.loadMore(m.nextUrl).then(function(e){Array.prototype.push.apply(m.currentMedia,e.data),m.nextUrl=e.pagination.next_url})}function l(t){return""===t?void 0:e.getUserId(t).then(function(e){return e.data.slice(0,19)})}function c(e){angular.isUndefined(e)||null===e||n.go("/",{instauser:e})}var m=this;m.timelineView=!0,m.CurrentInstaUser=t,m.currentUser=t.currentUser||{},m.currentMedia=t.currentMedia||{},m.nextUrl=t.nextUrl||null,m.FireBaseService=a,m.goToTop=o,m.loadMore=r,m.searchUser=l,m.changeUser=c}angular.module("instantblog").controller("BlogController",e),e.$inject=["InstagramApiServices","CurrentInstaUser","FireBaseService","$state","$anchorScroll","$location"]}(),function(){"use strict";function e(e,t,a,n){var i=t;i.$on("$stateChangeStart",function(){i.isPageLoading=!0}),i.$on("$stateChangeSuccess",function(){i.isPageLoading=!1,a.updateFireStat(n.params.instauser)}),e.debug("runBlock end")}angular.module("instantblog").run(e),e.$inject=["$log","$rootScope","FireBaseService","$state"]}(),function(){"use strict";function e(e){e.html5Mode(!0)}angular.module("instantblog").config(e),e.$inject=["$locationProvider"]}(),function(){"use strict";angular.module("instantblog").constant("malarkey",malarkey).constant("moment",moment)}(),function(){"use strict";function e(e,t){e.debugEnabled(!0),t.allowHtml=!0,t.timeOut=3e3,t.positionClass="toast-top-right",t.preventDuplicates=!0,t.progressBar=!0}angular.module("instantblog").config(e),e.$inject=["$logProvider","toastrConfig"]}(),angular.module("instantblog").run(["$templateCache",function(e){e.put("app/blog/about.html",'<div class="ib-about-container ib-info-block" ng-cloak=""><md-tabs md-dynamic-height="" md-border-bottom=""><md-tab ng-cloak=""><md-tab-label>About</md-tab-label><md-tab-body><md-content layout-padding=""><p class="text-4x">InstantBlog allows you to view your <a href="https://instagram.com">Instagram</a> account in a one-page diary/blog format. All you need to do is to replace <span class="text-italic text-red">YourUserName</span> with your Instagram\'s username in this link: <span class="text-italic">http://instantblog.me/<span class="text-red">YourUserName</span></span>. For example:</p></md-content><md-content layout-padding="" class="malarkey-class"><div class="text-center text-5x">http://instantblog.me/<acme-malarkey extra-values="[\'mynameisyan\', \'instagram\', \'yourname\']"></acme-malarkey></div></md-content><div class="text-right ib-search-wrapper"><div class="ib-nav-search"><form ng-submit="$event.preventDefault()"><md-autocomplete md-selected-item="blog.user" md-search-text-change="blog.searchUser(blog.username)" md-search-text="blog.username" md-items="user in blog.searchUser(blog.username)" md-item-text="user.username" md-min-length="1" placeholder="Search for an Instagram user" md-menu-class="autocomplete-custom-template"><md-item-template><div ng-click="blog.changeUser(user.username)"><img ng-src="{{user.profile_picture}}" alt="{{user.username}}" class="img-circle searched-user-thumb-sm"> <span>{{user.username}}</span></div></md-item-template></md-autocomplete></form></div></div><md-content layout-padding="" class="ib-preview text-center text-3x"><p>This is how mine looks like:</p><p><a href="/mynameisyan">http://instantblog.me/<span class="text-red">mynameisyan</span></a></p><img class="full-width" src="assets/images/preview.jpg" alt=""></md-content><md-content layout-padding=""><p class="text-3x text-italic">You might want to know ...</p><hr><p>- InstantBlog uses are for <strong>FREE</strong>.</p><p>- Private users\' accounts are NOT viewable on InstantBlog.</p><p>- Feel free to use InstantBlog\'s link as your personal blog page, and to share it with your friends.</p><p>- <span class="text-blue text-3x">{{blog.FireBaseService.totalPageViews}}</span> page views since InstantBlog is published on Oct 24, 2015, with <span class="text-blue text-3x">{{blog.FireBaseService.totalUniqueUsers}}</span> unique Instagram usernames searched.</p></md-content><md-content layout-padding=""><blockquote class="text-3x"><p>"Thank you for using InstantBlog. I hope you are liking it so far! ^ - ^</p><p>I created InstantBlog because I was trying to help my cousin build a simple online \'Baby Journal\' for her baby, where she can post pictures and write stories daily, then to share with family and friends who cares. At that time, I just got finished making a "Gallery" for <a href="http://yan-chen.github.io/#/gallery">my own website</a> by pulling images from my <a href="https://instagram.com">Instagram</a> account, I then came up with this idea of creating InstantBlog.</p><p>I will keep improving and refining InstantBlog when time allows. If you have any questions and suggestions, you are welcome to leave me a message under the <strong>Contact</strong> section.</p><p>Thank you for your support ~ !"</p><p>&nbsp;</p><p>--<i><a href="/mynameisyan">Yan Chen</a></i></p></blockquote><br><br><md-content layout-padding="" class="text-center"><small class="text-grey"><i class="glyphicon glyphicon-copyright-mark"></i> InstantBlog 2015. All rights reserved.</small></md-content></md-content></md-tab-body></md-tab><md-tab ng-cloak=""><md-tab-label>Contact</md-tab-label><md-tab-body><div class="ib-md-input"><p>If you have any questions/comments/suggestions, please feel free to send me an <a href="mailto:ychen.0931@gmail.com"><md-icon class="text-10x text-blue">email</md-icon><md-tooltip>ychen.0931@gmail.com</md-tooltip></a> , or leave me a message below.</p><br><form name="commentForm"><div><md-input-container><label>Your Comment</label> <textarea required="" name="message" rows="3" ng-model="toast.message" minlength="1" maxlength="1000"></textarea><div ng-messages="commentForm.message.$error"><div ng-message="required">This is required.</div></div></md-input-container></div><div layout="" layout-sm="column"><md-input-container style="width:80%"><label>Your Name</label> <input required="" name="name" type="text" ng-model="toast.name" minlength="1" maxlength="100"><div ng-messages="commentForm.name.$error"><div ng-message="required">This is required.</div></div></md-input-container><md-input-container style="width:80%"><label>Your Email</label> <input type="email" name="email" ng-model="toast.email" ng-pattern="/^.+@.+\\..+$/" minlength="0" maxlength="100"><div ng-messages="commentForm.email.$error" role="alert"><div ng-message-exp="[\'minlength\', \'maxlength\', \'pattern\']">Please enter a valid e-mail address.</div></div></md-input-container></div><br><md-button class="md-raised" ng-click="toast.FireBaseService.addToComments(toast)">Submit Comments</md-button><p class="text-red" ng-if="toast.FireBaseService.isCommentUpdated">Thank you! Your message has been received.</p></form></div></md-tab-body></md-tab></md-tabs></div>'),e.put("app/blog/blog.html",'<div class="blog-container"><a id="top"></a><div class="ib-float-fab"><md-fab-speed-dial md-open="blog.isFabOpen" md-direction="left" ng-class=""><md-fab-trigger><md-button aria-label="menu" class="md-fab md-mini"><i class="glyphicon glyphicon-menu-hamburger"></i></md-button></md-fab-trigger><md-fab-actions><md-button aria-label="timeline" class="md-fab md-raised md-mini" ng-class="{\'active\':blog.timelineView}" ng-click="blog.timelineView=true"><i class="glyphicon glyphicon-calendar"></i></md-button><md-button aria-label="list" class="md-fab md-raised md-mini" ng-class="{\'active\':!blog.timelineView}" ng-click="blog.timelineView=false"><i class="glyphicon glyphicon-list"></i></md-button><md-button aria-label="top" class="md-fab md-raised md-mini" ng-click="blog.goToTop()"><i class="glyphicon glyphicon-arrow-up"></i></md-button></md-fab-actions></md-fab-speed-dial></div><div class="loading-indicator text-center" ng-if="rootscope.isPageLoading"><img class="full-width" src="assets/images/loader_gears.svg" alt=""></div><div layout="row" layout-sm="column" class="hide-sm"><div class="ib-logo-wrapper" flex="30" flex-sm="1"><a href="/about"><div class="ib-logo">InstantBlog</div></a></div><div class="text-right ib-search-wrapper" flex="70" flex-sm="99" ng-cloak=""><div class="search-box"><form ng-submit="$event.preventDefault()"><md-autocomplete md-selected-item="blog.user" md-search-text-change="blog.searchUser(blog.username)" md-search-text="blog.username" md-items="user in blog.searchUser(blog.username)" md-item-text="user.username" md-min-length="1" placeholder="Search for an Instagram user" md-menu-class="autocomplete-custom-template"><md-item-template><div ng-click="blog.changeUser(user.username)" ng-cloak=""><img ng-src="{{user.profile_picture}}" alt="{{user.username}}" class="img-circle searched-user-thumb-sm"> <span>{{user.username}}</span></div></md-item-template></md-autocomplete></form></div></div></div><div class="ib-logo-wrapper sm hide-gt-sm"><a href="/about"><div class="ib-logo">InstantBlog</div></a></div><md-content><div class="blog-header text-center"><img class="full-width" ng-src="{{blog.currentUser.profile_picture}}" errsrc="assets/images/tree.jpg" alt=""></div><p class="lead user-profile"><img class="img-circle" ng-src="{{blog.currentUser.profile_picture}}" errsrc="assets/images/user_profile.png" alt=""><br></p><div class="text-center user-info"><p class="text-5x"><a href="http://www.instagram.com/{{blog.currentUser.username}}">{{blog.currentUser.username}}</a></p><p class="text-4x">{{blog.currentUser.full_name}}</p><p class="text-2x text-grey" layout-padding="" ng-if="blog.currentUser.counts"><strong>{{blog.currentUser.counts.media}}</strong> Posts &nbsp;| &nbsp; <strong>{{blog.currentUser.counts.followed_by}}</strong> Followers &nbsp;| &nbsp; <strong>{{blog.currentUser.counts.follows}}</strong> Followering</p><p class="text-4x text-red ib-user-error" ng-if="blog.CurrentInstaUser.isPrivate">Private User Account.</p><p class="text-4x text-red ib-user-error" ng-if="blog.CurrentInstaUser.errorMessage">Sorry, {{blog.CurrentInstaUser.errorMessage}}.</p><p class="text-3x">{{blog.currentUser.bio}}</p><p class="text-2x"><a href="{{blog.currentUser.website}}">{{blog.currentUser.website}}</a></p></div><div class="blog-content"><div ng-if="blog.timelineView" class="timeline-view"><div class="yy-blog-timeline"><div data-blog-timeline="" class="row margin-0 full-width" ng-repeat="gallery in blog.currentMedia track by $index"></div></div></div><div ng-if="!blog.timelineView" class="block-view"><div class="yy-blog-block"><div ng-repeat="gallery in blog.currentMedia track by $index" data-blog-block=""></div></div></div><div class="row text-center blog-loadmore margin-0" ng-if="blog.nextUrl && blog.currentMedia.length<blog.currentUser.counts.media"><md-button class="md-flat yy-md-blue yy-btn-lg" ng-click="blog.loadMore()">Load More &nbsp; &nbsp;<i class="glyphicon glyphicon-chevron-down text-1x"></i></md-button></div><div class="row text-center blog-loadmore margin-0" ng-if="!blog.nextUrl && blog.currentMedia.length>=blog.currentUser.counts.media"><p class="text-3x text-blue">E&nbsp;N&nbsp;D</p></div></div></md-content><footer></footer></div>'),e.put("app/main/main.html",'<div layout="vertical" layout-fill=""><md-content><header><acme-navbar creation-date="main.creationDate"></acme-navbar></header><section class="jumbotron"><h1>\'Allo, \'Allo!</h1><p class="lead"><img src="assets/images/yeoman.png" alt="I\'m Yeoman"><br>Always a pleasure scaffolding your apps.</p><md-button class="md-raised animated infinite" ng-class="main.classAnimation" ng-click="main.showToastr()">Splendid Toastr</md-button><p>With ♥ thanks to the contributions of<acme-malarkey extra-values="[\'Yeoman\', \'Gulp\', \'Angular\']"></acme-malarkey></p></section><div class="techs" layout-align="center"><md-card ng-repeat="awesomeThing in main.awesomeThings | orderBy:\'rank\'"><md-card-content><img class="pull-right" ng-src="assets/images/{{ awesomeThing.logo }}" alt="{{ awesomeThing.title }}"><h3 class="md-title">{{ awesomeThing.title }}</h3><p class="">{{ awesomeThing.description }}</p></md-card-content><div class="md-action-buttons"><md-button ng-href="{{ awesomeThing.url }}">Website</md-button></div></md-card></div></md-content></div>'),e.put("app/components/blog-timeline/blog-timeline.html",'<div class="yy-blog-timeline-box" ng-class="{\'sm\':isSmallScreen,\'left\':$odd && !isSmallScreen,\'right\':$even||isSmallScreen}"><div class="clearfix"><div class="yy-blog-timeline-date">{{gallery.created_time*1000| date:\'MMM dd, yyyy, EEEE, HH:mma\'}}</div><div class="yy-blog-timeline-index">#{{$index+1}}</div></div><div class="yy-blog-timeline-box-inner"><div class="yy-blog-timeline-image-container hide-sm"><a href=""><img class="" ng-src="{{gallery.images.low_resolution.url}}" alt=""></a></div><div class="yy-blog-timeline-node"><i class="glyphicon glyphicon-time"></i></div><div class="yy-blog-timeline-content"><div class="yy-blog-timeline-location"><a href="https://instagram.com/explore/locations/{{gallery.location.id}}/">{{gallery.location.name}}</a></div><div class="yy-blog-timeline-image-container hide-gt-sm"><a href=""><img class="full-width" ng-src="{{gallery.images.low_resolution.url}}" alt=""></a></div><div class="clearfix text-1x"><i class="glyphicon glyphicon-heart-empty text-red"></i> {{gallery.likes.count}}&nbsp;&nbsp; <i class="glyphicon glyphicon-comment text-blue"></i> {{gallery.comments.count}}</div><div class="gallery-image-caption">{{gallery.caption.text}}</div><div ng-include="\'app/components/blog-block/comment.tpl.html\'"></div></div></div></div>'),e.put("app/components/footer/footer.html",'<div layout="row" layout-align="center center" class="ib-footer"><div class="text-center text-2x"><md-button flex="50" class="md-flat"><a href="/about">Home</a></md-button>|<md-button flex="50" class="md-flat" ng-click="footer.showInfoToast(\'About\')">About</md-button>|<md-button flex="50" class="md-flat" ng-click="footer.showInfoToast(\'Contact\')">Contact</md-button><p class="text-center text-1x"><i class="glyphicon glyphicon-copyright-mark"></i> InstantBlog 2015. All rights reserved.</p></div></div>'),e.put("app/components/footer/ib-info-template.html",'<md-toast class="md-has-header ib-info-block text-left" ng-cloak=""><div class="ib-toast-content"><div class="text-right"><md-button ng-click="toast.closeToast()">Close X</md-button></div><div class="text-4x">{{toast.infoType}}</div><hr><div ng-if="toast.infoType===\'About\'"><div layout-padding=""><p class="text-3x">InstantBlog allows you to view your <a href="https://instagram.com">Instagram</a> account in a one-page diary/blog format. All you need to do is to replace YourUserName with your Instagram\'s username in this link: <span class="text-italic">http://instantblog.me/<span class="text-red">YourUserName</span></span>. For example:</p><md-content><div class="text-center text-3x">http://instantblog.me/<acme-malarkey extra-values="[\'mynameisyan\', \'instagram\', \'awesome_name\']"></acme-malarkey></div></md-content></div><div layout-padding="" class="text-3x"><p class="text-italic">You might want to know ...</p><hr><p>- InstantBlog uses are for <strong>FREE</strong>.</p><p>- Private users\' accounts are NOT viewable on InstantBlog.</p><p>- Feel free to use InstantBlog\'s link as your personal blog page, and to share it with your friends.</p><p>- <span class="text-blue text-3x">{{footer.FireBaseService.totalPageViews}}</span> page views since InstantBlog is published on Oct 24, 2015, with <span class="text-blue text-3x">{{footer.FireBaseService.totalUniqueUsers}}</span> unique Instagram usernames searched.</p></div></div><div ng-if="toast.infoType===\'Contact\'" class="ib-md-input"><p>If you have any questions/comments/suggestions, please feel free to send me an <a href="mailto:ychen.0931@gmail.com"><md-icon class="text-10x text-blue">email</md-icon><md-tooltip>ychen.0931@gmail.com</md-tooltip></a> , or leave me a message below.</p><br><form name="commentForm"><div><md-input-container><label>Your Comment</label> <textarea required="" name="message" rows="3" ng-model="toast.message" minlength="1" maxlength="1000"></textarea><div ng-messages="commentForm.message.$error"><div ng-message="required">This is required.</div></div></md-input-container></div><div layout="" layout-sm="column"><md-input-container style="width:50%"><label>Your Name</label> <input required="" name="name" type="text" ng-model="toast.name" minlength="1" maxlength="100"><div ng-messages="commentForm.name.$error"><div ng-message="required">This is required.</div></div></md-input-container><md-input-container style="width:50%"><label>Your Email (optional)</label> <input type="email" name="email" ng-model="toast.email" ng-pattern="/^.+@.+\\..+$/" minlength="0" maxlength="100"><div ng-messages="commentForm.email.$error" role="alert"><div ng-message-exp="[\'minlength\', \'maxlength\', \'pattern\']">Please enter a valid e-mail address.</div></div></md-input-container></div><md-button class="md-raised" ng-click="toast.FireBaseService.addToComments(toast)">Submit Comments</md-button><div class="text-center"><small class="text-red" ng-if="toast.FireBaseService.isCommentUpdated">Thank you! Your message has been received.</small></div></form></div></div></md-toast>'),e.put("app/components/blog-block/blog-block.html",'<div class="yy-blog-block-image-container"><a href=""><img class="full-width" ng-src="{{gallery.images.standard_resolution.url}}" alt=""></a></div><div class="yy-blog-block-inner"><div class="clearfix"><div class="yy-blog-block-date float-left">{{gallery.created_time*1000| date:\'MMM dd, yyyy, EEEE, HH:mm\'}}</div><div class="yy-blog-block-index float-right">#{{$index+1}}</div></div><hr><div class="yy-blog-block-content"><div class="yy-blog-block-location"><a href="https://instagram.com/explore/locations/{{gallery.location.id}}/">{{gallery.location.name}}</a><div class="float-right"><i class="glyphicon glyphicon-heart-empty text-red"></i> {{gallery.likes.count}}&nbsp;&nbsp; <i class="glyphicon glyphicon-comment text-blue"></i> {{gallery.comments.count}}</div></div><div class="gallery-image-caption">{{gallery.caption.text}}</div><div ng-include="\'app/components/blog-block/comment.tpl.html\'"></div></div></div>'),e.put("app/components/blog-block/comment.tpl.html",'<div class="text-2x" ng-repeat="comment in gallery.comments.data|orderBy:\'-created_time\' track by $index" ng-if="!!gallery.comments.data"><div class="gallery-image-comment"><a href="https://instagram.com/{{comment.from.username}}"><img ng-src="{{comment.from.profile_picture}}" class="img-circle"> <strong>{{comment.from.username}}</strong></a> <span class="comment-text"><span class="text-1x text-grey">{{comment.created_time*1000| date:\'M-d, HH:mm\'}}</span> {{comment.text}}</span></div></div><div class="text-2x" ng-if="gallery.comments.count>8"><p layout-padding="" class="no-outline" ng-click="getRecentComments(gallery.id)"><a href="">View more recent comments <i class="glyphicon glyphicon-chevron-down" ng-if="!isMoreCommentVisible"></i> <i class="glyphicon glyphicon-chevron-up" ng-if="isMoreCommentVisible"></i></a></p><div class="more-recent-comments" ng-if="isMoreCommentVisible"><div class="text-2x" ng-repeat="comment in gallery.recentComments|orderBy:\'-created_time\' track by $index" ng-if="!!gallery.comments.data"><div class="gallery-image-comment"><a href="https://instagram.com/{{comment.from.username}}"><img ng-src="{{comment.from.profile_picture}}" class="img-circle"> <strong>{{comment.from.username}}</strong></a> <span class="comment-text">{{comment.text}}</span></div></div><p layout-padding=""><a href="" ng-click="isVisible()">Hide <i class="glyphicon glyphicon-chevron-up"></i></a>&nbsp;&nbsp;&nbsp; <a href="{{gallery.link}}" ng-if="gallery.comments.count>gallery.recentComments.length+8">View all {{gallery.comments.count}} comments</a></p></div></div>'),e.put("app/components/navbar/navbar.html",'<div class="ib-nav" ng-if="vm.state.params.instauser===\'about\'||vm.state.params.instauser===\'\'"><div class="ib-logo-wrapper hide-sm"><div class="ib-logo"><a href="/about">InstantBlog</a></div></div><div class="ib-logo-wrapper" hide-gt-sm=""><a href="/about"><div class="ib-logo">InstantBlog</div></a></div></div>')}]);
//# sourceMappingURL=../maps/scripts/app-ca3ce6295b.js.map

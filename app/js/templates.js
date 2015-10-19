angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("footer.html","<footer>\n  hello i\'m a footer\n</footer>");
$templateCache.put("header.html","<header>\n  hello this is header\n\n  <div ng-include=\"\'login.html\'\"></div>\n\n</header>\n");
$templateCache.put("home.html","<div ng-include=\"\'header.html\'\"></div>\n\n<div ng-include=\"\'nav.html\'\"></div>\n\n<h1 class=\"heading-large\">{{ title }}</h1>\n\n<h3 class=\"heading-medium\">Here is a fancy number served up courtesy of Angular: <span class=\"number-example\">{{ home.number }}</span></h3>\n\n<ol>\n  <li ng-repeat=\"topic in topics\">\n    <button ng-click=\"upVoteTopic(topic.id)\">Up</button>\n    {{topic.score}}\n    <button ng-click=\"downVoteTopic(topic.id)\">Down</button>\n    <a href=\"{{topic.article_link}}\">{{topic.title}}</a>\n    <aside>Submitted by <a href=\"#/user/{{topic.created_by}}\">{{topic.created_by}}</a> on {{topic.created_on}}</aside>\n  </li>\n</ol>\n\n<div ng-include=\"\'footer.html\'\"></div>\n");
$templateCache.put("login.html","<div ng-controller=\"AuthCtrl\">\n\n  <ul ng-show=\"isLoggedIn()\">\n    <li>\n      <a href=\"#/users/{{ user.username }}\">\n        {{ user.username }}\n      </a>\n    </li>\n    <li>\n      <a href=\"#\" ng-click=\"logout()\">Logout</a>\n    </li>\n  </ul>\n\n  <form ng-submit=\"login()\" ng-hide=\"isLoggedIn()\">\n    <h2>Log In</h2>\n    <p ng-show=\"errors.general\">{{ errors.general }}</p>\n    <label for=\"username\">Username</label>\n    <input id=\"username\" type=\"text\" ng-model=\"user.username\" placeholder=\"Username\">\n    <p ng-show=\"errors.username\">{{ errors.username }}</p>\n\n    <br>\n\n    <label for=\"password\">Password</label>\n    <input id=\"password\" type=\"password\" ng-model=\"user.password\" placeholder=\"Password\">\n    <p ng-show=\"errors.password\">{{ errors.password }}</p>\n\n    <br>\n\n    <input type=\"submit\" value=\"Log in\" />\n    <a href=\"#/register\">Register</a>\n  </form>\n\n</div>\n");
$templateCache.put("nav.html","<nav>\n  imma nav\n</nav>");}]);
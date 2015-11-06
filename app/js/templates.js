angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("footer.html","<footer>\n  <hr>\n  hello i\'m a footer\n</footer>");
$templateCache.put("header.html","<header>\n  hello this is header\n  <hr>\n  <div ng-include=\"\'login.html\'\"></div>\n  <hr>\n</header>\n");
$templateCache.put("home.html","<h1 class=\"heading-large\">{{ title }}</h1>\n\n<a href=\"/submit\">Submit a topic</a>\n\n<ol>\n  <li ng-repeat=\"topic in topics\">\n    <button ng-click=\"upVoteTopic($index)\" ng-class=\"{upvoted: isUpVoted($index)}\">\n      Up\n    </button>\n    {{topic.score}}\n    <button ng-click=\"downVoteTopic($index)\" ng-class=\"{downvoted: isDownVoted($index)}\">\n      Down\n    </button>\n    <a href=\"{{topic.article_link}}\">{{topic.title}}</a>\n    <aside class=\"error\" ng-show=\"topic.error\">{{topic.error}}</aside>\n    <aside>Submitted by <a href=\"#/user/{{topic.created_by}}\">{{topic.created_by}}</a> on {{topic.created_on}}</aside>\n  </li>\n</ol>\n");
$templateCache.put("login.html","<div ng-controller=\"AuthCtrl\">\n\n  <ul ng-show=\"isLoggedIn()\">\n    <li>\n      <a href=\"#/users/{{ user.username }}\">\n        {{ user.username }}\n      </a>\n    </li>\n    <li>\n      <a href=\"#\" ng-click=\"logout()\">Logout</a>\n    </li>\n  </ul>\n\n  <div ng-hide=\"isLoggedIn()\">\n    <form ng-submit=\"login()\" ng-hide=\"isRegister()\">\n      <h2>Log In</h2>\n      <p ng-show=\"errors.general\">{{ errors.general }}</p>\n      <label for=\"username\">Username</label>\n      <input id=\"username\" type=\"text\" ng-model=\"user.username\" aria-describedby=\"usernameError\" placeholder=\"Username\">\n      <p ng-show=\"errors.username\" id=\"usernameError\">{{ errors.username }}</p>\n\n      <br>\n\n      <label for=\"password\">Password</label>\n      <input id=\"password\" type=\"password\" ng-model=\"user.password\" aria-describedby=\"passwordError\" placeholder=\"Password\">\n      <p ng-show=\"errors.password\" id=\"passwordError\">{{ errors.password }}</p>\n\n      <br>\n\n      <input type=\"submit\" value=\"Log in\" />\n      <br>\n      <button type=\"button\" ng-click=\"toggleRegister()\">Register?</button>\n    </form>\n\n    <form ng-submit=\"register()\" ng-show=\"isRegister()\">\n      <h2>Register</h2>\n      <p ng-show=\"errors.general\">{{ errors.general }}</p>\n      <label for=\"username\">Username</label>\n      <input id=\"username\" type=\"text\" ng-model=\"user.username\" placeholder=\"Username\">\n      <p ng-show=\"errors.username\">{{ errors.username }}</p>\n\n      <br>\n\n      <label for=\"password\">Password</label>\n      <input id=\"password\" type=\"password\" ng-model=\"user.password\" placeholder=\"Password\">\n      <p ng-show=\"errors.password\">{{ errors.password }}</p>\n\n      <br>\n\n      <input type=\"submit\" value=\"Register\" />\n      <br>\n      <button type=\"button\" ng-click=\"toggleRegister()\">Log In?</button>\n    </form>\n\n  </div>\n\n</div>\n");
$templateCache.put("nav.html","<nav>\n  <a href=\"/\">Home</a>\n  <hr>\n</nav>");
$templateCache.put("submit.html","<form ng-controller=\"TopicSubmitCtrl\" ng-submit=\"submit()\">\n  <h1>Submit a topic</h1>\n\n  <p ng-show=\"errors.general\">{{ errors.general }}</p>\n  <label for=\"title\">Title</label>\n  <input id=\"title\" type=\"text\" ng-model=\"topic.title\" placeholder=\"Title\" required>\n  <p ng-show=\"errors.title\" id=\"\">{{ errors.title }}</p>\n\n  <br>\n\n  <label for=\"article_link\">Article Link</label>\n  <input id=\"article_link\" type=\"url\" ng-model=\"topic.article_link\" placeholder=\"Article Link\" required>\n  <p ng-show=\"errors.article_link\">{{ errors.article_link }}</p>\n\n  <br>\n\n  <input type=\"hidden\" ng-model=\"topic.created_by\" value=\"1\"/>\n\n  <aside class=\"error\" ng-show=\"errors.auth\">{{ errors.auth }}</aside>\n\n  <input type=\"submit\" value=\"Submit\" />\n</form>\n");}]);
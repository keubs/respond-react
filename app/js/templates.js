angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("footer.html","<footer>\n  hello i\'m a footer\n</footer>");
$templateCache.put("header.html","<header>\n  hello this is header\n</header>");
$templateCache.put("home.html","<div ng-include=\"\'header.html\'\"></div>\n\n<div ng-include=\"\'nav.html\'\"></div>\n\n<h1 class=\"heading-large\">{{ title }}</h1>\n\n<h3 class=\"heading-medium\">Here is a fancy number served up courtesy of Angular: <span class=\"number-example\">{{ home.number }}</span></h3>\n\n<ol>\n  <li ng-repeat=\"topic in topics\">\n    <button>Up</button>\n    {{topic.score}}\n    <button>Down</button>\n    <a href=\"{{topic.article_link}}\">{{topic.title}}</a>\n    <aside>Submitted by <a href=\"#/user/{{topic.created_by}}\">{{topic.created_by}}</a> on {{topic.created_on}}</aside>\n  </li>\n</ol>\n\n<div ng-include=\"\'footer.html\'\"></div>\n");
$templateCache.put("nav.html","<nav>\n  imma nav\n</nav>");}]);
'use strict';

const angular = require('angular');

exports = angular.module('viewControllers', [])
            .controller('FooterCtrl', require('./footer-controller'));
            // .controller('NavBarCtrl', require('./navbar-controller')),
            // .controller('ModalCtrl', require('./modal-controller'));
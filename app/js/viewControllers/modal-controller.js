'use strict';
/**
 * @ngInject
 **/
module.exports = function ($scope, $uibModal) {
	$uibModal.open({
        animation: true,
        templateUrl: '../views/submit-action.html',
        controller: 'ModalInstanceCtrl',
        size: 'lg',
    });
};
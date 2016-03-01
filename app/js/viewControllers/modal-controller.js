'use strict';
/**
 * @ngInject
 **/
module.exports = function ($scope, $uibModal, $log) {
    var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: '../views/submit-action.html',
        controller: 'ModalInstanceCtrl',
        size: 'lg',
    });
};
'use strict';

const angular = require('angular');

exports = angular.module('topics', [])
            .controller('TopicsCtrl', require('./topics-controller'))
            .controller('DeleteContentCtrl', require('./delete-controller'))
            .controller('ModalActionCtrl', require('./modal-action-controller'))
            .controller('ModalContentCtrl', require('./modal-controller'))
            .controller('TopicSubmitCtrl', require('./topic-submit-controller'))
            .controller('ActionSubmitCtrl', require('./action-submit-controller'))
            .controller('ActionDetailsCtrl', require('./action-details-controller'))
            .controller('TopicCtrl', require('./topic-controller')) // Singular
            .controller('ActionCtrl', require('./action-controller'))
            .controller('ActionsCtrl', require('./actions-controller'))
            .service('AddressService', require('./address-service'))
            .service('ActionService', require('./action-service'))
            .service('SearchService', require('./search-service'))
            .service('TopicService', require('./topics-service'))
            .service('LinkFactory', require('./link-factory'))
            .service('LinkService', require('./link-service'))
            .service('VoteService', require('./vote-service'))
            .service('TagsService', require('./tags-service'));

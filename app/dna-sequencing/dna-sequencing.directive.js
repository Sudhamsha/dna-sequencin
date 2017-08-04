angular.module('myApp').directive('readList', function() {
    return {
        scope: {
            items: '='
        },
        bindToController: true,
        templateUrl: "/dna-sequencing/readListItem.html",
        replace: true,
        controller:'DNASequencingDirective',
        controllerAs: 'ctrl',
    }
}).controller('DNASequencingDirective', function($scope) {

});
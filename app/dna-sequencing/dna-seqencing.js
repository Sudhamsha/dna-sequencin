'use strict';

angular.module('myApp.dnaSequencing', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'dna-sequencing/dna-sequencing.html',
            controller: 'DNASequencing'
        });
    }])

    .controller('DNASequencing', ['$scope', '$http', '$mdToast', function($scope, $http, $mdToast) {

        $scope.total = {};
        $scope.totalLen = {};
        $scope.positions = {};
        $scope.getReads = function () {
            $http.get('http://localhost:8080/api/getReads', []).then(function(response) {
                $scope.items = response.data;
            }, function(error){
                alert("Problem Getting reads");
            });
        };

        $scope.addReadItems = function(e) {
            console.log("h");
            $scope.items.push({
                "readName": "",
            });
        };

        $scope.randomDNA = function(index) {
            var text = "";
            var possible = "CAGT";

            for (var i = 0; i < 150; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            $scope.items[index].readName =  text;
        };

        $scope.saveReads = function () {
            $http.post('http://localhost:8080/api/postReads', {'reads': $scope.items}).then(function(response) {
                $scope.items = response.data;
            }, function(error){
                console.log(error);
                alert("Problem Posting reads");
            });
        };

        $scope.removeRead = function (index) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent('READ removed, please click on save to apply!')
                    .position({ bottom: true, right: true} )
                    .hideDelay(3000)
            );
            $scope.items.splice(index, 1);


        };


        function countOcurrences(str, value) {
            var regExp = new RegExp(value, "gi");
            return (str.match(regExp) || []).length;
        }

        $scope.searchRead = function (search, index) {

            $scope.positions[index] = {};
            $scope.positions[index]['counter'] = 0;
            $scope.total[index] = countOcurrences($scope.items[index].readName, search);
            $scope.positions[index]['text'] = "#1 at " + $scope.items[index].readName.indexOf(search);
            $scope.positions[index]['current_position'] = $scope.items[index].readName.indexOf(search);
            $scope.positions[index]['counter'] = $scope.positions[index]['counter'] + 1;

            angular.forEach($scope.total, function(value, key) {
                if(value > 0){
                    console.log(value);
                    $scope.totalLen[key] = 1;
                } else{
                    $scope.totalLen[key] = 0;
                }
            } );

            $scope.totalLength = Object.keys($scope.totalLen).length;
        };

        $scope.nextOccurence = function (search, index, currentPosition, counter) {
            if(counter + 1 <= $scope.total[index]){
                $scope.positions[index]['counter'] = counter + 1;
                $scope.positions[index]['text'] = "#"+$scope.positions[index]['counter'] +" at position " + $scope.items[index].readName.indexOf(search, currentPosition+1);
                $scope.positions[index]['current_position'] = $scope.items[index].readName.indexOf(search, currentPosition+1);
            }

        };

        $scope.prevOccurence = function (search, index, currentPosition, counter) {
            if(counter - 1 != 0){
                $scope.positions[index]['counter'] = counter - 1;
                $scope.positions[index]['text'] = "#"+$scope.positions[index]['counter'] +" at position: " + $scope.items[index].readName.lastIndexOf(search, currentPosition-1);
                $scope.positions[index]['current_position'] = $scope.items[index].readName.lastIndexOf(search, currentPosition-1);
            }
        };


        // On Initialise get a reads!
        $scope.init = function(){
            $scope.getReads();
        };

        // Initialise on load
        $scope.init();
    }]);

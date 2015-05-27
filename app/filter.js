angular.module('sdHacksApp')
    //Strip symbols from a string
    .filter('indexToNumber', function(){
        return function(input){
            return String.fromCharCode((input||0)+65);
        }
    });
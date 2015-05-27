angular.module("sdHacksApp")
    .controller('registerController',function($scope, $document){
        $scope.answers = [];
        $scope.prnt=function(){
            console.log($scope.answers);
        };
        $scope.questions=[
            {
                'questionText':'Name',
                'questionType':'text',
                'required':'true'
            },
            {
                'questionText':'Expected Graduation Date',
                'questionType':'radio',
                'required':'true',
                'options':[
                    {
                        'optionText':'2015',
                        'value':'2015'
                    },
                    {
                        'optionText':'2016',
                        'value':'2016'
                    },
                    {
                        'optionText':'2017',
                        'value':'2017'
                    },
                    {
                        'optionText':'2018',
                        'value':'2018'
                    }
                ]
            },
            {
                'questionText': 'Interests',
                'questionType': 'checkbox',
                'required':'true',
                'options': [
                    {
                        'optionText': 'Computer Science',
                        'value': '1'
                    },
                    {
                        'optionText': 'Computer Engineering',
                        'value': '2'
                    },
                    {
                        'optionText': 'Biotechnology',
                        'value': '3'
                    },
                    {
                        'optionText': 'Garbage Collection',
                        'value': '-1'
                    }
                ]
            },
            {
                'questionText':'Current University',
                'questionType':'text',
                'required':'false'
            },
            {
                'questionText':'Any Food Allergies?',
                'questionType':'text',
                'required':'false'
            }
        ];
        $scope.q1={
            'questionText':'Hello World!'
        };

    });
angular.module("sdHacksApp")
    .directive('question', function($window, $document, $timeout){
        return{
            restrict:'A',
            replace: true,
            scope:{
                //Question Object
                question:'=',
                //Current Question Number (1 Based)
                questionNumber:'@',
                //Array of Answers
                answers:'='
            },
            templateUrl:'registerQuestion.html',
            link: function(scope, elem, attrs){
                //Record user selected choice for question
                scope.choiceSelect = function(questionNumber, choiceValue){
                    //Do not run if centered
                    if(!scope.centered)
                        return;
                    switch(scope.question.questionType){
                        case 'checkbox':
                            if(!scope.answers[questionNumber])
                                scope.answers[questionNumber]=[];
                            //Checkboxes use a dictionary and toggle true/false for selection
                            scope.answers[questionNumber][choiceValue+'']=!(scope.answers[questionNumber][choiceValue+'']||false);
                            break;
                        case 'text':
                        case 'radio':
                        default:
                            scope.answers[questionNumber]=choiceValue;
                            break;
                    }
                };

                scope.isSelected = function(optionValue){
                    if(true)
                        return scope.answers[scope.questionNumber] === optionValue ||
                            scope.answers[scope.questionNumber][optionValue] === true;
                    else
                        return false;
                };

                scope.scrollToQuestion = function(targetQuestionNumber){
                    console.log(targetQuestionNumber);
                    var targetQuestion = angular.element(document.getElementById('question-'+(parseInt(targetQuestionNumber))));
                    if(targetQuestion[0] !== undefined){
                        $document.scrollToElement(targetQuestion, window.innerHeight/2-targetQuestion[0].offsetHeight/2, 300);
                    }
                };

                //Take care of key presses
                $window.addEventListener('keydown',function(event){
                    if(!scope.centered)
                        return;

                    //Make this an int
                    scope.questionNumber = parseInt(scope.questionNumber);

                    //Shift Tab, Previous Question
                    if(event.shiftKey && event.which == 9){
                        //If we can still go back...
                        if(scope.questionNumber - 1 > 0){
                            $timeout(function(){
                                scope.scrollToQuestion(scope.questionNumber-1);
                            });
                        }
                        event.preventDefault();
                        return false;
                    }

                    //Enter or tab, Proceed to next Question
                    if(event.which == 13 || event.which == 9){
                        //TBH No idea why this works.
                        $timeout(function(){
                            scope.scrollToQuestion(scope.questionNumber+1);
                        });
                        event.preventDefault();
                        return false;
                    }

                    //Letter Input for MC, Fill out Option and Proceed After Delay if Radio
                    if((scope.question.questionType == 'radio' || scope.question.questionType == 'checkbox')
                        && event.which-65 >= 0 && event.which-65 <= scope.question.options.length){

                        console.log(event.which-65);
                        scope.choiceSelect(scope.questionNumber, scope.question.options[event.which-65].value);
                        scope.$apply();

                        //Delay scrolling for animation or something
                        if(scope.question.questionType == 'radio'){
                            $timeout(function(){
                                scope.scrollToQuestion(scope.questionNumber+1);
                            }, 500);
                        }

                        return false;
                    }

                }, true);

                //Listen to scroll events to see keep track of centering
                $window.addEventListener('scroll',function (event) {
                    scope.$apply(function(){
                        scope.centered=isElementInCenter(elem);
                        if(scope.centered){
                            elem.focus();
                            $timeout(function(){
                                elem.find('input[type="text"]').focus();
                                //scope.scrollToQuestion(parseInt(scope.questionNumber));
                            });
                        }else{
                            $timeout(function(){
                                elem.find('input[type="text"]').blur();
                            })
                        }
                    });
                },false);

                //Calculates if the element is centered or not
                function isElementInCenter(el){

                    //special bonus for those using jQuery
                    if (typeof jQuery === "function" && el instanceof jQuery) {
                        el = el[0];
                    }

                    var rect = el.getBoundingClientRect();


                    return (
                        rect.top < $window.innerHeight/2 &&
                        rect.bottom > $window.innerHeight/2
                    );$
                }

                //Run After Load
                $timeout(function(){
                    //Init Material Fancy Effects
                    $.material.init();
                    //Scroll to first question
                    if(scope.questionNumber == 1){
                        scope.scrollToQuestion(1);
                    }
                });
            }
        }
    });
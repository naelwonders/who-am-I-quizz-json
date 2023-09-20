let questionJSON;
let numberOfQuestions;
let currentIndex = 0;
let score = 0;

function loadQuestionsFromJSON(context){
    
    // faire le lien avec le fichier JSON et cette page (on a deja preloadé dans preload)
    questionJSON = context.cache.json.get('questions');
    shuffleArray(questionJSON.questions);
    numberOfQuestions = questionJSON.questions.length;
    
}

//returns the current question in string format from the JSON 
function getCurrentQuestion() {
    if (questionJSON) {
        return questionJSON.questions[currentIndex].title;
    } else {
        console.error("questionJSON is undefined");
    }
}

//returns the list of answers in string format from the JSON
function getCurrentAnswerList() {
    if (questionJSON) {
        return questionJSON.questions[currentIndex].answer;
    } else {
        console.error("questionJSON is undefined");
    }
}


function checkAnswer(answerText, answerIndex) {
    //logic if answer is right
    if (answerText == questionJSON.questions[currentIndex].goodAnswer) {
        //fists[currentIndex].alpha = 1;
        answerPanel[answerIndex].setTexture("rightanswer");
        score += 1;
    }
    //logic if answer is wrong
    else {
        //fists[currentIndex].alpha = 0.3;
        answerPanel[answerIndex].setTexture("wronganswer");
    }
    //remove the interactiity of the panel so the player can choose only once
    for (let i = 0; i < 3; i++) {
        answerPanel[i].removeInteractive();
    }
    
    nextButton.setVisible(true);
    nextText.setVisible(true);
    }


function nextQuestion() {
    currentIndex ++;

    subtitle.setText("Quizz - Question " + (currentIndex + 1).toString());
    
    nextText.setVisible(false);
    nextButton.setVisible(false);
    //hintText.setVisible(false);

    //if QUIZZ not finished
    if (currentIndex < numberOfQuestions) {
        questionTextObject.setText(questionJSON.questions[currentIndex].title);
        
        answerList = [
            questionJSON.questions[currentIndex].answer[0],
            questionJSON.questions[currentIndex].answer[1],
            questionJSON.questions[currentIndex].answer[2]];
        
        for (let i = 0; i < 3; i++) {
            //remettre interactive car desactivé en checkant la réponse
            answerPanel[i].setTexture("answer");
            answerPanel[i].setInteractive();
            answerTextObject[i].setText(answerList[i]);
        }
        //HINT SECTION TO DO
        //moreInfoCat.setVisible(true);
        
        scientistImage.setTexture('scientist' + currentIndex.toString());
        // let justifiedBio = justifyText(this.bioHint, questionJSON.questions[currentIndex].bio, rectangle.with - 40)
        // this.bioHint.setText(justifiedBio); 
        // this.biohint.setVisible(false);        
    }
    //if QUIZZ finished
    else if (currentIndex >= numberOfQuestions) {
        
        removeGameAssets();
        
        subtitle.setText("Congratulations! You have finished the quiz!");
        scoreMessage.setText("Your score is " + score + "/" + numberOfQuestions)
  
    }
}

function displayHint(){
    scientistImage.setTexture(questionJSON.questions[currentIndex].image);
    scientistImage.setVisible(true);
    rectangle.setVisible(true);
    previousButton.setVisible(true);
    bioHint.setText(questionJSON.questions[currentIndex].bio);
    bioHint.setVisible(true);
    
}

function removeHint(){
    scientistImage.setVisible(false);
    rectangle.setVisible(false);
    previousButton.setVisible(false);
    bioHint.setVisible(false);
}

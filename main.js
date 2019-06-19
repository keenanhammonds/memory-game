(function(){
    console.log('up and running')

    const cards = [
        {
            rank: 'queen',
            suit: 'hearts',
            cardImg: "images/queen-of-hearts.png"
        },
        {
            rank: 'queen',
            suit: 'diamonds',
            cardImg: "images/queen-of-diamonds.png"
        },
        {
            rank: 'king',
            suit: 'hearts',
            cardImg: "images/king-of-hearts.png"
        },
        {
            rank: 'king',
            suit: 'diamonds',
            cardImg: "images/king-of-diamonds.png"
        }
    ];

    var cardsInPlay = [];

    let scoreValue = 0;

    let score = document.getElementById("score");

    const scoreUpdater = () => {
        if(checkForMatch){
            scoreValue++;
            score.textContent = scoreValue;
            console.log(scoreValue);
        }
    }

    const checkForMatch = () => {
        if(cardsInPlay.length === 2){
            if(cardsInPlay[0] === cardsInPlay[1]){
                alert('you found a match!');
                console.log(true);
                scoreUpdater();   
                return true;

            } else {
                alert('sorry, try again');
                console.log(false);
                return false;
            }
        }
    }

// ES6 syntax not working due to not being to access the 'this keyword' has to do with lexical scoping

    function flipCard(){
        let cardId = this.getAttribute('data-id');
        this.setAttribute('src', cards[cardId].cardImg);
        cardsInPlay.push(cards[cardId].rank);
        checkForMatch();
    }

    let cardTable = document.getElementById('game-board');

    const createBoard = () => {
        for (let i = 0; i < cards.length; i++){
            let cardElement = document.createElement('img');
            cardElement.setAttribute('src', 'images/back.png');
            cardElement.setAttribute('data-id', i);
            cardElement.setAttribute('id', "card");
            cardElement.addEventListener('click', flipCard);
            document.getElementById('game-board').appendChild(cardElement);
        }
    }

    const clearBoard = () => {
        while(cardTable.firstChild){
            cardTable.removeChild(cardTable.firstChild);
        }
        cardsInPlay.length = 0;
        shuffle(cards)
    }

    const clearCardsInPlay = () => {
        console.log(cardsInPlay);
        scoreValue = 0;
        score.textContent = scoreValue;
        return cardsInPlay.length = 0;

    }

    function shuffle(array){
        var currentIndex = array.length;
        var tempValue;
        var randomIndex;

        while(0 !== currentIndex){
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            tempValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = tempValue;
        }
        return array;
    }

    const reset = () => {
        let resetButton = document.getElementById("resetButton");
        resetButton.addEventListener('click', clearBoard);
        resetButton.addEventListener('click', createBoard);
    }

    const startOver = () => {
        let startOver = document.getElementById("startOver");
        startOver.addEventListener("click", clearBoard);
        startOver.addEventListener("click", clearCardsInPlay);
        startOver.addEventListener("click", createBoard);
        startOver.addEventListener("click", console.log("starting over"));
    }

    createBoard();

    reset();

    startOver();

})();
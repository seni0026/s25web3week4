

//create global variables
let colourPool = ["red", "red", "orange", "orange", "yellow", "yellow", "green", "green", "blue", "blue", "purple", "purple"];
//when the user clicks on a card for the first time, we'll pick a random colour from this array and assign it to that card

//clickedCards will store the cards the user is currently clicking on, by ID - when two cards are in the array, we'll check if there is a matching ID, and if there is, then there is a match.  However, if the IDs do not match, then we'll flip the two cards back over
let clickedCards = [];

//these two globals are to keep track of the user's progress - one for their score, and one for the number of moves
let score=0, moves=0;
//you can declare multiple variables with one 'let' keyword, by separating them with commas

/********************************
 * 	Scripts added in class
********************************/

// create a for loop to create multiple cards
for(let i = 0; i < 12; i++) {

// create new card
const card = document.createElement('div');

// create a p element
const childElement = document.createElement('p');

// add text to the p element
childElement.textContent = '?';

// add the p element to the card
card.appendChild(childElement);

// add the class card
card.classList.add('card');

// when user clicks the card make something happen
card.addEventListener('click', revealCard);

// add card to page
// first get the main element
document.querySelector('main').appendChild(card);
}

//revealCard function to display what is on the card
function revealCard() {
    //check to make sure that the card isn't clicked already - that its
    // class has not been set to cardFlipped
    if (this.className != 'cardFlipped') {
        // change the class name using the built in function 
        // .className changes the existing class name and assign a new class
        this.className = 'cardFlipped';
        
        // create a random number for each card 
        let randomNum = Math.floor(Math.random() * (12 - 0.001));
        
        // based on the random number, assign an ID to the card (from the color pool array)
        // the ID is a color name from the colorPool
        this.id = colourPool[randomNum];

        // add the clicked card to the array that stores cards that are clicked
        clickedCards.push(this);

        // check to see if there are 2 cards in the array
        // then check to see if there is a match
        if (clickedCards.length == 2){
            // check to see if the cards have the same ID
            if (clickedCards[0].id == clickedCards[1].id) {
                // call the function to display a message
                createOverlay('match');
            } else {
                createOverlay('nomatch');
                // if its not a match, flip the card to its original state
                clickedCards.forEach(function(thisCard) {
                    thisCard.className = 'card';
                    
                })
            }
            // make the array empty
            clickedCards = [];
        }
    }
}

// this function shows a message to the user
function createOverlay(messagetype) {
    // create a div container for the overlay
    const overlay = document.createElement('div');

    // add an ID to the overlay container
    overlay.id = 'overlay';

    // get the body tag and add the element
    document.querySelector('body').appendChild(overlay);

    // add a message to the overlay
    const overlayMessage = document.createElement('p');

    // use switch statement for multiple options
    switch(messagetype) {
        case 'nomatch':
            overlayMessage.textContent = 'Not a match!';
            break; //stops the switch statement from running

        case 'match':
            overlayMessage.textContent = 'Match!';
            break; //stops the switch statement from running
    }

    overlay.appendChild(overlayMessage);

    // remove the overlay
    overlay.addEventListener('click', removeOverlay);
}

// function that removes the overlay
function removeOverlay() {
    this.parentNode.removeChild(this);
}

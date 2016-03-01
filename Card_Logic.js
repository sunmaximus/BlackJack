/**
 * Created by Son on 2/28/2016.
 */

// constructor
var Card = function(suit, number) {

    // name of each svg images.
    var image_file = ['01_of_clubs_A.svg',
        '01_of_diamonds_A.svg',
        '01_of_hearts_A.svg',
        '01_of_spades_A.svg',
        '02_of_clubs.svg',
        '02_of_diamonds.svg',
        '02_of_hearts.svg',
        '02_of_spades.svg',
        '03_of_clubs.svg',
        '03_of_diamonds.svg',
        '03_of_hearts.svg',
        '03_of_spades.svg',
        '04_of_clubs.svg',
        '04_of_diamonds.svg',
        '04_of_hearts.svg',
        '04_of_spades.svg',
        '05_of_clubs.svg',
        '05_of_diamonds.svg',
        '05_of_hearts.svg',
        '05_of_spades.svg',
        '06_of_clubs.svg',
        '06_of_diamonds.svg',
        '06_of_hearts.svg',
        '06_of_spades.svg',
        '07_of_clubs.svg',
        '07_of_diamonds.svg',
        '07_of_hearts.svg',
        '07_of_spades.svg',
        '08_of_clubs.svg',
        '08_of_diamonds.svg',
        '08_of_hearts.svg',
        '08_of_spades.svg',
        '09_of_clubs.svg',
        '09_of_diamonds.svg',
        '09_of_hearts.svg',
        '09_of_spades.svg',
        '10_of_clubs_-_David_Bellot.svg',
        '10_of_diamonds_-_David_Bellot.svg',
        '10_of_hearts_-_David_Bellot.svg',
        '10_of_spades_-_David_Bellot.svg',
        'Jack_of_clubs_en.svg',
        'Jack_of_diamonds_en.svg',
        'Jack_of_hearts_en.svg',
        'Jack_of_spades_en.svg',
        'King_of_clubs_en.svg',
        'King_of_diamonds_en.svg',
        'King_of_hearts_en.svg',
        'King_of_spades_en.svg',
        'Queen_of_clubs_en.svg',
        'Queen_of_diamonds_en.svg',
        'Queen_of_hearts_en.svg',
        'Queen_of_spades_en.svg'
    ];

    // Get the calculated decimal number of the card. Number are from 1-13.
    // Uses modulus to calculate. Original number before calculate are from 1-52.
    // returns (int)
    this.getNumber = function() {
        return number;
    };
    // Calculate and returns the suit of the card.
    // returns (string)
    this.getSuit = function() {
        var suitName = '';
        if(suit == 1){
            suitName = "heart"
        }
        else if(suit == 2){
            suitName = "diamond"
        }
        else if(suit == 3){
            suitName = "club"
        }
        else if(suit == 4){
            suitName = "spade"
        }
        return suitName;
    };
    //The decimal value of the card to keep score
    // returns {int}
    this.getValue = function() {
        var value = number;
        if (number >= 10) {
            value = 10;
        }
        if (number === 1) {
            value = 11;
        }
        return value;
    };
    // Get the name of the card. From Ace to King.
    // returns (string)
    this.getName = function() {
        var cardName = '';
        if( number == 1){
            cardName = "Ace";
        }
        else if( number == 13){
            cardName = "King";
        }
        else if( number == 12){
            cardName = "Queen";
        }
        else if( number == 11){
            cardName = "Jack";
        }else{
            cardName = number;
        }
        return cardName;
    };

    // The name of the svg respected to the card
    // returns (string)
    this.svgFile = function() {
        var file = "";
        for (var i = 0; i < image_file.length; i++) {
            if ((image_file[i]).indexOf(this.getSuit()) > -1 && (image_file[i]).indexOf((this.getName()).toString()) > -1) {
                file = image_file[i];
            } else if ((image_file[i]).indexOf(this.getSuit()) > -1 && (image_file[i]).indexOf("A") > -1) {
                file = image_file[i];
            }
        }
        return file;
    };

    // returns {jSON object} The card properties in jSON object
    this.getCard = function() {
        return {
            "suit": this.getSuit(),
            "value": this.getValue(),
            'symbol': this.getName(),
            'svg': this.svgFile()
        }
    };
};

// constructor
var Deck = function() {
    // Make Almost all data private to make it harder to change data once a Deck is created.
    var deck = [];

    // Make 52 new cards and pushes them into a list
    // returns a list of objects.
    var newDeck = function() {
        // Calculation by using modulus. One calculates the suit 1-4, and card number 1-13. 4 x 13 = 52
        for (var i = 0; i < 52; i++) {
            var suit = i % 4 + 1;
            var number = i % 13 + 1;
            deck.push(new Card(suit, number).getCard());
        }
    };

    // Almost like a default constructor
    newDeck();

    this.getDeck = function() {
        return deck;
    };

    // Got the idea from this link: http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    // Shuffle the deck of 52 cards
    // returns a list of objects
    this.shuffle = function(n) {
        var k = 0;
        var temp_card = {}

        for (var i = 0; i < n; i++) {
            for (var j = 0; j < deck.length; j++) {
                k = Math.floor((Math.random() * (deck.length - 1)));
                temp_card = deck[j];
                deck[j] = deck[k];
                deck[k] = temp_card;
            }
        }
        return deck;
    };

    // If a player want to deal then pop a card from the list.
    // Else, if the deck is empty make a new one and shuffle it.
    // return a list of objects
    this.deal = function() {
        if (!deck.length) {
            console.log("No more cards in deck. New deck will be added.");
            newDeck()
            this.shuffle();
        }
        return deck.pop();

    };
};


// constructor. Rules of how the each players hand will function
var Hand = function(deck) {
    var cards = [];
    // Default constructor. Deal two cards at start for each players.
    cards.push(deck.deal(), deck.deal());

    // return a list of cards each player have.
    this.getHand = function() {
        return cards;
    };

    // returns the normal score if Ace is 11
    // returns int
    this.normalScore = function() {
        var score = 0;

        for (var i = 0; i < cards.length; i++) {
            score += cards[i].value;
        }
        return score;
    };

    // returns another Ace score if Ace is 1
    // returns int
    this.aceScore = function() {
        var score = 0;
        for (var i = 0; i < cards.length; i++) {
            if ((cards[i]).value == 11) {
                score -= 10;
            }
            score += cards[i].value;
        }
        return score;
    };
    this.hit = function() {
        if (cards.length < 5) {
            cards.push(deck.deal());
        }
    }

    // Help to display what cards is being use on the console.
    this.readCard = function() {
        var string = "";
        for (var i = 0; i < cards.length; i++) {
            string += cards[i].symbol + "_of" + "_" + cards[i].suit + " --&&--";
        }
        return string;
    };

};

var player, dealer;
var deck = new Deck();
deck.shuffle(9);

// Need to add the logic when there is an ACE
function Test() {

    player = new Hand(deck);
    dealer = new Hand(deck);

    var t = true;
    var f = true;

    // Private Function
    // This function check if the first two cards of the initial hand have a black Jack
    // returns (boolean)
    var checkBlackJack = function(_player){
        var exist = false;
        var royal = ["King", "Queen", "Jack"];
        for(var i = 0; i < royal.length; i++) {
            if(_player.getHand()[0].symbol == "Ace" && _player.getHand()[1].symbol === royal[i]){
                exist = true;
            }
            else if( _player.getHand()[1].symbol == "Ace" && _player.getHand()[0].symbol === royal[i]) {
                exist = true;
            }
        }
        return exist;
    }

    console.log(deck.getDeck().length);
    console.log(player.normalScore(), player.aceScore(), player.readCard());
    console.log(dealer.normalScore(), dealer.aceScore(), dealer.readCard());
    while (t == true){

        if (player.normalScore() == 21 && checkBlackJack(player) ){
            console.log("BlackJack");
            t = false;
            return;
        }

        var c = prompt("Enter something fool");

        if (c == "yes" || c == "y") {

            player.hit();
            if (player.normalScore() > 21 && player.aceScore() > 21) {

                console.log(deck.getDeck().length);
                console.log(player.normalScore(), player.aceScore(), player.readCard());
                console.log(dealer.normalScore(), dealer.aceScore(), dealer.readCard());
                console.log("You lose");
                t = false
            }
            console.log(deck.getDeck().length);
            console.log(player.normalScore(), player.aceScore(), player.readCard());
            console.log(dealer.normalScore(), dealer.aceScore(), dealer.readCard());

        }
        else if (c == "stand" ) {

            if (dealer.normalScore() == 21 && checkBlackJack(dealer) ){
                console.log("BlackJack for dealer");
                t = false;
                return;
            }
            while (c == "stand") {

                if(dealer.normalScore() > 21 || dealer.aceScore() > 21){
                    console.log("Dealer Lose");
                    c = "stop";
                    t = false;
                }

                if (dealer.normalScore() < 17 && dealer.aceScore() < 17) {
                    dealer.hit();
                    console.log(deck.getDeck().length);
                    console.log(player.normalScore(), player.aceScore(), player.readCard());
                    console.log(dealer.normalScore(), dealer.aceScore(), dealer.readCard());
                    t = false

                    if(dealer.normalScore() > 21){
                        console.log("Dealer Lose");
                        c = "stop";
                        t = false;
                    }
                }
                else {
                    console.log("Dealer stay");
                    c = "stop";
                    t = false;
                    if(dealer.normalScore() < player.normalScore()){
                        console.log("Dealer lose");
                    }
                    else if(dealer.aceScore() < player.aceScore()){
                        console.log("Dealer lose");
                    }
                    else if(dealer.aceScore() === player.aceScore() || dealer.aceScore() === player.aceScore()){
                        console.log("Tie !!!");
                    }
                    else{
                    }
                }
            }
        }
        else {
            t = false;
        }
    }
}


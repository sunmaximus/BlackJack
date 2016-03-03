/**
 * Created by Son Nguyen on 2/28/2016.
 * Description: This script is an Alpha version  to create Card and Deck object. The Game function is the logic of the
 *              game.
 *              
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
var Deck = function(nth) {
    // Make Almost all data private to make it harder to change data once a Deck is created.
    var number_of_deck  = nth;
    var deck = [];

    // Make 52 new cards and pushes them into a list
    // returns a list of objects.
    var newDeck = function(n) {
        for(var i = 0; i < n; i++) {
            // Calculation by using modulus. One calculates the suit 1-4, and card number 1-13. 4 x 13 = 52
            for (var j = 0; j < 52; j++) {
                var suit = j % 4 + 1;
                var number = j % 13 + 1;
                deck.push(new Card(suit, number).getCard());
            }
        }
    };

    // Almost like a default constructor
    newDeck(number_of_deck);

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
            newDeck(number_of_deck);
            this.shuffle(9);
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
var deck = new Deck(3);
deck.shuffle(9);

// Need to add the logic when there is an ACE
function Game() {

    player = new Hand(deck);
    dealer = new Hand(deck);

    var t = true;
    var player_score = 0;
    var dealer_score = 0;

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


        // Check if player initial hand is BlackJack. Stop.
        if (player.normalScore() == 21 && checkBlackJack(player) ){
            console.log("BlackJack");
            t = false;
            return;
        }

        // Check if player win by having 5 cards and never bust.
        if(player.getHand().length == 5 && player.normalScore() < 22 || player.getHand().length == 5 && player.aceScore() < 22){
            console.log("You Win, 5 cards");
            t = false;
            return;
        }

        var c = prompt("Enter something fool");

        // Assign a default value for player_score on the initial score if player never hit.
        player_score = player.normalScore();

        if (c == "yes" || c == "y") {

            player.hit();

            // After player hit. Check if the player bust.
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

        // Dealer Turn.
        else if (c == "stand" ) {

            // Update the best score for player_score.
            if(player.normalScore() > player.aceScore() && player.normalScore() < 22){
                player_score = player.normalScore();
                console.log("1");
            }
            else if(player.normalScore() > 21 && player.aceScore() < 22){
                player_score = player.aceScore();
                console.log("2");
            }
            else if(player.normalScore() > 21){
                player_score = player.aceScore();
                console.log("3");
            }

            // set an initial value for dealer score;
            dealer_score = dealer.normalScore()

            // Check if the dealer should stay at the initial hand.
            if (dealer.normalScore() == 21 && checkBlackJack(dealer) ){
                console.log("BlackJack for dealer");
                t = false;
                return;
            }

            // If dealer score is 21 at start.
            if(dealer.normalScore() == 21){
                t = false;
                console.log("Dealer Stay because it is 21");

                // If dealer score without ace is bigger than player OR bigger than player with an ace.
                // Then exit and dealer win.
                if(dealer.normalScore() > player.normalScore() || dealer.normalScore() > player.aceScore()){
                    console.log("0. Dealer win");
                    return;
                }
                // If both are equal then it is a tie. House still win automatically.
                else if(dealer.normalScore() == player.aceScore()){
                    console.log("1. Dealer and Player have the same score");
                    return;
                }
                return;
            }

            // Check if dealer and player score are the same. Stay because House will win.
            if(dealer.normalScore() == player.normalScore() && dealer.normalScore() > 17){
                console.log("Dealer Stay because it is tie");
                return;
            }
            // Stay if Dealer's score without an ace is bigger than Player's score and haven't busted yet.
            else if(dealer.normalScore() > player.normalScore() && dealer.normalScore() < 22){
                console.log("Dealer Stay because dealer score is higher than player");
                return;
            }

            // Check if the dealer should hit or not while not having an Ace.
            while (dealer.normalScore() < player.normalScore() && dealer.normalScore() < 17){
                dealer.hit();
                console.log("Hitting");
                console.log(deck.getDeck().length);
                console.log(player.normalScore(), player.aceScore(), player.readCard());
                console.log(dealer.normalScore(), dealer.aceScore(), dealer.readCard());
                // Update dealer score
                // dealer_score = dealer.normalScore();

                // While dealer is hitting. If dealer got five cards and have not busted yet. Then stay and dealer win.
                if(dealer.getHand().length == 5 && dealer.normalScore() < 22 || dealer.getHand().length == 5 && dealer.aceScore() < 22){
                    console.log("Dealer have 5 cards. Dealer Win");
                    c = "stop";
                    t =false;
                    return;
                }

            }

            // After hitting. Update dealer score
            dealer_score = dealer.normalScore();

            // After hitting, check if dealer_score is bigger than player score without busting.
            //if(dealer.normalScore() > player_score && dealer.normalScore() < 22){
            if(dealer_score > player_score && dealer_score < 22){
                console.log("00. Dealer stay. Dealer win.");
                c = "stop";
                t =false;
                return;
            }
            // Else if dealer_score busted and have an Ace score less than 17. Then shuffle.
            else if(dealer_score > 21 && dealer.aceScore() < 17) {

                // Continue hitting while dealer's Ace score is less than player's Ace score and less than 17.
                while (dealer.aceScore() < player.aceScore() && dealer.aceScore() < 17) {
                    dealer.hit();
                    console.log("Hitting on Ace");
                    console.log(deck.getDeck().length);
                    console.log(player.normalScore(), player.aceScore(), player.readCard());
                    console.log(dealer.normalScore(), dealer.aceScore(), dealer.readCard());

                    // dealer_score = dealer.aceScore();

                    // Check if dealer hand have five cards and have not busted yet. Then exit and dealer Win.
                    if(dealer.getHand().length == 5 && dealer.normalScore() < 22 || dealer.getHand().length == 5 && dealer.aceScore() < 22){
                        console.log("Dealer have 5 cards. Dealer Win");
                        c = "stop";
                        t =false;
                        return;
                    }
                }
            }

            // Update the best score to use for dealer_score.
            if(dealer.normalScore() < 22){
                dealer_score = dealer.normalScore();
            }
            else if(dealer.aceScore() < 22 && dealer.normalScore() > 21){
                dealer_score = dealer.aceScore();
            }

            console.log("player:", player_score, "dealer:", dealer_score);

            // Figuring out if dealer busted, won, and loses.
            if(dealer_score > 21){
                console.log("Dealer bust")
                return;
            }

            // If dealer score is bigger than player and have not busted. Then dealer win.
            if(dealer_score > player_score && dealer_score < 22) {
                console.log("dealer win");
                c = "stop";
                t = false;
                return
            }
            // Check if the dealer busted.
            else if(player_score < dealer_score && dealer > 22) {
                console.log("dealer lose because dealer is over 21 ");
                c = "stop";
                t = false;
                return
            }
            // If player score is bigger than dealer and have not busted. Then player win.
            else if ( dealer_score < player_score && player_score < 22){
                console.log("player win");
                c = "stop";
                t = false;
                return
            }
            // If both score are the same. Then it is a draw. House still win no mater what.
            else if (dealer_score === player_score) {
                console.log("Draw");
                c = "stop";
                t = false;
                return
            }
        }
        else {
            t = false;
        }
    }
}


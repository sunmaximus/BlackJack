/**
 * Created by Son on 2/28/2016.
 */
// Constructor
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

var Deck = function() {
    // Make Almost all data private to make it harder to change data once a Deck is created.
    var deck = [];

    // Make 52 new cards and pushes them into a list
    // returns a list of objects.
    var newDeck = function() {
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
//
//var d = new Deck();
//d.shuffle(20);
//var hand = new Hand(d);
//console.log(hand.getHand())
//console.log(hand.normalScore(), hand.aceScore());jwedendnvc vvnfvmvfmvvf ,v

var player, dealer;
var deck = new Deck();
deck.shuffle(9);

function Test() {

    //var person = prompt("Enter something fool");
    player = new Hand(deck);
    dealer = new Hand(deck);

    //console.log(person);
    console.log(deck.getDeck().length);
    console.log(player.normalScore(), player.readCard());
    console.log(dealer.normalScore(), dealer.readCard());

    //var person = prompt("Enter something fool");
    //
    //if( person == "yes" || person.indexOf("Yes") > -1 ){
    //    player = new Hand(deck);
    //    dealer = new Hand(deck);
    //}

    var t = true;
    while (t == true) {
        var c = prompt("Enter something fool");
        if (c == "yes") {
            player.hit();
        } else {
            t = false;
        }

        if (player.normalScore() > 21) {
            console.log("You lose");
            console.log(deck.getDeck().length);
            console.log(player.normalScore(), player.readCard());
            console.log(dealer.normalScore(), dealer.readCard());
            t = false
        } else {
            console.log(deck.getDeck().length);
            console.log(player.normalScore(), player.readCard());
            console.log(dealer.normalScore(), dealer.readCard());
        }

    }
    //console.log(deck.getDeck().length);
    //console.log( player.normalScore(), player.readCard());
    //console.log( dealer.normalScore(), dealer.readCard());

    //
    //var deck = new Deck()
    //var t = deck.getDeck();
    //for(var i = 0;  i < t .length; i++){
    //    console.log(t[i].symbol, t[i].suit);
    //}
}
/**
 * Created by Son on 3/12/2016.
 */

    // CHeck the BlackJack RULE AGAIN
var myApp = angular.module('BlackJack',[]);

myApp.controller('BlackJackController', function($scope) {

    var player, dealer;
    var deck = new Deck(8);
    deck.shuffle(9);

    var player_score = 0;
    var dealer_score = 0;

    var check_if_player_won = "Unavailable";
    var check_if_dealer_won = "Unavailable";
    var player_chose_to_stand = "no";

    $scope.player_reading = {
        score: player_score,
        handLength: 0,
        Cards:[{svg:'Card_back.svg'}, {svg:'Card_back.svg'},{svg:'Card_back.svg'},{svg:'Card_back.svg'}, {svg:'Card_back.svg'}],
        Status: check_if_player_won
    };

    $scope.dealer_reading = {
        score: dealer_score,
        handLength: 0,
        Cards:[{svg:'Card_back.svg'}, {svg:'Card_back.svg'},{svg:'Card_back.svg'},{svg:'Card_back.svg'}, {svg:'Card_back.svg'}],
        Status: check_if_dealer_won
    };

    // Private Function
    // This function check if the first two cards of the initial hand have a black Jack
    // returns (boolean)
    var checkBlackJack = function(_player){
        var BlackJack = false;

        if(_player.getHand()[0].symbol == "Ace" && _player.getHand()[1].value == 10){
            BlackJack = true;
        }
        else if( _player.getHand()[1].symbol == "Ace" && _player.getHand()[0].symbol == 10) {
            BlackJack = true;
        }

        return BlackJack;
    };

    $scope.newGame = function() {

        player_score = 0;
        dealer_score = 0;

        check_if_player_won = "Unavailable";
        check_if_dealer_won = "Unavailable";
        $scope.player_reading['Status'] = "Unavailable";
        $scope.dealer_reading['Status'] = "Unavailable";

        player_chose_to_stand = "no";

        player = new Hand(deck);
        dealer = new Hand(deck);

        player_score = player.normalScore();
        dealer_score = dealer.normalScore();

        $scope.player_reading['handLength'] = (player.getHand()).length;
        $scope.player_reading['Cards'] = [player.getHand()[0], player.getHand()[1],
                                          {svg:'Card_back.svg'}, {svg:'Card_back.svg'},{svg:'Card_back.svg'}];

        $scope.dealer_reading['handLength'] = (dealer.getHand()).length;
        $scope.dealer_reading['Cards'] = [dealer.getHand()[0], {svg:'Card_back.svg'},
                                          {svg:'Card_back.svg'}, {svg:'Card_back.svg'},{svg:'Card_back.svg'}];

        // Check if player initial hand is BlackJack. Stop.
        if (player.normalScore() == 21){
            check_if_player_won = "Player got BlackJack";
            player_score = player.normalScore();
        }else if(player.normalScore() > 21){
            player_score = player.aceScore();
        }

        $scope.player_reading["score"] = player_score;
        $scope.dealer_reading["score"] = dealer.getHand()[0].value;

   };

    $scope.hitMe = function() {

        var index_of_new_card_on_hand = 0;
        if(check_if_player_won === "Yes Player Won the Game" || check_if_player_won === "No Player Lost the Game"||
           check_if_player_won === "Player got BlackJack" || typeof player == typeof undefined  ||
            player_chose_to_stand === "yes" || check_if_player_won == "No Player and Dealer are Tie"){
           return;
        }

        player.hit();

        index_of_new_card_on_hand = player.getHand().length - 1

        if(player.normalScore() > 21 && player.aceScore() < 22){
            console.log("3");
            player_score = player.aceScore();
            $scope.player_reading["score"] = player_score;
        }else if(player.normalScore() > 21){
            player_score = player.aceScore();
        }else{
            player_score = player.normalScore();
        }
        $scope.player_reading["score"] = player_score;
        $scope.player_reading['handLength'] = (player.getHand()).length;
        $scope.player_reading['Cards'][ index_of_new_card_on_hand] = player.getHand()[index_of_new_card_on_hand];

        // Check if player win by having 5 cards and never bust.
        if(player.getHand().length == 5 && player.normalScore() < 22 || player.getHand().length == 5 && player.aceScore() < 22){
            console.log("You Win, 5 cards");
            check_if_player_won = "Yes Player Won the Game";
            check_if_dealer_won = "No Dealer Lost the Game";
            $scope.player_reading["Status"] = check_if_player_won;
            $scope.dealer_reading["Status"] = check_if_dealer_won;
           return;
        }

        // After player hit. Check if the player bust.
        if (player.normalScore() > 21 && player.aceScore() > 21) {
            console.log("You lose");
            check_if_player_won = "No Player Lost the Game";
            check_if_dealer_won = "Yes Dealer Won the Game";
            $scope.player_reading["Status"] = check_if_player_won;
            $scope.dealer_reading["Status"] = check_if_dealer_won;
        }
   };

    $scope.stand = function(){
        var index_of_new_card_on_hand = 0;
        player_chose_to_stand = "yes";

        if(check_if_dealer_won == "No Player and Dealer are Tie" || check_if_dealer_won == "Yes Dealer Won the Game"||
           check_if_dealer_won == "No Dealer Lost the Game" || check_if_player_won === "Yes Player Won the Game" ||
           check_if_player_won === "No Player Lost the Game" || typeof dealer == typeof undefined){
           return;
        }

        dealer_score = dealer.normalScore();
        $scope.dealer_reading["score"] = dealer_score;
        $scope.dealer_reading['Cards'][0] = dealer.getHand()[0];
        $scope.dealer_reading['Cards'][1] = dealer.getHand()[1];

        // If dealer score is 21 at start.
        if(dealer.normalScore() == 21){
            console.log("Dealer Have ------ Black Jack ------");
            console.log("Dealer Stay because it is 21");

            // If dealer score without ace is bigger than player OR bigger than player with an ace.
            // Then exit and dealer win.

            if(dealer.normalScore() == player.normalScore() && check_if_player_won === "Player got BlackJack"){
                console.log("1. Dealer and Player have the same score for BlackJack");
                check_if_player_won = "No Player and Dealer are Tie";
                check_if_dealer_won = "No Player and Dealer are Tie";
                $scope.player_reading["Status"] = check_if_player_won;
                $scope.dealer_reading["Status"] = check_if_dealer_won;
                return;
            }
            else if (dealer.normalScore() == player.normalScore() && check_if_player_won != "Player got BlackJack"){
                check_if_dealer_won = "Yes Dealer Won the Game";
                check_if_player_won = "No Player Lost the Game";
                $scope.player_reading["Status"] = check_if_player_won;
                $scope.dealer_reading["Status"] = check_if_dealer_won;
            }


        }else if (checkBlackJack(player) && dealer_score != 21 ){
            console.log("Dealer lost because player have a BlackJack and dealer doesn't.")
            check_if_dealer_won = "No Dealer Lost the Game";
            check_if_player_won = "Yes Player Won the Game";
            $scope.player_reading["Status"] = check_if_player_won;
            $scope.dealer_reading["Status"] = check_if_dealer_won;
            return;
        }

        // Check if dealer and player score are the same. Stay because House will win.
        if(dealer.normalScore() == player.normalScore() && dealer.normalScore() > 17){
            console.log("Dealer Stay because it is tie");
            check_if_player_won = "No Player and Dealer are Tie";
            check_if_dealer_won = "No Player and Dealer are Tie";
            $scope.player_reading["Status"] = check_if_player_won;
            $scope.dealer_reading["Status"] = check_if_dealer_won;
            return;
        }
        // Stay if Dealer's score without an ace is bigger than Player's score and haven't busted yet.
        else if(dealer.normalScore() > player.normalScore() && dealer.normalScore() < 22){
            console.log("Dealer Stay because dealer score is higher than player");
            check_if_dealer_won = "Yes Dealer Won the Game";
            check_if_player_won = "No Player Lost the Game";
            $scope.player_reading["Status"] = check_if_player_won;
            $scope.dealer_reading["Status"] = check_if_dealer_won;
            return;
        }

        // Check if the dealer should hit or not while not having an Ace.
        while (dealer.normalScore() < player.normalScore() && dealer.normalScore() < 17){
            dealer.hit();
            index_of_new_card_on_hand = dealer.getHand().length - 1;
            dealer_score = dealer.normalScore()
            $scope.dealer_reading["score"] = dealer_score;
            $scope.dealer_reading['Cards'][ index_of_new_card_on_hand] = dealer.getHand()[index_of_new_card_on_hand];
            $scope.dealer_reading['handLength'] = (dealer.getHand()).length;

            // While dealer is hitting. If dealer got five cards and have not busted yet. Then stay and dealer win.
            if(dealer.getHand().length == 5 && dealer.normalScore() < 22){
                console.log("Dealer have 5 cards. Dealer Win");
                dealer_score = dealer.normalScore();
                check_if_dealer_won = "Yes Dealer Won the Game";
                check_if_player_won = "No Player Lost the Game";
                $scope.player_reading["Status"] = check_if_player_won;
                $scope.dealer_reading["Status"] = check_if_dealer_won;
                return;
            }
        }

        dealer_score = dealer.normalScore();

        // After hitting. Check if dealer should stay.
        if(dealer_score > player_score && dealer_score < 22){
            console.log("00. Dealer stay. Dealer win.");
            check_if_dealer_won = "Yes Dealer Won the Game";
            check_if_player_won = "No Player Lost the Game";
            $scope.player_reading["Status"] = check_if_player_won;
            $scope.dealer_reading["Status"] = check_if_dealer_won;
            return;
        }
        // Else if dealer_score busted and have an Ace score less than 17. Then continue to hit.
        else if(dealer_score > 21 && dealer.aceScore() < 17) {

            // Continue hitting while dealer's Ace score is less than player's Ace score and less than 17.
            while (dealer.aceScore() < player.aceScore() && dealer.aceScore() < 17) {

                dealer.hit();
                index_of_new_card_on_hand = dealer.getHand().length - 1;
                $scope.dealer_reading['Cards'][ index_of_new_card_on_hand] = dealer.getHand()[index_of_new_card_on_hand];

                dealer_score = dealer.aceScore();
                $scope.dealer_reading["score"] = dealer_score;
                $scope.dealer_reading['handLength'] = (dealer.getHand()).length;

                // Check if dealer hand have five cards and have not busted yet. Then exit and dealer Win.
                if(dealer.getHand().length == 5 && dealer.aceScore() < 22){
                    console.log("Dealer have 5 cards. Dealer Win");
                    check_if_dealer_won = "Yes Dealer Won the Game";
                    check_if_player_won = "No Player Lost the Game";
                    $scope.player_reading["Status"] = check_if_player_won;
                    $scope.dealer_reading["Status"] = check_if_dealer_won;
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
        }else{
            dealer_score = dealer.normalScore();
        }

        $scope.dealer_reading["score"] = dealer_score;
        $scope.dealer_reading['handLength'] = (dealer.getHand()).length;
        console.log("player:", player_score, "dealer:", dealer_score);

        // Figuring out if dealer busted, won, and loses.
        if(dealer_score > 21){
            console.log("Dealer bust");
            check_if_dealer_won = "No Dealer Lost the Game";
            check_if_player_won = "Yes Player Won the Game";
            $scope.player_reading["Status"] = check_if_player_won;
            $scope.dealer_reading["Status"] = check_if_dealer_won;

        }

        // If dealer score is bigger than player and have not busted. Then dealer win.
        if(dealer_score > player_score && dealer_score < 22) {
            console.log("dealer win");
            check_if_dealer_won = "Yes Dealer Won the Game";
            check_if_player_won = "No Player Lost the Game";
            $scope.player_reading["Status"] = check_if_player_won;
            $scope.dealer_reading["Status"] = check_if_dealer_won;

        }
        // If player score is bigger than dealer and have not busted. Then player win.
        else if (dealer_score < player_score && player_score < 22){
            console.log("player win");
            check_if_dealer_won = "No Dealer Lost the Game";
            check_if_player_won = "Yes Player Won the Game";
            $scope.player_reading["Status"] = check_if_player_won;
            $scope.dealer_reading["Status"] = check_if_dealer_won;
        }
        // If both score are the same. Then it is a draw. House still win no mater what.
        else if (dealer_score === player_score) {
            console.log("Draw");
            check_if_dealer_won = "No Player and Dealer are Tie";
            check_if_player_won = "No Player and Dealer are Tie";
            $scope.player_reading["Status"] = check_if_player_won;
            $scope.dealer_reading["Status"] = check_if_dealer_won;
        }
    }

});
/**
 * Created by Son on 2/27/2016.
 *
 * Use this solution http://jsfiddle.net/scottux/HtZu6/, Author Scott
 * His solution is better than the one I had. His running time was
 */


image_file = ['01_of_clubs_A.svg',
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
    'Queen_of_spades_en.svg']


suit = ["heart", "diamond", "club", "spade"];
number = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13'];

var deck = [];
//console.log(suit);

//Regular Object version
for(var i = 0; i < suit.length; i++){
    for(var j = 0; j < number.length; j++){
        if(number[j] == '11'){
            for(var k = 0; k < image_file.length; k++) {
                if ((image_file[k]).includes('Jack') && (image_file[k]).includes(suit[i])) {
                    deck.push({
                        "suit": suit[i],
                        "value": '10',
                        'symbol': 'Jack',
                        'url': image_file[k]
                    });
                }
            }
        }
        else if(number[j] == '12'){
            for(var k = 0; k < image_file.length; k++) {
                if ((image_file[k]).includes('Queen') && (image_file[k]).includes(suit[i])) {
                    deck.push({
                        "suit": suit[i],
                        "value": '10',
                        'symbol': 'Queen',
                        'url': image_file[k]
                    });
                }
            }
        }
        else if(number[j] == '13'){
            for(var k = 0; k < image_file.length; k++) {
                if ((image_file[k]).includes('King') && (image_file[k]).includes(suit[i])) {
                    deck.push({
                        "suit": suit[i],
                        "value": '10',
                        'symbol': 'King',
                        'url': image_file[k]
                    });
                }
            }
        }
        else if(number[j] == '1'){
            for(var k = 0; k < image_file.length; k++) {
                if ((image_file[k]).includes('A') && (image_file[k]).includes(suit[i]) && (image_file[k]).includes(number[j])) {
                    deck.push({
                        "suit": suit[i],
                        "value": '1',
                        'symbol': 'Ace',
                        'url': image_file[k]
                    });
                }
            }
        }
        else{
            for(var k = 0; k < image_file.length; k++){
                if( (image_file[k]).includes(number[j]) && (image_file[k]).includes(suit[i])) {
                    deck.push({
                        "suit": suit[i],
                        "value": number[j],
                        'symbol': number[j],
                        'url': image_file[k]
                    });
                }
            }
        }
    }
}
//console.log(deck, deck.length);
//console.log(image_file[image_file.indexOf(suit[1])]);

console.log(deck);

var shuffle = function(deck_list, nth){
    var k = 0;
    var temp = {}
    for(var i = 0; i<nth; i++){
        for(var j = 0; j<deck_list.length; j++){
            k =  Math.floor((Math.random() * 51));
            temp = deck_list[j];
            deck_list[j] = deck_list[k];
            deck_list[k] = temp;
        }
    }
    return deck_list
}

//deck = shuffle(deck, 8);

//console.log(deck, deck.length);
/* This is to use to convert into string.
for(var i = 0; i < suit.length; i++){
    for(var j = 0; j < number.length; j++){
        if(number[j] == '11'){
            deck.push('{"suit":' + suit[i] + ', "value":"10"' + ", 'symbol': 'Jack'}");
        }
        else if(number[j] == '12'){
            deck.push('{"suit":' + suit[i] + ', "value":"10"' + ", 'symbol': 'Queen'}");
        }
        else if(number[j] == '13'){
            deck.push('{"suit":' + suit[i] + ', "value":"10"' + ", 'symbol': 'King'}");
        }
        else if(number[j] == '1'){
            deck.push("{'suit':" + suit[i] +", 'value':['1','11']"+ ", "+"'symbol':'Ace' }");
        }
        else{
            deck.push("{suit:" + suit[i] + ", value:" + number[j] + ", symbol: " + number[j] + "}");
        }
    }
}
*/
//document.write(deck.toString());
//console.log(deck, deck.length);
//console.log("["+ deck.toString() + "]");
//document.write("["+ deck.toString() + "]");
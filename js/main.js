const saveButton = document.querySelector('button');

function randomWord(){
    //Generate random word for The Word of the Day and initial value for textfields
    const words = [
        {word: 'presage', wordType: 'verb',  definition: 'To give or be a sign of something that will happen'},
        {word: 'propensity', wordType: 'noun', definition: 'A strong natural tendency to do something'},
        {word: 'disparate', wordType: 'adj', definition: 'Distinct in quality or character'},
        {word: 'parlay', wordType: 'verb', definition: 'To use or develop(something) to get something of greater value'},
        {word: 'espouse', wordType: 'verb', definition: 'Adopt or support (a cause, belief, or way of life)', definition_two: 'marry'},
        {word: 'addlepated', wordType: 'adj', definition: 'Mixed-up or confused'},
        {word: 'apprehension', wordType: 'noun', definition: 'Fear that something bad or unpleasant is going to happen'},
        {word: 'peruse', wordType: 'verb', definition: 'Read (something), typically in a thorough or careful way'},
        {word: 'despot', wordType: 'noun', definition: 'A ruler or other person who holds absolute power, typically in a cruel or oppressive way'},
        {word: 'disputatious', wordType: 'adj', definition: 'Argumentative'},
        {word: 'sapient', wordType: 'adj', definition: 'Possessing or expressing great wisdom'},
        {word: 'quiescent', wordType: 'adj', definition: 'Marked by inactivity or causing no trouble'},
        {word: 'chutzpah', wordType: 'noun', definition: 'Extreme self-confidence or audacity'}
    ];

    const random_word =  Math.floor(Math.random() * words.length);
    return words.filter((word, index) => { 
        if(index == random_word){
             document.querySelector('#word').placeholder=word.word;
             document.querySelector('#word_type').placeholder=word.wordType;
             document.querySelector('#definition').placeholder=word.definition;
        }
    }); 
}



document.addEventListener('DOMContentLoaded', (e) => {
    const word = randomWord();
})

saveButton.addEventListener('click', (e) => {
  
})
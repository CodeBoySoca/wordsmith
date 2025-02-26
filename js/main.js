const saveButton = document.querySelector('#save-button');
const bookmarkButton = document.querySelector('#bookmark');
const mailButton = document.querySelector('#subscribe');
const txtFld = document.querySelectorAll('.txtFld');

function getRandomWord() {
    //Generate random word for The Word of the Day and initial value for text fields
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
    const randomWordResult =  Math.floor(Math.random() * words.length);
    const randomWord = words.filter((word, index) => { 
        if(index == randomWordResult){
           return word;
        }
    }); 
    return randomWord;
}

function popoverWindow(){
   const popover = `
      <div id="overlay">
        <div id="popover">
           <h2>Get The Word of The Day</h2>
           <p>Enter your email to get the Word of the Day sent to you</p>
           <input type="email" name="email" placeholder="E-mail address" required><br>
           <button type="button">Subscribe</button>
        </div>
      </div>`;
   const popoverTemplate = document.createElement('template');
   popoverTemplate.innerHTML = popover;
   document.querySelector('body').appendChild(popoverTemplate.content);
}

function placeholderText(wordOfTheDay){
    document.querySelector('#word').placeholder=wordOfTheDay[0].word;
    document.querySelector('#word_type').placeholder=wordOfTheDay[0].wordType;
    document.querySelector('#definition').placeholder=wordOfTheDay[0].definition;
} 

function clearFields(attr) {
    //Removes the attribute passed in as an argument on the text fields
    if(attr === 'value'){
        document.querySelector('#word').value='';
        document.querySelector('#word_type').value='';
        document.querySelector('textarea').value='';

    } else {
        document.querySelector('#word').removeAttribute(attr);
        document.querySelector('#word_type').removeAttribute(attr);
        document.querySelector('textarea').removeAttribute(attr);
    }
}

function notificationBar() {
   const notificationBar =  `<div class='notification-bar'><p>Word saved &#x1f973;</p></div>`;
   const notificationTemplate = document.createElement('template');
   notificationTemplate.innerHTML=notificationBar;
   document.querySelector('body').appendChild(notificationTemplate.content);
}

function wordDataStore() {
    //Store words from the text fields in object and then add them to localStorage and 
    //call clearFields() to clear the text fields
    const words =  { 
      id:  Date.now(),    
      word : document.querySelector('#word').value,
      type : document.querySelector('#word_type').value, 
      definition : document.querySelector('textarea').value
    };
    let wordBank = JSON.parse(localStorage.getItem('words') || '[]');
    wordBank.push(words);
    localStorage.setItem('words', JSON.stringify(wordBank));
    clearFields('value');
}

function wordLibraryOverlay(){
    let wordData = localStorage.getItem('words'); 
    let words = JSON.parse(wordData);
    if(words){
        const wordOfTheDay = getRandomWord();
        const pageOverlay = `
                <div id='library-overlay'>
                    <header>
                        <h2>Word library</h2>
                        <div id="close">[ X ]</div>
                    </header>
                    <div id="overlay-content">
                       ${words.map(word => {
                        return `<h4>${word.word}</h4><sup>${word.type}</sup><p>${word.definition}</p>`;}).join('')} 
                    </div>
                    <footer>
                    <div>
                        <h2>Word of the day</h2>
                        <p>${wordOfTheDay[0].word}</p> 
                        <p>${wordOfTheDay[0].wordType}</p> 
                        <p>${wordOfTheDay[0].definition}</p> 
                    </div>
                    </footer>
                </div>`;
        const pageOverlayTemplate = document.createElement('template');
        pageOverlayTemplate.innerHTML=pageOverlay;
        document.querySelector('body').appendChild(pageOverlayTemplate.content); 
        document.querySelector('#close').addEventListener('click', (e) => { 
            slidePageOverlay('#library-overlay');
        });
    } else {
       `<h2>No words &#x1f636;</h2><p>No words and definitions we&apos;re saved</p>`;
    }
}

function validateFields() {    
}

function slidePageOverlay(pageOverlay){
   document.querySelector(pageOverlay).remove();
}

document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault();
    const randomWord = getRandomWord();
    placeholderText(randomWord);
});

txtFld.forEach((fld) => {
    fld.addEventListener('click', (e) => {
       clearFields('placeholder'); 
    });
});

saveButton.addEventListener('click', (e) => {
    e.preventDefault();
    wordDataStore();
    notificationBar();
});

bookmarkButton.addEventListener('click', (e) => {
   wordLibraryOverlay();
})

mailButton.addEventListener('click', () => {
    popoverWindow();
})
'use strict';

const store = (function(){
  
  return {
    playerName : '',
    murderer : '',
    currentGuess: '',
    beginning: true,
    currentPrompt: 0,
    survivingCharas : [],
    victims: [],
    win: false
  };
}());
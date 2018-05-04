'use strict';

const store = (function(){
  
  return {
    playerName : '',
    murderer : '',
    currentGuess: '',
    beginning: true,
    currentPrompt: 0,
    survivingCharas : [],
    win: false
  };
}());
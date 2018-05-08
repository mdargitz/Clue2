'use strict';

const store = (function(){
  

  return {
    charaCreate: function (name) {
      console.log('making person');
      let humanPlayer = {
        name: name,
        murderer: false,
        alive: true,
        npc: false,
        potentialVictim: false
      };
      console.log(humanPlayer);
       store.potentialVictims.humanPlayer = humanPlayer;
    },
    allPlayers: [
      { name: 'butler',
        murderer: false,
        alive: true,
        npc: true,
        potentialVictim: true,},
      {
        name: 'joe',
        murderer: false,
        alive: true,
        npc: true,
        potentialVictim: true,
      },
       {
        name: 'jane',
        murderer: false,
        alive: true,
        npc: true,
        potentialVictim: true,
      },
       {        name: 'wallbreaker',
        murderer: false,
        alive: true,
        npc: true,
        potentialVictim: true,
      }
    ],

  

    playerName : '',
    murderer : '',
    currentGuess: '',
    beginning: true,
    currentPrompt: 0,
    survivingCharas : [],
    characters: '',
    win: false
  };
}());
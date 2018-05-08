/* global $ game*/
'use strict';

console.log('foobar!');

const main = () => {
  game.handleCharacterSubmit();
  game.handleAccuse();
  game.setMurderer();
};

$(main);
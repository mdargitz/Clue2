/* global $ game*/
'use strict';

const main = () => {
  game.handleCharacterSubmit();
  game.handleAccuse();
  game.setMurderer();
};

$(main);
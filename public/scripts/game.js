/* global api store*/
'use strict';


const game = (function () {

  function setMurdererOrVictim(query) {
    console.log('something is happening!', query);
    //TODO make this random, give it some sort of logic based on prompts?
    // store.murderer = 'the butler'; //obviously

    const ourNewPromise = new Promise ( (resolve, reject) => {
      api.update('/api/npcs/random', query)
        .then(response => {
          if ('isMurderer' in query) {
            console.log('making a murderer of', response.firstName);
            store.murderer = response.firstName;
          } else if ('isAlive' in query) {
            console.log('choosing a victim', response.firstName);
            store.victims = response.firstName;
        
          }
          Promise.resolve('foobar');
        })
        .catch('i failed');
        

    });

    return ourNewPromise;

  }

  const generateSurvivorsHTML = () => {
    const list = [];
    for (let i = 0; i < store.survivingCharas.length; i++) {
      list.push(`
      <option value="${store.survivingCharas[i]}">
      ${store.survivingCharas[i]}
      </option>
      `);
    }

    return `<form id="guessMurdererForm">
      <lable for="guessMurderer"></lable>
      <select id="guessMurderer"> ${list.join('')} </select>
      <button type="submit">Accuse!</button>
    </form>`;
  };

  const generatePrompt = (id) => {
    //get the prompt data from the api
    const fakePromptData = 'Once upon a time there was an app';
    return `
    <div>
      <h1>Prompt ${id} : Greetings ${store.playerName}</h1>
      <p> ${fakePromptData}</p>
    </div>
    <div>
      <h2>Who dun it?</h2>
      ${generateSurvivorsHTML()}
    </div>
    `;
  };

  const evaluateGuess = () => {
    if (store.murderer === store.currentGuess) {
      return true;
    }
    return false;
  };

  const render = () => {
    if (!store.beginning) {
      //Hide beginning stuff
      $('#charaForm').addClass('hidden');
    }

    //hardcoded number of prompts for now- eventually should come from API
    for (let i = 0; i < 3; i++) {
      if (store.currentPrompt === i) {
        const prompt = generatePrompt(i);
        $('#gameBoard').html(prompt);
      }
    }

    if (store.win) {
      $('#gameBoard').append('<p>You win!</p>');
    }
    else if (store.currentGuess !== '') {
      $('#gameBoard').append('<p>Nope</p>');
    }

  };




  const handleCharacterSubmit = () => {
    $('#game').on('submit', '#charaForm', () => {
      event.preventDefault();

      setMurdererOrVictim({ isMurderer: true })
        .then(
          setMurdererOrVictim({ isAlive: false }));
    

      let playerName = $('#characterName').val();
      api.create('/api/players', { name: playerName })
        .then(response => store.playerName = response.name);



      //TO DO get full NPC list from the API
      store.survivingCharas = ['joe', 'jane', 'the butler', 'fourth wall breaker?'];
      store.beginning = false;
      render();
    });
  };

  const handleAccuse = () => {
    $('#game').on('submit', '#guessMurdererForm', () => {
      event.preventDefault();
      setMurdererOrVictim({ isAlive: false });

      // store.currentGuess = $('#guessMurderer').val();
      // console.log(store.currentGuess);
      // const win = evaluateGuess();
      // store.win = win;
      // console.log(store.win);
      render();
    });
  };



  return {
    handleCharacterSubmit,
    handleAccuse,
    setMurdererOrVictim
  };
}());
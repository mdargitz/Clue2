/* global $ store*/
'use strict';
console.log('what up?');

const game = (function(){
  

  
  const setMurderer = () => {
    //TODO make this random, give it some sort of logic based on prompts?
   
    let possibleMurderers = [];
    let possibleVictims = [];
    //get a random number

    //loop over the characterObjs. If property NPC = true, push to array PotentialMurderers;
    //Set property murderer = true for nth character in array as chosen randomly & potentialVictim to false

    store.allPlayers.forEach( player => {
      // console.log(player);
      if (player.npc === true){
        possibleMurderers.push(player);
      }
    });

    console.log(possibleMurderers);

 
    let murdererNumber = Math.floor(Math.random() * (possibleMurderers.length));

console.log(murdererNumber);

    possibleMurderers[murdererNumber].murderer = true;
    console.log(`Shhh...${possibleMurderers[murdererNumber].name} is a murderer!`);
    console.log(possibleMurderers);
    // possibleMurderers[murdererNumber].potentialVictim = false;

    // for (var obj in store.allPlayers) {
    //   console.log( typeof obj, obj);
    //   if (obj[npc] === true && this.potentialVictim === true){
    //     possibleVictims.push(this);
    //   }
    // }

    let victimNumber = Math.floor(Math.random() * (possibleVictims.length));
    // possibleVictims[victimNumber].alive = false;
    console.log(`Oh no, ${possibleVictims[victimNumber]} has died!`);
  };

  const generateSurvivorsHTML = () => {
    const list = [];
    for (let i = 0; i < store.survivingCharas.length ; i ++){
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

  const evaluateGuess = ()=> {
    if (store.murderer === store.currentGuess){
      return true;
    }
    return false;
  };
  
  const render = ()=> {
    if(!store.beginning) {
      //Hide beginning stuff
      $('#charaForm').addClass('hidden');
    }

    //hardcoded number of prompts for now- eventually should come from API
    for (let i = 0; i < 3; i ++){
      if (store.currentPrompt === i){
        const prompt = generatePrompt(i);
        $('#gameBoard').html(prompt);
      }
    } 
    
    if (store.win){
      $('#gameBoard').append('<p>You win!</p>');
    }
    else if (store.currentGuess !== ''){
      $('#gameBoard').append('<p>Nope</p>');
    }
    
  };
  
  
  const handleCharacterSubmit = () => {
    $('#game').on('submit','#charaForm', ()=>{
      event.preventDefault();
      store.playerName = $('#characterName').val();
      store.charaCreate($('#characterName').val());
      console.log(store.characters);
      //TO DO get full NPC list from the API
      store.survivingCharas = ['joe','jane','the butler','fourth wall breaker?'];
      store.beginning = false;
      render();
    });
  };

  const handleAccuse = () => {
    $('#game').on('submit', '#guessMurdererForm', ()=> {
      event.preventDefault();
      store.currentGuess = $('#guessMurderer').val();
      console.log(store.currentGuess);
      const win = evaluateGuess();
      store.win = win;
      console.log(store.win);
      render();
    });
  };

  return {
    handleCharacterSubmit,
    handleAccuse,
    setMurderer
  };
}());
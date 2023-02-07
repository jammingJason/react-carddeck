import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';

import Card from './Card';

const Deck = () => {
  const [deck, setDeck] = useState(null);
  const shuffleDeck = (evt) => {
    const newButton = document.getElementById('shuffle');
    console.log(newButton);
    newButton.disabled = true;

    axios
      .get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
      .then((res) => {
        setDeck(res.data.deck_id);
      });
  };

  if (!deck) {
    return (
      <button id="shuffle" onClick={shuffleDeck}>
        Shuffle New Deck
      </button>
    );
  }
  let pageItems = [];
  pageItems.push(
    <button id="shuffle" onClick={shuffleDeck} key={uuid()}>
      Shuffle New Card Deck
    </button>
  );
  pageItems.push(<Card key={uuid()} deckID={deck} />);
  return deck ? pageItems : <div>loading...</div>;
};

export default Deck;

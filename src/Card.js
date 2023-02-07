import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import './Card.css';
// import Deck from './Deck';
const Card = ({ deckID }) => {
  const [cards, setCards] = useState(null);

  const getNewCard = () => {
    // console.log(cards);
    if (cards.remaining === 0) {
      alert('Error: no cards remaining!');
      return;
    }
    axios
      .get(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`)
      .then((res) => {
        let newCards = [...cards];
        newCards.push(
          <img
            key={uuid()}
            src={res.data.cards[0].image}
            style={{
              transform: `rotate(${Math.floor(Math.random() * 360)}deg)`,
              position: 'absolute',
              top: '150px',
              left: '100px',
            }}
          />
        );
        setCards(newCards);
      });
  };
  useEffect(() => {
    axios
      .get(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`)
      .then((res) => {
        setCards([
          <img
            key={uuid()}
            src={res.data.cards[0].image}
            style={{
              transform: `rotate(${Math.floor(Math.random() * 360)}deg)`,
              position: 'absolute',
              top: '150px',
              left: '100px',
            }}
          />,
        ]);
      });
  }, []);

  //   console.log(card);
  return (
    <>
      {cards ? (
        <div className="Card">
          <div className="Card-div">
            <button className="Card-btn" onClick={() => getNewCard()}>
              Get New Card
            </button>
          </div>
          <div className="Card-image">{cards.map((c) => c)}</div>
        </div>
      ) : (
        'loading...'
      )}
    </>
  );
};

export default Card;

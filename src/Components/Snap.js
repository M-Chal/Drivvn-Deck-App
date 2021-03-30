import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Card from './Card';
import '../Styles/main.css';

function Snap() {
    const [deckID, setDeckID] = useState("");
    const [cardsLeft, setCardsLeft] = useState("")
    const [cards, setCards] = useState([]);

    const [valueMatch, setValueMatch] = useState(0);
    const [suitMatch, setSuitMatch] = useState(0);

    useEffect(() => {
        async function fetchDeck(){
            const response = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
            setDeckID(response.data.deck_id);
            setCardsLeft(response.data.remaining);
        }
        fetchDeck();
    },[]);

    async function getCard(){
        const response = await axios.get(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`);
        console.log(response);
        setCardsLeft(response.data.remaining);
        setCards([...cards, response.data])
    }

    useEffect(() => {
        const currentCard = cards.length ? cards[cards.length -1].cards[0] : "";
        const previousCard = cards.length > 1 ? cards[cards.length-2].cards[0] : "";
        if(currentCard.value === previousCard.value && previousCard !== ""){
            setValueMatch(valueMatch + 1)
        };
        if(currentCard.suit === previousCard.suit && previousCard !== ""){
            setSuitMatch(suitMatch + 1)
        };
    },[cards])

    const renderCards = () => {
        const currentCard = cards[cards.length -1].cards[0];
        const previousCard = cards.length > 1 ? cards[cards.length-2].cards[0] : "";

        return(
            <div className="Card-Deck">
                <div className="Snap-Text">
                    {currentCard.value === previousCard.value && previousCard !== "" ? <h1>Snap Value!</h1> :<h1></h1>}
                    {currentCard.suit === previousCard.suit && previousCard !== "" ? <h1>Snap Suite!</h1> :<h1></h1>}
                </div>
                <div className="Cards">
                    <Card img={cards.length > 1 ? previousCard.image : ""} />
                    <Card img={cards.length ? currentCard.image : ""}/>
                </div>
            </div>
        );
    }

    return (
        <div className="Snap">
            <h1>Snap!</h1>
            {cards.length ? renderCards() : ""}
            {cardsLeft > 0 ? <button onClick={getCard}>Draw Card</button> : <div><p>{valueMatch} Value Matches</p> <p>{suitMatch} Suit Matches</p></div>}
            <p>{cardsLeft} Cards Left</p>
        </div>
    )
}

export default Snap

import { checkGuessedNumberButtonClick, getNewGameValues, againButtonClicked } from './logic/guesses.js';

const initializeApp = ()  => {
    const gameValues = getNewGameValues();
    checkGuessedNumberButtonClick(gameValues);
    againButtonClicked(gameValues);
}

initializeApp();

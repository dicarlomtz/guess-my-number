'use strict';

import { DEFAULT_RANDOM_NUMBER_MAX_LIMIT } from '../constants/random-number.js'
import  { convertToNumber, generateRandomNumber } from '../utils/number.js';
import { addEventListener, selectElement } from '../utils/elements.js';
import { DEFAULT_SCORE_NUMBER_VALUE  } from '../constants/score.js'


const initialGameValues = {
    secretRandomNumber: generateRandomNumber(DEFAULT_RANDOM_NUMBER_MAX_LIMIT),
    score: DEFAULT_SCORE_NUMBER_VALUE,
    highScore: 0
}

export const getNewGameValues = () =>  {
    return {
        ...initialGameValues,
        secretRandomNumber: generateRandomNumber(DEFAULT_RANDOM_NUMBER_MAX_LIMIT),
    };
};

// Document Element Selectors

const highscoreNumberText = selectElement('.highscore');
const checkGuessedNumberButton = selectElement('.check');
const resultMessageText = selectElement('.message');
const guessedNumberInput = selectElement('.guess');
const guessedNumberText = selectElement('.number');
const scoreNumberText = selectElement('.score');
const againButton = selectElement('.again');
const bodyElement = selectElement('body');

// Document Element Event Listener

const finalResultHandlers = {
    win: () => {
        bodyElement.style.backgroundColor = '#60b347';
        checkGuessedNumberButton.textContent = 'Continue!';
        guessedNumberInput.disabled = true;
    },
    loss: () => {
        bodyElement.style.backgroundColor = '#F37009';
        resultMessageText.textContent = "You have lost!";
        guessedNumberInput.disabled = true;
    },
    continue: (gameValues) => {
        bodyElement.style.backgroundColor = '#222';
        resultMessageText.textContent = "Start guessing...";
        checkGuessedNumberButton.textContent = 'Check!';
        gameValues.secretRandomNumber = generateRandomNumber(DEFAULT_RANDOM_NUMBER_MAX_LIMIT);
        guessedNumberInput.disabled = false;
    }
}

// Handle actions for the result of a guessing
const guessesResultHandlers = {
    correctGuessedNumber: (guessedNumber) => {
        resultMessageText.textContent = "That's the correct number!";
        guessedNumberText.textContent = guessedNumber;
        finalResultHandlers.win();
        return 'increaseHighscore';
    },
    guessNumberHigh: (guessedNumber) => {
        resultMessageText.textContent = "That's a high number!";
        guessedNumberText.textContent = guessedNumber;
        return 'decreaseScore';
    },
    guessNumberLow: (guessedNumber) => {
        resultMessageText.textContent = "That's a low number!";
        guessedNumberText.textContent = guessedNumber;
        return 'decreaseScore';
    },
    invalidInput: (guessedNumber) => {
        resultMessageText.textContent = "That's not a number!";
        guessedNumberText.textContent = guessedNumber;
        return 'decreaseScore';
    },
}

// Will handle the score and highscore modification, depending on the guessing result.
const scoreResultHandlers = {
    increaseHighscore: (gameValues) => {
        gameValues.highScore += 1;
        highscoreNumberText.textContent = gameValues.highScore;
    },
    decreaseScore: (gameValues) => {
        gameValues.score -= 1;
        scoreNumberText.textContent = gameValues.score;
    }
}

// Will return the type of a guessing
const getGuessedNumberResultType = (guessedNumber, secretRandomNumber) => {

    // Invalid input result type
    if (guessedNumber === undefined || guessedNumber === null) {
        return 'invalidInput';
    }

    // Correct guessed number
    if (guessedNumber === secretRandomNumber) {
        return 'correctGuessedNumber';
    }

    // High guessed number
    if (guessedNumber < secretRandomNumber) {
        return 'guessNumberLow';
    }

    // Low guessed number
    if (guessedNumber > secretRandomNumber) {
        return 'guessNumberHigh';
    }

}

// Event listener for the action when verifyng a guess
export const checkGuessedNumberButtonClick = (gameValues) => {
    addEventListener(checkGuessedNumberButton, 'click', () => {
        if (!gameValues.score) {
            finalResultHandlers.loss();
            return;
        }

        if (checkGuessedNumberButton.textContent === 'Continue!') {
            finalResultHandlers.continue(gameValues);
            return
        }

        const guessedNumber = convertToNumber(guessedNumberInput.value);

        const guessResultType = getGuessedNumberResultType(guessedNumber, gameValues.secretRandomNumber);
        const guessResultHandler = guessesResultHandlers[guessResultType];

        const scoreModifierType = guessResultHandler(guessedNumber || '?');
        const scoreModifierHandler = scoreResultHandlers[scoreModifierType];

        scoreModifierHandler(gameValues);
    });
};

// Resets all the state
export const againButtonClicked = (currentGameValues) => {
    addEventListener(againButton, 'click', () => {
        const newGameValues = getNewGameValues();

        Object.keys(currentGameValues).forEach(key => {currentGameValues[key] = newGameValues[key]; });
        highscoreNumberText.textContent = newGameValues.highScore;
        resultMessageText.textContent = "Start guessing...";
        scoreNumberText.textContent = newGameValues.score;
        checkGuessedNumberButton.textContent = 'Check!';
        bodyElement.style.backgroundColor = '#222';
        guessedNumberInput.disabled = false;
    });
}

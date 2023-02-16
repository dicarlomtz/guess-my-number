/**
 * Removes decimals from a number
 * @param {number} value number to be truncated
 * @returns a truncated number
 */
export const truncValue = value => Math.trunc(value);

/**
 * Multiplies two given numbers.
 * If multiplier is not defined, the multiplying number is returned
 * @param {number} multiplyingNumber
 * @param {number} multiplierNumber
 * @returns a multiplied number
 */
export const getMultipliedNumber = (multiplyingNumber, multiplierNumber) => {

    // No need to multiply if multiplicator is not defined
    if (!multiplierNumber) {
        return multiplyingNumber;
    }

    const multiplicationResult = multiplyingNumber * multiplierNumber;

    return multiplicationResult;
};

/**
 * Generates a random number with a given maximun number.
 * If the maximun number is not defined, it generates a random number without that limit.
 * @param {number} max
 * @returns a random number
 */
export const generateRandomNumber = (maxLimit) => {
    const randomNumber = Math.random();

    const randomNumberWithMaxLimit = getMultipliedNumber(randomNumber, maxLimit);

    const randomNumberTruncated = truncValue(randomNumberWithMaxLimit);

    return randomNumberTruncated;
};

/**
 * Verifies if a given value is numeric
 * @param {any} value
 * @returns boolean
 */
export const isValueNumeric = (value) => {
    if (value === undefined
        || value === null
        || !String(value).length
        || Number(value) === NaN) {
            return false;
        }

    return true;
}

/**
 * Converts a given value to a numeric format, if the value is not valid will return undefined
 * @param {any} value
 * @returns numeric || undefined
 */
export const convertToNumber = (value) => isValueNumeric(value) ? Number(value) : undefined;

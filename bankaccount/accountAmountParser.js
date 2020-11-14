'use strict';

const parseAmount = amountAsString => {
    const parsedAmount = Number.parseInt(amountAsString, 10);
    if (Number.isNaN(parsedAmount)) {
        throw new TypeError("amount is not parsable");
    }

    return parsedAmount;
}

module.exports = () => ({
    parseAmount
});
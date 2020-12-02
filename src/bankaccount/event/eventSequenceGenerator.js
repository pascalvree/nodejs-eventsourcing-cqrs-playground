'use strict';

const generateRegisterBankAccountCommand = require('./registerBankAccountCommandGenerator');
const generateBankAccountRegisteredEvent = require('./bankAccountRegisteredEventGenerator');
const generateAmountWithdrawnEvent = require('./amountWithdrawnEventGenerator');
const generateAmountDepositedEvent = require('./amountDepositedEventGenerator');

const generateIntegerBetween = (min, max) => Math.floor(
    Math.random() * (max - min) + min
);

module.exports = () => {
    const accountNumber = 'NL66INGB0002123132';
    const initialAmount = generateIntegerBetween(5, 20);
    const depositAmount = generateIntegerBetween(10, 20);
    const withdrawAmount = generateIntegerBetween(0, 5);

    return {
        forAccountNumber: accountNumber,
        expectedAmountAfterApplyingEvent: initialAmount + depositAmount + depositAmount - withdrawAmount,
        events: [
            generateRegisterBankAccountCommand(initialAmount, accountNumber),
            generateBankAccountRegisteredEvent(initialAmount, accountNumber),
            generateAmountDepositedEvent(depositAmount, accountNumber),
            generateAmountWithdrawnEvent(withdrawAmount, accountNumber),
            generateBankAccountRegisteredEvent(initialAmount, accountNumber),
            generateAmountDepositedEvent(depositAmount, accountNumber)
        ]
    };
}
'use strict';

module.exports = (amount, accountNumber) => ({
    'Type': 'bankAccountRegisteredEvent',
    'DateTime': '2020-11-13T20:33:27+000',
    'AccountHolder': 'Jane Lane (Joan)',
    'AccountNumber': accountNumber,
    'Amount': amount,
    'Valuta': 'EUR'
});
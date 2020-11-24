'use strict';

class bankAccountRegisteredEventBuilder {
    constructor() {
        this.result = null;
    }

    initialize() {
        this.result = {
            Type: 'bankAccountRegisteredEvent',
            DateTime: '2020-11-13T20:33:27+000',
            AccountHolder: '',
            AccountNumber: '',
            Amount: '',
            Currency: ''
        };

        return this;
    }

    withAccountNumber(value) {
        this.result.AccountNumber = value;
        return this;
    }

    withAccountHolder(value) {
        this.result.AccountHolder = value;
        return this;
    }

    withAmount(amount, currency) {
        this.result.Amount = amount;
        this.result.Currency = currency;
        return this;
    }

    getResult() {
        return this.result;
    }
}

module.exports = () => new bankAccountRegisteredEventBuilder();
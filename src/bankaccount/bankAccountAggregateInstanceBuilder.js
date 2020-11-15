'use strict';

class BankAccountAggregateInstanceBuilder {
    constructor() {
        this.result = null;
    }

    createEmptyInstance() {
        this.result = {
            "AccountHolder": "",
            "AccountNumber": "",
            "Amount": 0,
            "Valuta": "",
            "Events": []
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

    withAmount(value) {
        this.result.Amount = value;
        return this;
    }

    withValuta(value) {
        this.result.Valuta = value;
        return this;
    }

    withEvents(value) {
        this.result.Events = value;
        return this;
    }

    getInstance() {
        return this.result;
    }
}

module.exports = () => new BankAccountAggregateInstanceBuilder();
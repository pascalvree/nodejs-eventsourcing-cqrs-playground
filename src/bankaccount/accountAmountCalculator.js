'use strict';

class AccountAmountCalculator {

    constructor() {
        this.result = null;
    }

    withInitialValue(value) {
        this.result = value;
        return this;
    }

    add(value) {
        this.result = this.result + value;
        return this;
    }

    subtract(value) {
        this.result = this.result - value;
        return this;
    }

    getResult() {
        return this.result;
    }
}

module.exports = () => new AccountAmountCalculator();
'use strict';

class AmountWithdrawnEventHandler {

    constructor(accountAggregateInstanceBuilder, accountAmountParser, accountAmountCalculator, emitter) {
        this.accountAggregateInstanceBuilder = accountAggregateInstanceBuilder;
        this.accountAmountParser = accountAmountParser;
        this.accountAmountCalculator = accountAmountCalculator;
        this.emitter = emitter;
    }

    isHandlerFor(event) {
        return event.Type === "amountWithdrawn";
    }

    applyEvent(event, aggregateRoot) {
        if (this.isHandlerFor(event)) {
            const calculatedAmount = this.accountAmountCalculator
                .withInitialValue(this.accountAmountParser.parseAmount(aggregateRoot.Amount))
                .subtract(this.accountAmountParser.parseAmount(event.Amount))
                .getResult();

            return this.accountAggregateInstanceBuilder
                .initialize()
                .withAccountNumber(aggregateRoot.AccountNumber)
                .withAccountHolder(aggregateRoot.AccountHolder)
                .withAmount(calculatedAmount)
                .withValuta(aggregateRoot.Valuta)
                .withEvents(aggregateRoot.Events.concat(event))
                .getResult();
        }

        return aggregateRoot;
    }

}

module.exports = (accountAggregateInstanceBuilder, accountAmountParser, accountAmountCalculator, emitter) => new AmountWithdrawnEventHandler(accountAggregateInstanceBuilder, accountAmountParser, accountAmountCalculator, emitter);
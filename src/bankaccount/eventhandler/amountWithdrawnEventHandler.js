'use strict';

class AmountWithdrawnEventHandler {

    constructor(accountAggregateInstanceBuilder, accountAmountParser, accountAmountCalculator) {
        this.accountAggregateInstanceBuilder = accountAggregateInstanceBuilder;
        this.accountAmountParser = accountAmountParser;
        this.accountAmountCalculator = accountAmountCalculator;
    }

    isEventHandlerFor(event) {
        return event.Type === "amountWithdrawn";
    }

    applyEvent(event, aggregateRoot) {
        if (this.isEventHandlerFor(event)) {
            const calculatedAmount = this.accountAmountCalculator
                .withInitialValue(this.accountAmountParser.parseAmount(aggregateRoot.Amount))
                .subtract(this.accountAmountParser.parseAmount(event.Amount))
                .getResult();

            return this.accountAggregateInstanceBuilder.createEmptyInstance()
                .withAccountNumber(aggregateRoot.AccountNumber)
                .withAccountHolder(aggregateRoot.AccountHolder)
                .withAmount(calculatedAmount)
                .withValuta(aggregateRoot.Valuta)
                .withEvents(aggregateRoot.Events.concat(event))
                .getInstance();
        }

        return aggregateRoot;
    }

}

module.exports = (accountAggregateInstanceBuilder, accountAmountParser, accountAmountCalculator) => new AmountWithdrawnEventHandler(accountAggregateInstanceBuilder, accountAmountParser, accountAmountCalculator);
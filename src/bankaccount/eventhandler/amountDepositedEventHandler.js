'use strict';

class AmountDepositedEventHandler {

    constructor(accountAggregateInstanceBuilder, accountAmountParser, accountAmountCalculator) {
        this.accountAggregateInstanceBuilder = accountAggregateInstanceBuilder;
        this.accountAmountParser = accountAmountParser;
        this.accountAmountCalculator = accountAmountCalculator;
    }

    isEventHandlerFor(event) {
        return event.Type === "amountDeposited";
    }

    applyEvent(event, aggregateRoot) {
        if (this.isEventHandlerFor(event)) {
            const calculatedAmount = this.accountAmountCalculator
                    .withInitialValue(this.accountAmountParser.parseAmount(aggregateRoot.Amount))
                    .add(this.accountAmountParser.parseAmount(event.Amount))
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

module.exports = (accountAggregateInstanceBuilder, accountAmountParser, accountAmountCalculator) => new AmountDepositedEventHandler(accountAggregateInstanceBuilder, accountAmountParser, accountAmountCalculator);
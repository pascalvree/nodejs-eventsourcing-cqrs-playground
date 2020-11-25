'use strict';

class AmountDepositedEventHandler {

    constructor(accountAggregateInstanceBuilder, accountAmountParser, accountAmountCalculator, emitter) {
        this.accountAggregateInstanceBuilder = accountAggregateInstanceBuilder;
        this.accountAmountParser = accountAmountParser;
        this.accountAmountCalculator = accountAmountCalculator;
        this.emitter = emitter;
    }

    isHandlerFor(event) {
        return event.Type === "amountDeposited";
    }

    applyEvent(event, aggregateRoot) {
        if (this.isHandlerFor(event)) {
            const calculatedAmount = this.accountAmountCalculator
                    .withInitialValue(this.accountAmountParser.parseAmount(aggregateRoot.Amount))
                    .add(this.accountAmountParser.parseAmount(event.Amount))
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

module.exports = (accountAggregateInstanceBuilder, accountAmountParser, accountAmountCalculator, emitter) => new AmountDepositedEventHandler(accountAggregateInstanceBuilder, accountAmountParser, accountAmountCalculator, emitter);
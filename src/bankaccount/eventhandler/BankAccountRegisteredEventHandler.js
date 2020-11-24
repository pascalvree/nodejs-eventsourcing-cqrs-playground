'use strict';

class BankAccountRegisteredEventHandler {

    constructor(accountAggregateInstanceBuilder, accountAmountParser) {
        this.accountAggregateInstanceBuilder = accountAggregateInstanceBuilder;
        this.accountAmountParser = accountAmountParser;
    }

    isEventHandlerFor(event) {
        return event.Type === 'bankAccountRegistered';
    }

    applyEvent(event, aggregateRoot) {
        if (this.isEventHandlerFor(event)) {
            if (aggregateRoot === null) { // there is no known registration of this BankAccount yet ... create initial state
                return this.accountAggregateInstanceBuilder.createEmptyInstance()
                    .withAccountNumber(event.AccountNumber)
                    .withAccountHolder(event.AccountHolder)
                    .withAmount(this.accountAmountParser.parseAmount(event.Amount))
                    .withValuta(event.Valuta)
                    .withEvents([event])
                    .getInstance();
            } else {  // there is a known registration of this BankAccount yet ... add event, dont update any other State
                return this.accountAggregateInstanceBuilder.createEmptyInstance()
                    .withAccountNumber(aggregateRoot.AccountNumber)
                    .withAccountHolder(aggregateRoot.AccountHolder)
                    .withAmount(aggregateRoot.Amount)
                    .withValuta(aggregateRoot.Valuta)
                    .withEvents(aggregateRoot.Events.concat([event]))
                    .getInstance();

            }
        }

        return null;
    }
}

module.exports = (accountAggregateInstanceBuilder, accountAmountParser) => new BankAccountRegisteredEventHandler(accountAggregateInstanceBuilder, accountAmountParser);
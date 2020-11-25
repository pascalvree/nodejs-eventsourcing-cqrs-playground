'use strict';

class BankAccountRegisteredEventHandler {

    constructor(accountAggregateInstanceBuilder, accountAmountParser, emitter) {
        this.accountAggregateInstanceBuilder = accountAggregateInstanceBuilder;
        this.accountAmountParser = accountAmountParser;
        this.emitter = emitter;
    }

    isHandlerFor(event) {
        return event.Type === 'bankAccountRegistered';
    }

    applyEvent(event, aggregateRoot) {
        if (this.isHandlerFor(event)) {
            if (aggregateRoot === null) { // there is no known registration of this BankAccount yet ... create initial state
                return this.accountAggregateInstanceBuilder
                    .initialize()
                    .withAccountNumber(event.AccountNumber)
                    .withAccountHolder(event.AccountHolder)
                    .withAmount(this.accountAmountParser.parseAmount(event.Amount))
                    .withValuta(event.Valuta)
                    .withEvents([event])
                    .getResult();
            } else {  // there is a known registration of this BankAccount yet ... add event, dont update any other State
                return this.accountAggregateInstanceBuilder
                    .initialize()
                    .withAccountNumber(aggregateRoot.AccountNumber)
                    .withAccountHolder(aggregateRoot.AccountHolder)
                    .withAmount(aggregateRoot.Amount)
                    .withValuta(aggregateRoot.Valuta)
                    .withEvents(aggregateRoot.Events.concat([event]))
                    .getResult();

            }
        }

        return null;
    }
}

module.exports = (accountAggregateInstanceBuilder, accountAmountParser, emitter) => new BankAccountRegisteredEventHandler(accountAggregateInstanceBuilder, accountAmountParser, emitter);
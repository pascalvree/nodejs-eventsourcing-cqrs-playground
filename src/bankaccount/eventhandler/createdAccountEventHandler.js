'use strict';

class CreatedAccountEventHandler {

    constructor(accountAggregateInstanceBuilder, accountAmountParser) {
        this.accountAggregateInstanceBuilder = accountAggregateInstanceBuilder;
        this.accountAmountParser = accountAmountParser;
    }

    isEventHandlerFor(event) {
        return event.Type === "accountCreated";
    }

    applyEvent(event) {
        if (this.isEventHandlerFor(event)) {
            return this.accountAggregateInstanceBuilder.createEmptyInstance()
                .withAccountNumber(event.AccountNumber)
                .withAccountHolder(event.AccountHolder)
                .withAmount(this.accountAmountParser.parseAmount(event.Amount))
                .withValuta(event.Valuta)
                .withEvents([event])
                .getInstance();
        }

        return null;
    }

}

module.exports = (accountAggregateInstanceBuilder, accountAmountParser) => new CreatedAccountEventHandler(accountAggregateInstanceBuilder, accountAmountParser);
'use strict';

class RegisterBankAccountCommandHandler {

    constructor(accountAggregateInstanceBuilder, accountAmountParser) {
        this.accountAggregateInstanceBuilder = accountAggregateInstanceBuilder;
        this.accountAmountParser = accountAmountParser;
    }

    isEventHandlerFor(command) {
        return command.Type === "RegisterBankAccount";
    }

    applyEvent(command, aggregateRoot) {
        if (this.isEventHandlerFor(command)) {
            if (aggregateRoot === null) { // there is no known registration of this BankAccount yet ... create initial state
                return this.accountAggregateInstanceBuilder.createEmptyInstance()
                    .withAccountNumber(command.AccountNumber)
                    .withAccountHolder(command.AccountHolder)
                    .withAmount(this.accountAmountParser.parseAmount(command.Amount))
                    .withValuta(command.Valuta)
                    .withEvents([command])
                    .getInstance();
            } else {  // there is already a registration of this BankAccount ... add command, dont update any other State
                return this.accountAggregateInstanceBuilder.createEmptyInstance()
                    .withAccountNumber(aggregateRoot.AccountNumber)
                    .withAccountHolder(aggregateRoot.AccountHolder)
                    .withAmount(aggregateRoot.Amount)
                    .withValuta(aggregateRoot.Valuta)
                    .withEvents(aggregateRoot.Events.concat([event]))
                    .getInstance();
            }
        }
    }
}

module.exports = (accountAggregateInstanceBuilder, accountAmountParser) => new RegisterBankAccountCommandHandler(accountAggregateInstanceBuilder, accountAmountParser);
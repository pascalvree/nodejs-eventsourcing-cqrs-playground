'use strict';

class RegisterBankAccountCommandHandler {

    constructor(accountAggregateInstanceBuilder, accountAmountParser, accountAmountCalculator, bankAccountRegisteredEventBuilder, emitter) {
        this.accountAggregateInstanceBuilder = accountAggregateInstanceBuilder;
        this.accountAmountParser = accountAmountParser;
        this.accountAmountCalculator = accountAmountCalculator;
        this.bankAccountRegisteredEventBuilder = bankAccountRegisteredEventBuilder;
        this.emitter = emitter;
    }

    isHandlerFor(command) {
        return command.Type === "RegisterBankAccount";
    }

    applyEvent(command, aggregateRoot) {
        if (this.isHandlerFor(command)) {
            if (aggregateRoot === null) { // there is no known registration of this BankAccount yet ... create initial state
                const currentState = this.accountAggregateInstanceBuilder.createEmptyInstance()
                    .withAccountNumber(command.AccountNumber)
                    .withAccountHolder(command.AccountHolder)
                    .withAmount(command.Amount)
                    .withValuta(command.Valuta)
                    .withEvents([command])
                    .getInstance();

                const emittableEvent = this.bankAccountRegisteredEventBuilder
                    .initialize()
                    .withAccountNumber(command.AccountNumber)
                    .withAccountHolder(command.AccountHolder)
                    .withAmount(command.Amount, command.Valuta)
                    .getResult();
                this.emitter.emit(emittableEvent);

                return currentState;
            } else {  // there is already a registration of this BankAccount ... add command, dont update any other State
                return this.accountAggregateInstanceBuilder.createEmptyInstance()
                    .withAccountNumber(aggregateRoot.AccountNumber)
                    .withAccountHolder(aggregateRoot.AccountHolder)
                    .withAmount(aggregateRoot.Amount)
                    .withValuta(aggregateRoot.Valuta)
                    .withEvents(aggregateRoot.Events.concat([command]))
                    .getInstance();
            }
        }
    }
}

module.exports = (accountAggregateInstanceBuilder, accountAmountParser, accountAmountCalculator, bankAccountRegisteredEventBuilder, emitter) => new RegisterBankAccountCommandHandler(accountAggregateInstanceBuilder, accountAmountParser, accountAmountCalculator, bankAccountRegisteredEventBuilder, emitter);
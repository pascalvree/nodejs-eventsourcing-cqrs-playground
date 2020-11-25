'use strict';

module.exports = (bankAccountAmountParser, bankAccountAmountCalculator, bankAccountAggregateInstanceBuilder, bankAccountRegisteredEventBuilder, emitter) => {
    const bankAccountRegisteredEventHandler = require('./handler/eventhandler/bankAccountRegisteredEventHandler')(bankAccountAggregateInstanceBuilder, bankAccountAmountParser, bankAccountAmountCalculator, emitter);
    const amountDepositedEventHandler = require('./handler/eventhandler/amountDepositedEventHandler')(bankAccountAggregateInstanceBuilder, bankAccountAmountParser, bankAccountAmountCalculator, emitter);
    const amountWithdrawnEventHandler = require('./handler/eventhandler/amountWithdrawnEventHandler')(bankAccountAggregateInstanceBuilder, bankAccountAmountParser, bankAccountAmountCalculator, emitter);
    const eventHandlers = [bankAccountRegisteredEventHandler, amountDepositedEventHandler, amountWithdrawnEventHandler];

    const registerBankAccountCommandHandler = require('./handler/commandhandler/registerBankAccountCommandHandler')(bankAccountAggregateInstanceBuilder, bankAccountAmountParser, bankAccountAmountCalculator, bankAccountRegisteredEventBuilder, emitter);
    const commandHandlers = [registerBankAccountCommandHandler];

    return {
        handlers: [].concat(commandHandlers, eventHandlers),

        executeHandlerIfIsHandlerFor(event, aggregateRoot) {
            return this.handlers.reduce((accumulator, handler) => {
                if (handler.isHandlerFor(event)) {
                    return handler.applyEvent(event, accumulator);
                }

                return accumulator;
            }, aggregateRoot);
        }
    };
};
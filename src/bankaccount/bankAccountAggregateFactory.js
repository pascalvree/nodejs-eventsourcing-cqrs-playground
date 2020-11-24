'use strict';

module.exports = (repository, emitter) => {
    const bankAccountAmountParser = require('./bankAccountAmountParser')();
    const bankAccountAmountCalculator = require('./bankAccountAmountCalculator')();
    const bankAccountAggregateInstanceBuilder = require('./bankAccountAggregateInstanceBuilder')();

    const bankAccountRegisteredEventHandler = require('./eventhandler/bankAccountRegisteredEventHandler')(bankAccountAggregateInstanceBuilder, bankAccountAmountParser, bankAccountAmountCalculator, emitter);
    const amountDepositedEventHandler = require('./eventhandler/amountDepositedEventHandler')(bankAccountAggregateInstanceBuilder, bankAccountAmountParser, bankAccountAmountCalculator, emitter);
    const amountWithdrawnEventHandler = require('./eventhandler/amountWithdrawnEventHandler')(bankAccountAggregateInstanceBuilder, bankAccountAmountParser, bankAccountAmountCalculator, emitter);
    const eventHandlers = [bankAccountRegisteredEventHandler, amountDepositedEventHandler, amountWithdrawnEventHandler];

    const bankAccountRegisteredEventBuilder = require('./event/bankAccountRegisteredEventBuilder')();
    const registerBankAccountCommandHandler = require('./commandHandler/registerBankAccountCommandHandler')(bankAccountAggregateInstanceBuilder, bankAccountAmountParser, bankAccountAmountCalculator, bankAccountRegisteredEventBuilder, emitter);
    const commandHandlers = [registerBankAccountCommandHandler];

    const handlers = [].concat(commandHandlers, eventHandlers);
    return require('./bankAccountAggregate')(repository, handlers);
}
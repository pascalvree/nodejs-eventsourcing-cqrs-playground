'use strict';

const bankAccountAmountParser = require('./bankAccountAmountParser')();
const bankAccountAmountCalculator = require('./bankAccountAmountCalculator')();
const bankAccountAggregateInstanceBuilder = require('./bankAccountAggregateInstanceBuilder')();

const registerBankAccountCommandHandler = require('./commandHandler/registerBankAccountCommandHandler')(bankAccountAggregateInstanceBuilder, bankAccountAmountParser, bankAccountAmountCalculator);
const bankAccountRegisteredEventHandler = require('./eventhandler/bankAccountRegisteredEventHandler')(bankAccountAggregateInstanceBuilder, bankAccountAmountParser, bankAccountAmountCalculator);
const amountDepositedEventHandler = require('./eventhandler/amountDepositedEventHandler')(bankAccountAggregateInstanceBuilder, bankAccountAmountParser, bankAccountAmountCalculator);
const amountWitdrawnEventHandler = require('./eventhandler/amountWithdrawnEventHandler')(bankAccountAggregateInstanceBuilder, bankAccountAmountParser, bankAccountAmountCalculator);

const eventHandlers = [registerBankAccountCommandHandler, bankAccountRegisteredEventHandler, amountDepositedEventHandler, amountWitdrawnEventHandler];
module.exports = repository => require('./bankAccountAggregate')(repository, eventHandlers);
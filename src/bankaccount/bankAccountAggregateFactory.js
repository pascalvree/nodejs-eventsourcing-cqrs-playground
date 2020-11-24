'use strict';

const bankAccountAmountParser = require('./bankAccountAmountParser')();
const bankAccountAmountCalculator = require('./bankAccountAmountCalculator')();
const bankAccountAggregateInstanceBuilder = require('./bankAccountAggregateInstanceBuilder')();

const registerBankAccountCommandHandler = require('./commandHandler/registerBankAccountCommandHandler')(bankAccountAggregateInstanceBuilder, bankAccountAmountParser, bankAccountAmountCalculator);
const bankAccountRegisteredEventHandler = require('./eventhandler/BankAccountRegisteredEventHandler')(bankAccountAggregateInstanceBuilder, bankAccountAmountParser, bankAccountAmountCalculator);
const depositedAmountEventHandler = require('./eventhandler/depositedAmountEventHandler')(bankAccountAggregateInstanceBuilder, bankAccountAmountParser, bankAccountAmountCalculator);
const withdrewAmountEventHandler = require('./eventhandler/withdrewAmountEventHandler')(bankAccountAggregateInstanceBuilder, bankAccountAmountParser, bankAccountAmountCalculator);

const eventHandlers = [registerBankAccountCommandHandler, bankAccountRegisteredEventHandler, depositedAmountEventHandler, withdrewAmountEventHandler];
module.exports = repository => require('./bankAccountAggregate')(repository, eventHandlers);
'use strict';

const bankAccountAmountParser = require('./bankAccountAmountParser')();
const bankAccountAmountCalculator = require('./bankAccountAmountCalculator')();
const bankAccountAggregateInstanceBuilder = require('./bankAccountAggregateInstanceBuilder')();

const createdBankAccountEventHandler = require('./eventhandler/createdBankAccountEventHandler')(bankAccountAggregateInstanceBuilder, bankAccountAmountParser, bankAccountAmountCalculator);
const depositedAmountEventHandler = require('./eventhandler/depositedAmountEventHandler')(bankAccountAggregateInstanceBuilder, bankAccountAmountParser, bankAccountAmountCalculator);
const withdrewAmountEventHandler = require('./eventhandler/withdrewAmountEventHandler')(bankAccountAggregateInstanceBuilder, bankAccountAmountParser, bankAccountAmountCalculator);

const eventHandlers = [createdBankAccountEventHandler, depositedAmountEventHandler, withdrewAmountEventHandler];
module.exports = repository => require('./bankAccountAggregate')(repository, eventHandlers);
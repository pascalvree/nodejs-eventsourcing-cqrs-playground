'use strict';

const accountAmountParser = require('./accountAmountParser')();
const accountAmountCalculator = require('./accountAmountCalculator')();
const accountAggregateInstanceBuilder = require('./accountAggregateInstanceBuilder')();

const createdAccountEventHandler = require('./eventhandler/createdAccountEventHandler')(accountAggregateInstanceBuilder, accountAmountParser, accountAmountCalculator);
const depositedAmountEventHandler = require('./eventhandler/depositedAmountEventHandler')(accountAggregateInstanceBuilder, accountAmountParser, accountAmountCalculator);
const withdrewAmountEventHandler = require('./eventhandler/withdrewAmountEventHandler')(accountAggregateInstanceBuilder, accountAmountParser, accountAmountCalculator);

const additionalEventHandlers = [depositedAmountEventHandler, withdrewAmountEventHandler];
module.exports = repository => require('./accountAggregate')(repository, createdAccountEventHandler, additionalEventHandlers);
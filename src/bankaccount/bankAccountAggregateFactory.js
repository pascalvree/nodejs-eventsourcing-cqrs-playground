'use strict';

module.exports = (repository, emitter) => {
    const bankAccountAmountParser = require('./bankAccountAmountParser')();
    const bankAccountAmountCalculator = require('./bankAccountAmountCalculator')();
    const bankAccountAggregateInstanceBuilder = require('./bankAccountAggregateInstanceBuilder')();
    const bankAccountRegisteredEventBuilder = require('./event/bankAccountRegisteredEventBuilder')();

    const handlers = require('./bankAccountHandlersFactory')(bankAccountAmountParser, bankAccountAmountCalculator, bankAccountAggregateInstanceBuilder, bankAccountRegisteredEventBuilder, emitter);

    return require('./bankAccountAggregate')(repository, handlers);
}
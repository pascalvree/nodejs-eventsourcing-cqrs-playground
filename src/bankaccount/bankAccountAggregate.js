'use strict';

class BankAccountAggregate {

    constructor(repository, handlers) {
        this.repository = repository;
        this.handlers = handlers;
    }

    processEvent(event) {
        const aggregateRoot = this.repository.loadEntryUsingId(event.AccountNumber);
        const updatedAggregateRoot = this.handlers.reduce((accumulator, handler) => {
            if (handler.isHandlerFor(event)) {
                return handler.applyEvent(event, accumulator);
            }

            return accumulator;
        }, aggregateRoot);

        if (updatedAggregateRoot !== null) {
            this.repository.storeEntryUsingId(updatedAggregateRoot, updatedAggregateRoot.AccountNumber);
        }

        return true;
    }
}

module.exports = (repository, handlers) => new BankAccountAggregate(repository, handlers);
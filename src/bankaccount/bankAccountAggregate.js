'use strict';

class bankAccountAggregate {

    constructor(repository, handlers) {
        this.repository = repository;
        this.handlers = handlers;
    }

    processEvent(event) {
        const aggregateRoot = this.repository.loadEntryUsingId(event.AccountNumber);
        const updatedAggregateRoot = this.handlers.executeHandlerIfIsHandlerFor(event, aggregateRoot);

        if (updatedAggregateRoot !== null) {
            this.repository.replaceOrCreateEntryUsing(updatedAggregateRoot, updatedAggregateRoot.AccountNumber);
        }

        return true;
    }
}

module.exports = (repository, handlers) => new bankAccountAggregate(repository, handlers);
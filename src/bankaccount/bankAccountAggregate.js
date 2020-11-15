'use strict';

class BankAccountAggregate {

    constructor(repository, eventHandlers) {
        this.repository = repository;
        this.eventHandlers = eventHandlers;
    }

    processEvent(event) {
        const aggregateRoot = this.repository.loadEntryUsingId(event.AccountNumber);
        const updatedAggregateRoot = this.eventHandlers.reduce((accumulator, eventHandler) => {
            if (eventHandler.isEventHandlerFor(event)) {
                return eventHandler.applyEvent(event, accumulator);
            }

            return accumulator;
        }, aggregateRoot);

        if (updatedAggregateRoot !== null) {
            this.repository.storeEntryUsingId(updatedAggregateRoot, updatedAggregateRoot.AccountNumber);
        }

        return true;
    }
}

module.exports = (repository, eventHandlers) => new  BankAccountAggregate(repository, eventHandlers);
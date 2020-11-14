'use strict';

module.exports = (repository, createdAccountEventHandler, additionalEventHandlers) => {
    return event => {
        if (createdAccountEventHandler.isEventHandlerFor(event)) {
            const aggregateRoot = createdAccountEventHandler.applyEvent(event);
            repository.storeEntryUsingId(aggregateRoot, aggregateRoot.AccountNumber);
        }

        additionalEventHandlers.forEach(additionalEventHandler => {
            if (additionalEventHandler.isEventHandlerFor(event)) {
                const aggregateRoot = repository.loadEntryUsingId(event.AccountNumber);
                const updatedAggregateRoot = additionalEventHandler.applyEvent(event, aggregateRoot);
                repository.storeEntryUsingId(updatedAggregateRoot, aggregateRoot.AccountNumber);
            }
        });

        return repository;
    };
};
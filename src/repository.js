'use strict';

const volatileInProcessInMemoryStore = {};
const repository = {
    loadEntryUsingId: id => {
        if (volatileInProcessInMemoryStore[id]) {
            return volatileInProcessInMemoryStore[id];
        }

        return null;
    },
    replaceOrCreateEntryUsing: (aggregateRoot, id) => {
        volatileInProcessInMemoryStore[id] = aggregateRoot;
    }
};

module.exports = () => repository;
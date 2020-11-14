'use strict';

const volatileInProcessInMemoryStore = {};
const repository = {
    loadEntryUsingId: id => {
        if (volatileInProcessInMemoryStore[id]) {
            return volatileInProcessInMemoryStore[id];
        }

        return null;
    },
    storeEntryUsingId: (aggregateRoot, id) => {
        volatileInProcessInMemoryStore[id] = aggregateRoot;
    }
};

module.exports = () => repository;
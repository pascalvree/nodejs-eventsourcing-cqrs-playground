'use strict';

let volatileInProcessInMemoryStore = [];
const emitter = {
    emit: msg => {
        volatileInProcessInMemoryStore = volatileInProcessInMemoryStore.concat(msg);
        return msg;
    },
    get: () => {
        return volatileInProcessInMemoryStore;
    }
};

module.exports = () => emitter;
'use strict';

describe("bankaccount", () => {

    it('Generate sequence of commands and events, expected AccountNumber and Amount to match generated data', () => {
        // A initial attempt at property-based testing, we testing that the properties for AccountNumber and Amount hold, irregardless of the provided sequence of events

        const sequenceOfEvents = require('./event/eventSequenceGenerator')();

        const emitter = require('../emitter')();
        const repository = require('../repository')();
        const bankAccountAggregate = require('./bankAccountAggregateFactory')(repository, emitter);
        sequenceOfEvents.events.forEach(event => bankAccountAggregate.processEvent(event));

        const bankAccount = repository.loadEntryUsingId(sequenceOfEvents.forAccountNumber);
        expect(bankAccount.AccountNumber).toEqual(sequenceOfEvents.forAccountNumber);
        expect(bankAccount.Amount).toEqual(sequenceOfEvents.expectedAmountAfterApplyingEvent);
    });

});
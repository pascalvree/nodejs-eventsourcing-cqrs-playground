'use strict';

describe("bankaccount", () => {

    it('Expect bankaccount.Amount to be 43', () => {
        const events = [
            require('../../resources/registerBankAccountCommand.json'),
            require('../../resources/createdBankAccountEvent.json'),
            require('../../resources/withdrewAmountEvent.json'),
            require('../../resources/depositedAmountEvent-2.json'),
            require('../../resources/createdBankAccountEvent.json'),
            require('../../resources/depositedAmountEvent-1.json')
        ];

        const repository = require('../repository')();
        const bankAccountAggregate = require('./bankAccountAggregateFactory')(repository);

        events.forEach(event => bankAccountAggregate.processEvent(event));

        const bankaccount = repository.loadEntryUsingId(events[0].AccountNumber);
        expect(bankaccount.Amount).toEqual(43);
    });

});
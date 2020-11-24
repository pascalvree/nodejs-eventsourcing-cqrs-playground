'use strict';

describe("bankaccount", () => {

    it('Expect bankaccount.Amount to be 43', () => {
        const events = [
            require('../../resources/registerBankAccountCommand.json'),
            require('../../resources/bankAccountRegisteredEvent.json'),
            require('../../resources/amountWithdrawnEvent.json'),
            require('../../resources/amountDepositedEvent-2.json'),
            require('../../resources/bankAccountRegisteredEvent.json'),
            require('../../resources/amountDepositedEvent-1.json')
        ];

        const repository = require('../repository')();
        const bankAccountAggregate = require('./bankAccountAggregateFactory')(repository);

        events.forEach(event => bankAccountAggregate.processEvent(event));

        const bankaccount = repository.loadEntryUsingId(events[0].AccountNumber);
        expect(bankaccount.Amount).toEqual(43);
    });

});
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

        const emitter = require('../emitter')();
        const repository = require('../repository')();
        const bankAccountAggregate = require('./bankAccountAggregateFactory')(repository, emitter);

        events.forEach(event => bankAccountAggregate.processEvent(event));

        const bankAccount = repository.loadEntryUsingId(events[0].AccountNumber);
        expect(bankAccount.Amount).toEqual(43);

        const bankAccountRegisteredEventBuilder = require('./event/bankAccountRegisteredEventBuilder')();
        const expectedResult = bankAccountRegisteredEventBuilder
            .initialize()
            .withAccountNumber('NL66INGB0002123132')
            .withAccountHolder('Jane Lane (Joan)')
            .withAmount('10', 'EUR')
            .getResult();

        expect(emitter.get()[0]).toEqual(expectedResult);
    });

});
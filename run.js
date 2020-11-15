'use strict';

const events = [
    require('./resources/createdBankAccountEvent.json'),
    require('./resources/withdrewAmountEvent-3.json'),
    require('./resources/depositedAmountEvent-2.json'),
    require('./resources/createdBankAccountEvent.json'),
    require('./resources/depositedAmountEvent-1.json')
];

const repository = require('./src/repository')();
const bankAccountAggregate = require('./src/bankaccount/bankAccountAggregateFactory')(repository);

events.forEach(event => bankAccountAggregate.processEvent(event));

const account = repository.loadEntryUsingId(events[0].AccountNumber);
43 === account.Amount ? console.log(account, `PASS: Account with amount of ${account.Amount} matches expectation of 43`) : console.error(account, `FAIL: Account with amount of ${account.Amount} does not match expectation of 43`);
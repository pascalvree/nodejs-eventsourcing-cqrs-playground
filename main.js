'use strict';

const repository = require('./repository')();
const accountAggregate = require('./bankaccount/accountAggregateFactory')(repository);

const eventStream = [
    require('./resources/createdAccountEvent-0.json'),
    require('./resources/withdrewAmountEvent-3.json'),
    require('./resources/depositedAmountEvent-2.json'),
    require('./resources/depositedAmountEvent-1.json')
];

eventStream.forEach(event => accountAggregate(event));
const account = repository.loadEntryUsingId(eventStream[0].AccountNumber);
43 === account.Amount ? console.log(account, `PASS: Account with amount of ${account.Amount} matches expectation of 43`) : console.error(account, `FAIL: Account with amount of ${account.Amount} does not match expectation of 43`);
const assert = require('assert');
const faker = require('faker');

const apiProvider = require('../framework/services/index');

let accounts = new DataTable
(['email', 'password', 'status']);
accounts.add(['', 'bom', 400]);
accounts.add(['bom', '', 400]);
accounts.add([faker.internet.email(), faker.internet.password(), 400]);

Feature('Registration');
Data(accounts).Scenario('User can not register with not correct password or login', async({ I, current }) => {
 const user = {
  "email": current.email,
  "password": current.password
 };
 const { status } = await apiProvider().registerService().signup(user);
 assert.equal(status, current.status);
});

Scenario('User can register with correct password and login', async({ I }) => {
 const user = {
  "email": 'janet.weaver@reqres.in',
  "password": 'q12345'
 };
 const { status } = await apiProvider().registerService().signup(user);
 assert.equal(status, 200);
});

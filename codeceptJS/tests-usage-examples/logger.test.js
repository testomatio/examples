const { logger, log } = require('@testomatio/reporter');

// console messages are added to report by default when import "logger" from reporter
// but to prevent unsused variable warning, you can call next code:
logger.intercept(console);

Feature('Logger @Sebd746ef');

Scenario('Intercept console logs @Tebebb252', async () => {
  console.warn('This is warning message');
});

Scenario('Add own log message @T35d1887d', async () => {
  const someObject = {
    name: 'John',
    surname: 'Doe',
    age: 30,
  };
  log('This is log message', someObject);
});

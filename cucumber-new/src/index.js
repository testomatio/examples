import { logger, testomat } from '@testomatio/reporter';

export class Greeter {
  sayHello() {
    testomat.artifact({
      path: 'artifacts/artifact-test-image.png',
    });
    return 'hello';
  }
}

export class Logger {
  intercept() {
    logger.intercept(console);
  }
}

export class Testomat {
  step() {
    testomat.step('This is step');
  }

  uploadArtifact() {
    testomat.artifact({
      path: 'artifacts/artifact-test-image.png',
    });
    return 'hello';
  }
}


import { testomat } from '@testomatio/reporter';

export class Greeter {
  sayHello() {
    testomat.artifact({
      path: 'artifacts/artifact-test-image.png',
    });
    return 'hello';
  }
}

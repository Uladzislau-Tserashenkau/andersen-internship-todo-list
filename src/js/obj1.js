import { sum, sub } from './obj2';

export default class Test {
  constructor(num1 = 0, num2 = 0) {
    this.info = {
      sum: sum(num1, 2),
      sub: sub(num2, 2),
    };
  }
}

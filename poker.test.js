const poker = require('./poker');

class PokerTest {
  testAlgoritm() {
    let results1 = poker.test([2, 3, 4, 5, 6]);
    this.#assert(results1[0] === '2,3,4,5,6' && results1[1] === true);
    console.log('First assertion succesfull');

    let results2 = poker.test([14, 5, 4, 2, 3]);
    this.#assert(results2[0] === '14,5,4,2,3' && results2[1] === true);
    console.log('Second assertion succesfull');

    let results3 = poker.test([7, 7, 12, 11, 3, 4, 14]);
    this.#assert(results3[0] === '7,7,12,11,3,4,14' && results3[1] === false);
    console.log('Third assertion succesfull');

    let results4 = poker.test([7, 3, 2]);
    this.#assert(results4[0] === '7,3,2' && results4[1] === false);
    console.log('Fourth assertion succesfull');
  }

  #assert(condition) {
    if (!condition) {
      throw 'Assertion failed';
    }
  }
}

new PokerTest().testAlgoritm();

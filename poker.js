class Poker {
  /*
   * Validates if the following number is consecutive
   */
  #checkConsecutiveNumber = (beforeNumber, afterNumber) =>
    !(afterNumber - beforeNumber !== 1);

  /*
   * Validates whether the AS counts as 1 or 14
   */
  #checkCardAs = (firstConsecutiveNumber, lastConsecutiveNumber) =>
    this.#checkConsecutiveNumber(1, firstConsecutiveNumber) ||
    this.#checkConsecutiveNumber(lastConsecutiveNumber, 14);

  /*
   * Valid if the ladder has been completed
   */
  #isCompleteStraight = (cards, consecutiveNumbers, beforeCard, afterCard) =>
    (consecutiveNumbers.length === 4 &&
      !this.#checkConsecutiveNumber(beforeCard, afterCard) &&
      cards.indexOf(14) !== -1) ||
    consecutiveNumbers.length === 5;

  /*
   * Adds consecutive numbers for later validation
   */
  #addConsecutiveNumber = (consecutiveNumbers, beforeCard, afterCard) => {
    if (this.#checkConsecutiveNumber(beforeCard, afterCard)) {
      if (consecutiveNumbers.length === 0) {
        consecutiveNumbers.push(beforeCard, afterCard);
      } else {
        consecutiveNumbers.push(afterCard);
      }
    } else {
      consecutiveNumbers = [];
    }

    return consecutiveNumbers;
  };

  /*
   * Scroll through the card arrangement to find out if it is Straight or not Straight
   */
  #checkStraight(cards, isTest) {
    if (cards.length > 7) return false;

    let isStraight = false;
    let consecutiveNumbers = [];
    let originalCards = [];

    Object.assign(originalCards, cards);

    cards.sort((a, b) => a - b);

    for (let i = 0; i < cards.length; i++) {
      if (
        this.#isCompleteStraight(
          cards,
          consecutiveNumbers,
          cards[i],
          cards[i + 1]
        )
      ) {
        isStraight = true;
        break;
      }
      consecutiveNumbers = this.#addConsecutiveNumber(
        consecutiveNumbers,
        cards[i],
        cards[i + 1]
      );
    }

    if (consecutiveNumbers.length <= 4 && cards.indexOf(14) !== -1) {
      isStraight = this.#checkCardAs(
        consecutiveNumbers[0],
        consecutiveNumbers[consecutiveNumbers.length - 2]
      );
    }

    return !isTest
      ? isStraight
        ? `escalera: ${originalCards}`
        : `no es escalera: ${originalCards}`
      : [originalCards.toString(), isStraight];
  }

  start(cards) {
    return this.#checkStraight(cards, false);
  }

  test(cards) {
    return this.#checkStraight(cards, true);
  }
}

module.exports = new Poker();

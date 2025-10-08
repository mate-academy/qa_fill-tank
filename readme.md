# QA Fill tank ([uk](readme.uk.md))

Mate Royal Oil decided to completely automate the refueling process.

Write tests for `fillTank` function that takes a `customer` object, `fuelPrice`
per 1 liter and `amount` of fuel the customer wants to buy.

`customer` object contains the next props:

```js
customer = {
  money: 3000, // customer account balance
  vehicle {
    maxTankCapacity: 40, // fuel tank volume
    fuelRemains: 8, // Remaining fuel in the tank
  }
}
```

The function should return nothing, but only refills fuel and withdraws money,
following the next rules:

- If the `amount` is not given, then full tank is ordered.
- If the `amount` is greater than the tank can accommodate, pour only what will fit.
- ALWAYS fill in only what the client can pay.
- Round the poured amount by discarding number to the tenth part.
- If the poured amount is less than 2 liters, do not pour at all.
- Round the price of the purchased fuel the to the nearest hundredth part.

---

- [Guideline](https://github.com/mate-academy/js_task-guideline/blob/master/README.md);
- Read more about [Jest expectations](https://jestjs.io/uk/docs/expect).

'use strict';

/**
 * @typedef {Object} Vehicle
 * @property {number} maxTankCapacity
 * @property {number} fuelRemains
 *
 * @typedef {Object} Customer
 * @property {number} money
 * @property {Vehicle} vehicle
 *
 * @param {Customer} customer
 * @param {number} fuelPrice
 * @param {number} amount
 */
function fillTank(customer, fuelPrice, amount = Infinity) {
  const { vehicle } = customer;
  const freeSpace = vehicle.maxTankCapacity - vehicle.fuelRemains;
  const canBuy = customer.money / fuelPrice;
  const requiredAmount = Math.min(amount, freeSpace, canBuy);
  const roundedAmount = roundFuel(requiredAmount);

  if (roundedAmount < 2) {
    return;
  }

  customer.vehicle.fuelRemains += roundedAmount;
  customer.money -= roundPrice(roundedAmount * fuelPrice);
}

function roundFuel(fuel) {
  return Math.floor(fuel * 10) / 10;
}

function roundPrice(price) {
  return Math.round(price * 100) / 100;
}

module.exports = { fillTank };

'use strict';

describe('fillTank', () => {
  // const { fillTank } = require('./fillTank');

  it('should ', () => {

  });

  // write tests here
});

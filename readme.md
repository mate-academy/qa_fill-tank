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

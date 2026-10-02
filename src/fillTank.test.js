'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it.each([
    [
      'fill the tank when amount is omitted',
      3000,
      40,
      8,
      10,
      undefined,
      40,
      2680,
    ],
    ['fill the requested amount', 3000, 40, 8, 10, 5, 13, 2950],
    ['limit fuel to the available space', 3000, 40, 8, 10, 50, 40, 2680],
    ['fill exactly the available space', 3000, 40, 8, 10, 32, 40, 2680],
    ['limit fuel to the balance', 50, 40, 8, 10, 10, 13, 0],
    ['limit a full tank order to the balance', 50, 40, 8, 10, undefined, 13, 0],
    ['truncate the requested amount to tenths', 100, 40, 8, 10, 5.29, 13.2, 48],
    ['truncate affordable fuel to tenths', 52.99, 40, 8, 10, 10, 13.2, 0.99],
    ['truncate available space to tenths', 100, 40, 37.05, 10, 10, 39.95, 71],
    [
      'reject a requested amount below two liters',
      100,
      40,
      8,
      10,
      1.99,
      8,
      100,
    ],
    ['reject affordable fuel below two liters', 19.99, 40, 8, 10, 5, 8, 19.99],
    ['reject space below two liters', 100, 40, 38.01, 10, 5, 38.01, 100],
    ['fill exactly two liters', 20, 40, 38, 10, 2, 40, 0],
    ['leave a full tank unchanged', 100, 40, 40, 10, undefined, 40, 100],
    ['leave a zero amount unchanged', 100, 40, 8, 10, 0, 8, 100],
    ['leave a zero balance unchanged', 0, 40, 8, 10, 5, 8, 0],
    ['round the price up to hundredths', 100, 40, 8, 1.236, 2, 10, 97.53],
    ['round the price down to hundredths', 100, 40, 8, 1.232, 2, 10, 97.54],
  ])(
    'should %s',
    (
      description,
      money,
      maxTankCapacity,
      fuelRemains,
      fuelPrice,
      amount,
      expectedFuel,
      expectedMoney,
    ) => {
      const customer = {
        money,
        vehicle: { maxTankCapacity, fuelRemains },
      };

      const result = fillTank(customer, fuelPrice, amount);

      expect(result).toBeUndefined();
      expect(customer.vehicle.fuelRemains).toBeCloseTo(expectedFuel, 10);
      expect(customer.money).toBeCloseTo(expectedMoney, 10);
      expect(customer.vehicle.maxTankCapacity).toBe(maxTankCapacity);
    },
  );
});

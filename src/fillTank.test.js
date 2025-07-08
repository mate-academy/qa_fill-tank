/* eslint-disable max-len */
'use strict';

const { fillTank } = require('./fillTank');

describe('fillTank', () => {
  let customer;

  beforeEach(() => {
    customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
  });

  test('should fill full tank when amount is not given and enough money', () => {
    fillTank(customer, 50); // no amount → full tank

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBeCloseTo(3000 - 32 * 50, 2);
  });

  test('should not exceed tank capacity when amount is too big', () => {
    fillTank(customer, 50, 50); // tries to add 50L, but only 32 fit

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBeCloseTo(3000 - 32 * 50, 2);
  });

  test('should only fill what the customer can afford', () => {
    customer.money = 100; // can only afford 2L at 50/L

    fillTank(customer, 50, 10);

    expect(customer.vehicle.fuelRemains).toBe(10); // 8 + 2
    expect(customer.money).toBeCloseTo(0, 2);
  });

  test('should discard excess decimals when rounding fuel to 1 decimal place', () => {
    customer.money = 1000;

    const price = 33.333;

    // cantitatea maximă cumpărată
    const canBuy = customer.money / price;
    const freeSpace = customer.vehicle.maxTankCapacity - customer.vehicle.fuelRemains;

    const rawAmount = Math.min(Infinity, freeSpace, canBuy);
    const expectedPoured = Math.floor(rawAmount * 10) / 10;
    const expectedFuel = 8 + expectedPoured;

    fillTank(customer, price);

    expect(customer.vehicle.fuelRemains).toBeCloseTo(expectedFuel, 1);
  });

  test('should round price to nearest hundredth', () => {
    customer.money = 500;

    const price = 33.333;
    const amount = 3;

    const freeSpace = customer.vehicle.maxTankCapacity - customer.vehicle.fuelRemains;
    const canBuy = customer.money / price;

    const rawAmount = Math.min(amount, freeSpace, canBuy);
    const poured = Math.floor(rawAmount * 10) / 10;
    const expectedCost = Math.round(poured * price * 100) / 100;
    const expectedMoney = 500 - expectedCost;

    fillTank(customer, price, amount);

    expect(customer.money).toBeCloseTo(expectedMoney, 2);
  });

  test('should not fill if poured amount is less than 2L after rounding', () => {
    customer.money = 20; // can only afford ~0.6L
    fillTank(customer, 30);

    expect(customer.vehicle.fuelRemains).toBe(8); // unchanged
    expect(customer.money).toBe(20); // unchanged
  });

  test('should handle exact 2 liters correctly', () => {
    customer.money = 60; // 2L at 30
    fillTank(customer, 30);

    expect(customer.vehicle.fuelRemains).toBe(10);
    expect(customer.money).toBe(0);
  });
});

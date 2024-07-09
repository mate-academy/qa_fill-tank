/* eslint-disable max-len */
'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

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

  test('should refill full tank', () => {
    const fuelPrice = 2.5;

    fillTank(customer, fuelPrice);
    expect(customer.vehicle.fuelRemains).toBeCloseTo(40, 1);
    expect(customer.money).toBeCloseTo(3000 - (40 - 8) * fuelPrice, 2);
  });

  test('should refill specified amount that fits within tank capacity and budget', () => {
    const fuelPrice = 2.5;
    const amount = 20;

    fillTank(customer, fuelPrice, amount);
    expect(customer.vehicle.fuelRemains).toBeCloseTo(28, 1);
    expect(customer.money).toBeCloseTo(3000 - amount * fuelPrice, 2);
  });

  test('should not pour less than 2 liters', () => {
    const fuelPrice = 2.5;
    const amount = 1.5;

    fillTank(customer, fuelPrice, amount);
    expect(customer.vehicle.fuelRemains).toBe(8);
    expect(customer.money).toBe(3000);
  });
});

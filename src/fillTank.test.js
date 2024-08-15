'use strict';

const { fillTank } = require('./fillTank');

describe('fillTank', () => {
  test('should fill the tank only up to its capacity even if'
    + 'more money is available', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 38,
      },
    };
    const fuelPrice = 5;

    // eslint-disable-next-line no-undef
    fillTank(customer, fuelPrice);
    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(2990);
  });

  test('should round down correctly with floating-point'
   + 'precision issues', () => {
    const customer = {
      money: 0.9999,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const fuelPrice = 0.33333; // Small residual due to precision

    fillTank(customer, fuelPrice);
    expect(customer.vehicle.fuelRemains).toBe(10.9);

    expect(customer.money).toBeLessThanOrEqual(0.03);
  });

  test('should pour as much as affordable', () => {
    const customer = {
      money: 50,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const fuelPrice = 10;

    fillTank(customer, fuelPrice);
    expect(customer.vehicle.fuelRemains).toBe(13);
    expect(customer.money).toBe(0);
  });

  test('should fill the specified amount', () => {
    const customer = {
      money: 500,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const fuelPrice = 5;
    const amount = 20;

    fillTank(customer, fuelPrice, amount);
    expect(customer.vehicle.fuelRemains).toBe(28);
    expect(customer.money).toBe(400);
  });

  test('should not pour if amount is less than 2 liters', () => {
    const customer = {
      money: 5,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const fuelPrice = 3;

    fillTank(customer, fuelPrice);
    expect(customer.vehicle.fuelRemains).toBe(8);
    expect(customer.money).toBe(5);
  });

  test('should round the price to the nearest hundredth', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const fuelPrice = 3.5678;
    const amount = 5;

    fillTank(customer, fuelPrice, amount);
    expect(customer.vehicle.fuelRemains).toBe(13);
    expect(customer.money).toBe(82.16);
  });

  module.exports = { fillTank };
});

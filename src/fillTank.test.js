'use strict';

const { fillTank } = require('./fillTank');

describe('fillTank', () => {
  it('fills to full tank when amount is not given', () => {
    const customer = {
      money: 3000,
      vehicle: { maxTankCapacity: 40, fuelRemains: 8 },
    };

    const result = fillTank(customer, 50); // price per liter

    expect(result).toBeUndefined();
    // Tank needed: 32 liters
    // Cost: 32 * 50 = 1600
    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(1400);
  });

  it('fills only what fits when requested more than capacity', () => {
    const customer = {
      money: 5000,
      vehicle: { maxTankCapacity: 40, fuelRemains: 10 },
    };

    const result = fillTank(customer, 60, 50); // request 50 liters

    expect(result).toBeUndefined();
    // Tank space = 30 liters, pour 30
    // Cost = 30 * 60 = 1800
    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(3200);
  });

  it('fills only what the customer can afford', () => {
    const customer = {
      money: 100, // not enough for full
      vehicle: { maxTankCapacity: 40, fuelRemains: 0 },
    };

    const result = fillTank(customer, 30); // full tank requested (40 liters)

    expect(result).toBeUndefined();
    // Max affordable liters = 100 / 30 = 3.333... → rounded down to 3.3
    // But must check >= 2 liters → ok
    // Cost = 3.3 * 30 = 99 → rounded to 99.00
    expect(customer.vehicle.fuelRemains).toBeCloseTo(3.3, 5);
    expect(customer.money).toBeCloseTo(1.00, 5);
  });

  it('does not pour if the affordable amount is less than 2 liters', () => {
    const customer = {
      money: 20, // less than 2 liters at 15/liter
      vehicle: { maxTankCapacity: 40, fuelRemains: 5 },
    };

    const result = fillTank(customer, 15);

    expect(result).toBeUndefined();
    // Max affordable = 20/15 = 1.333... → 1.3 liters, less than 2
    // No change
    expect(customer.vehicle.fuelRemains).toBe(5);
    expect(customer.money).toBe(20);
  });

  it('rounds liters down to nearest tenth', () => {
    const customer = {
      money: 100,
      vehicle: { maxTankCapacity: 20, fuelRemains: 0 },
    };

    const result = fillTank(customer, 7); // 100 / 7 = 14.285... liters

    expect(result).toBeUndefined();
    // Rounded down to 14.2 liters
    // Cost = 14.2 * 7 = 99.4 → 99.40
    expect(customer.vehicle.fuelRemains).toBeCloseTo(14.2, 5);
    expect(customer.money).toBeCloseTo(0.60, 5);
  });

  it('rounds cost to nearest hundredth', () => {
    const customer = {
      money: 1000,
      vehicle: { maxTankCapacity: 100, fuelRemains: 0 },
    };

    const result = fillTank(customer, 33, 10); // request 10 liters

    expect(result).toBeUndefined();
    // 10 liters exactly
    // Cost = 330.00
    expect(customer.vehicle.fuelRemains).toBe(10);
    expect(customer.money).toBe(670.00);
  });
});

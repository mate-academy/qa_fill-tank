'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should be declared', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it('fills full tank when amount is not provided', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40, fuelRemains: 8,
      },
    };

    fillTank(customer, 50); // freeSpace = 32 liters
    expect(customer.vehicle.fuelRemains).toBe(40); // cost = 32 * 50 = 1600
    expect(customer.money).toBe(1400);
  });

  it('does not exceed tank capacity when amount is too large', () => {
    const customer = {
      money: 5000,
      vehicle: {
        maxTankCapacity: 40, fuelRemains: 10,
      },
    };

    fillTank(customer, 20, 100); // wants 100, but only 30 fit
    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(5000 - 30 * 20);
  });

  it('fills only what the customer can afford', () => {
    const customer = {
      money: 100, // can buy only 2 liters at 50/l
      vehicle: {
        maxTankCapacity: 40, fuelRemains: 5,
      },
    };

    fillTank(customer, 50, 10);
    expect(customer.vehicle.fuelRemains).toBe(7); // +2 liters
    expect(customer.money).toBe(0);
  });

  it('rounds poured amount down to one decimal place', () => {
    const customer = {
      money: 5000,
      vehicle: {
        maxTankCapacity: 100, fuelRemains: 10,
      },
    };

    fillTank(customer, 30, 20.987);
    expect(customer.vehicle.fuelRemains).toBe(30.9);
  });

  it('does not pour if rounded amount is less than 2 liters', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40, fuelRemains: 10,
      },
    };

    fillTank(customer, 20, 1.99); // rounds to 1.9 → < 2 → no fill
    expect(customer.vehicle.fuelRemains).toBe(10);
    expect(customer.money).toBe(1000);
  });

  it('rounds total price to nearest hundredth', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40, fuelRemains: 0,
      },
    };

    fillTank(customer, 33.333, 10); // price = 10 * 33.333 = 333.33 (rounded)
    expect(customer.money).toBeCloseTo(666.67, 2);
  });

  it('returns undefined (mutates customer object)', () => {
    const customer = {
      money: 500,
      vehicle: {
        maxTankCapacity: 40, fuelRemains: 10,
      },
    }; const result = fillTank(customer, 10, 5);

    expect(result).toBeUndefined();
  });
});

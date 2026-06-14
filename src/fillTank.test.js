/* eslint-disable */
'use strict';

const { fillTank } = require('./fillTank');

describe('fillTank', () => {
  it('fills the tank to maximum when amount is omitted', () => {
    const customer = {
      money: 3000,
      vehicle: { maxTankCapacity: 40, fuelRemains: 8 },
    };

    fillTank(customer, 20);

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(2360);
  });

  it('fills only what fits when amount exceeds available capacity', () => {
    const customer = {
      money: 3000,
      vehicle: { maxTankCapacity: 40, fuelRemains: 30 },
    };

    fillTank(customer, 30, 20);

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(2700);
  });

  it('fills only the volume the customer can pay for', () => {
    const customer = {
      money: 90,
      vehicle: { maxTankCapacity: 40, fuelRemains: 0 },
    };

    fillTank(customer, 20, 10);

    expect(customer.vehicle.fuelRemains).toBe(4.5);
    expect(customer.money).toBe(0);
  });

  it('rounds poured fuel down to one decimal and rounds total purchase price to two decimals', () => {
    const customer = {
      money: 100,
      vehicle: { maxTankCapacity: 40, fuelRemains: 0 },
    };

    fillTank(customer, 1.235, 3.96);

    expect(customer.vehicle.fuelRemains).toBe(3.9);
    expect(customer.money).toBeCloseTo(95.16, 2);
  });

  it('does not pour when the rounded amount would be less than 2 liters', () => {
    const customer = {
      money: 1000,
      vehicle: { maxTankCapacity: 40, fuelRemains: 0 },
    };

    fillTank(customer, 10, 1.99);

    expect(customer.vehicle.fuelRemains).toBe(0);
    expect(customer.money).toBe(1000);
  });
});

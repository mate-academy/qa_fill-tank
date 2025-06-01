
'use strict';

const { fillTank } = require('./fillTank');

describe('fillTank', () => {
  it('fills full tank if amount not provided', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      }
    };

    fillTank(customer, 10);

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(1000 - (30 * 10));
  });

  it('fills only up to max tank capacity', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 38,
      }
    };

    fillTank(customer, 10, 10);

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(1000 - (2 * 10));
  });

  it('fills only what customer can pay for', () => {
    const customer = {
      money: 50,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      }
    };

    fillTank(customer, 10, 10);

    expect(customer.vehicle.fuelRemains).toBe(15);
    expect(customer.money).toBe(0);
  });

  it('does not fill if rounded amount is less than 2 liters', () => {
    const customer = {
      money: 10,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      }
    };

    fillTank(customer, 10);

    expect(customer.vehicle.fuelRemains).toBe(10);
    expect(customer.money).toBe(10);
  });

  it('rounds the price correctly to nearest hundredth', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      }
    };

    fillTank(customer, 3.3333, 5);

    expect(customer.vehicle.fuelRemains).toBe(15);
    expect(customer.money).toBeCloseTo(83.33, 2);
  });
});

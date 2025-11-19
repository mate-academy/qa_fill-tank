'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should be declared', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it(`should fill full tank if amount is not provided`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 50);

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(3000 - (32 * 50));
  });

  it(`should fill only what fits when amount > tank capacity`, () => {
    const customer = {
      money: 5000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 20,
      },
    };

    fillTank(customer, 50, 30);

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(5000 - (20 * 50));
  });

  it(`should fill only as mush as customer can afford`, () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 20,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 50, 30);

    expect(customer.vehicle.fuelRemains).toBe(12);
    expect(customer.money).toBe(0);
  });

  it(`should round down amount of fuel to tenths`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 50, 26.78);

    expect(customer.vehicle.fuelRemains).toBe(36.7);
    expect(customer.money).toBe(3000 - (50 * 26.7));
  });

  it(`should NOT FILL if the final rounded amount is < 2 liters`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 50, 1.99);

    expect(customer.vehicle.fuelRemains).toBe(10); // no fuel added
    expect(customer.money).toBe(3000); // np money spent
  });

  it(`should round payment to the nearest hundredth part `, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 33.333, 26.78);

    expect(customer.vehicle.fuelRemains).toBe(36.7);
    expect(customer.money).toBe(3000 - Number((33.333 * 26.7).toFixed(2)));
  });
});

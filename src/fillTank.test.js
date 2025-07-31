'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should be declared', () => {
    expect(typeof fillTank).toBe('function');
  });

  it('should fill full tank if amount is not specified', () => {

    const customer = {
      money: 400,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 0,
      },
    };

    fillTank(customer, 10);

    expect(customer.vehicle.fuelRemains).toBe(40);

    expect(customer.money).toBe(0);
  });

  it('should obey the optional "amount" limit', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 100,
        fuelRemains: 0,
      },
    };

    fillTank(customer, 2, 15);

    expect(customer.vehicle.fuelRemains).toBe(15);
    expect(customer.money).toBe(70);
});

it('should do nothing with zero money', () => {
    const customer = {
      money: 0,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 3);

    expect(customer.vehicle.fuelRemains).toBe(10);
    expect(customer.money).toBe(0);
  });

  it('should not fill if rounded amount is less than 2L', () => {
    const customer = {
      money: 2.5,
      vehicle: {
        maxTankCapacity: 100,
        fuelRemains: 0,
      },
    };

    fillTank(customer, 2);

    expect(customer.vehicle.fuelRemains).toBe(0);
    expect(customer.money).toBe(2.5);
  });

  it('should round down fuel to 0.1L precision', () => {
    const customer = {
      money: 5.55,
      vehicle: {
        maxTankCapacity: 100,
        fuelRemains: 0,
      },
    };

    fillTank(customer, 2);

    expect(customer.vehicle.fuelRemains).toBe(2.7);
    expect(customer.money).toBeCloseTo(0.15);
  });
});

'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should be declared', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it('tank should be full', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 4, 32);

    expect(customer.vehicle.fuelRemains).toBe(40);
  });

  it('refused be filled if qty is less than 2', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 4, 1);

    expect(customer.vehicle.fuelRemains).toBe(8);
  });

  it('refused be filled if not enough money', () => {
    const customer = {
      money: 3,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 4, 5);

    expect(customer.vehicle.fuelRemains).toBe(8);
  });

  it('should be filled according to existing funds', () => {
    const customer = {
      money: 10,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 4, 5);

    expect(customer.vehicle.fuelRemains).toBe(10.5);
  });

  it('should be filled to max if amount'
    + 'request is bigger than tank capacity', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 4, 55);

    expect(customer.vehicle.fuelRemains).toBe(40);
  });

  it('should return nothing', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    expect(fillTank(customer, 4, 55)).toBe(undefined);
  });
});

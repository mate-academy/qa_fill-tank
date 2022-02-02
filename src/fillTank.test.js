'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should be a function', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it('should do nothing if amount < 2', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 30, 1);

    expect(customer.vehicle.fuelRemains)
      .toBe(8);
  });

  it('should fuel the car if amount > 1', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 30, 2);

    expect(customer.vehicle.fuelRemains)
      .toBe(10);
  });

  it('should refuel for all money if amount not specified.', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 400);

    expect(customer.vehicle.fuelRemains)
      .toBe(15.5);
  });

  it('should refuel to full tank if amount not specified.', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 29);

    expect(customer.vehicle.fuelRemains)
      .toBe(40);
  });
});

'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it(`function 'fillTank' should be declared`, () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it(`must refuel a full tank if not 'amount'`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 11);
    expect(customer.vehicle.fuelRemains).toBe(40);
  });

  it('should fill only the amount that can fit', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 11, 50);
    expect(customer.vehicle.fuelRemains).toBe(40);
  });

  it('should not be refueled in credit', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 100);
    expect(customer.vehicle.fuelRemains).toBe(38);
  });

  it('must round the number of filled liters to the nearest tenth', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 100, 5.333);
    expect(customer.vehicle.fuelRemains).toBe(13.3);
  });

  it('should not be refueled if you need to refuel < 2', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 38.1,
      },
    };

    fillTank(customer, 100);
    expect(customer.vehicle.fuelRemains).toBe(38.1);
  });

  it('should not be refueled if you need to refuel < 2', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 38.1,
      },
    };

    fillTank(customer, 100, 1);
    expect(customer.vehicle.fuelRemains).toBe(38.1);
  });

  it('must round the value to the nearest hundredth', () => {
    const customer = {
      money: 300,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 3.693, 3.3);
    expect(customer.money).toBe(287.81);
  });
});

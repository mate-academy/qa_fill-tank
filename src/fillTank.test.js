'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should be declared', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it('should fill the tank up to requested amount', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 2, 15);

    expect(customer.vehicle.fuelRemains).toBe(25);
    expect(customer.money).toBe(970);
  });

  it('should fill a full tank when amount is omitted', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 2);

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(936);
  });

  it('should pour only what fits if amount exceeds space', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 35,
      },
    };

    fillTank(customer, 2, 10);

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(990);
  });

  it('should fill only what the client can afford', () => {
    const customer = {
      money: 20,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 4, 20);

    expect(customer.vehicle.fuelRemains).toBe(15);
    expect(customer.money).toBeCloseTo(0);
  });

  it('should not pour if amount is less than 2 liters', () => {
    const customer = {
      money: 10,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 2, 1);

    expect(customer.vehicle.fuelRemains).toBe(10);
    expect(customer.money).toBe(10);
  });
});

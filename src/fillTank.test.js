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

  it('should round poured amount down to the tenth part', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 3, 15.67);

    expect(customer.vehicle.fuelRemains).toBe(25.6);
    expect(customer.money).toBeCloseTo(100 - 15.6 * 3);
  });

  it('should round price to the nearest hundredth part', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 3.33, 3);

    expect(customer.vehicle.fuelRemains).toBe(13);
    expect(customer.money).toBeCloseTo(100 - 9.99);
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

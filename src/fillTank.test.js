'use strict';

const { fillTank } = require('./fillTank');

describe('fillTank', () => {
  it('should round the poured amount to the nearest tenth', () => {
    const customer = {
      money: 400,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 28,
      },
    };

    fillTank(customer, 50, 11.9);
    expect(customer.vehicle.fuelRemains).toBeCloseTo(36, 1);
    expect(customer.money).toBeCloseTo(400 - 8 * 50, 2);
  });

  it('should round price to nearest hundredth', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 20,
      },
    };

    fillTank(customer, 33.333, 10);
    expect(customer.vehicle.fuelRemains).toBeCloseTo(30, 1);
    expect(customer.money).toBeCloseTo(1000 - 10 * 33.333, 2);
  });

  it('should fill tank to max if amount not given', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 20,
      },
    };

    fillTank(customer, 60);
    expect(customer.vehicle.fuelRemains).toBeCloseTo(50, 1);
    expect(customer.money).toBeCloseTo(3000 - 30 * 60, 2);
  });

  it('should pour amount that fits if too large', () => {
    const customer = {
      money: 2000,
      vehicle: {
        maxTankCapacity: 60,
        fuelRemains: 50,
      },
    };

    fillTank(customer, 50, 20);
    expect(customer.vehicle.fuelRemains).toBeCloseTo(60, 1);
    expect(customer.money).toBeCloseTo(2000 - 10 * 50, 2);
  });

  it('should not pour if amount is less than 2 liters', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 50, 1);
    expect(customer.vehicle.fuelRemains).toBe(10);
    expect(customer.money).toBe(100);
  });

  it('should not pour if customer has no money', () => {
    const customer = {
      money: 0,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 50, 5);
    expect(customer.vehicle.fuelRemains).toBe(10);
    expect(customer.money).toBe(0);
  });

  it('should not pour if funds are insufficient', () => {
    const customer = {
      money: 25,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 50, 5);
    expect(customer.vehicle.fuelRemains).toBe(10);
    expect(customer.money).toBe(25);
  });
});

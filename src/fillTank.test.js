'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should be declared', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it('fills the tank if amount is not given ', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 50);

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(1400);
  });

  it('does not overfill the tank', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 35,
      },
    };

    fillTank(customer, 50, 20);

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(2750);
  });

  it('fills only what customer can afford', () => {
    const customer = {
      money: 150,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 20,
      },
    };

    fillTank(customer, 60);

    expect(customer.vehicle.fuelRemains).toBe(22.5);
    expect(customer.money).toBe(0);
  });

  it('does not fill less than 2 liters', () => {
    const customer = {
      money: 150,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 20,
      },
    };

    fillTank(customer, 20, 1.9);

    expect(customer.vehicle.fuelRemains).toBe(20);
    expect(customer.money).toBe(150);
  });

  it('rounds fuel amount down to tenths', () => {
    const customer = {
      money: 78.9,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 0,
      },
    };

    fillTank(customer, 10);

    expect(customer.vehicle.fuelRemains).toBe(7.8);
    expect(customer.money).toBeCloseTo(0.9);
  });

  it('rounds fuel price to hundredths', () => {
    const customer = {
      money: 200,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 0,
      },
    };

    fillTank(customer, 53.333, 2.5);

    expect(customer.vehicle.fuelRemains).toBe(2.5);
    expect(customer.money).toBeCloseTo(66.67);
  });
});

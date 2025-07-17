'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('fills full tank if enough money', () => {
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

  it('fills only requested amount', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10, 20);
    expect(customer.vehicle.fuelRemains).toBe(28);
    expect(customer.money).toBe(800);
  });

  it('should only fill what fits in the tank', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 35,
      },
    };

    fillTank(customer, 10, 10);
    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(3000 - 5 * 10);
  });

  it('should only fill what the customer can afford', () => {
    const customer = {
      money: 50,
      vehicle: {
        maxTankCapacity: 60,
        fuelRemains: 0,
      },
    };

    fillTank(customer, 20, 5);
    expect(customer.vehicle.fuelRemains).toBe(2.5);
    expect(customer.money).toBe(50 - 2.5 * 20);
  });

  it('should not fill if rounded amount is less than 2 liters', () => {
    const customer = {
      money: 20,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 10);
    expect(customer.vehicle.fuelRemains).toBe(12.0);
    expect(customer.money).toBe(0);
  });

  it('should round price correctly to 2 decimal places', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 0,
      },
    };

    fillTank(customer, 13.333, 10);
    expect(customer.vehicle.fuelRemains).toBe(7.5);
    expect(customer.money).toBe(0);
  });

  it('should not fill if customer has no money', () => {
    const customer = {
      money: 0,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 10, 5);
    expect(customer.vehicle.fuelRemains).toBe(10);
    expect(customer.money).toBe(0);
  });

  it('does not overfill if tank is full', () => {
    const customer = {
      money: 5000,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 45,
      },
    };

    fillTank(customer, 10, 10);
    expect(customer.vehicle.fuelRemains).toBe(50);
    expect(customer.money).toBe(5000 - 5 * 10);
  });
});

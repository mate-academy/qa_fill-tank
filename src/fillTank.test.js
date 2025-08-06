'use strict';

const { fillTank } = require('../src/fillTank');

describe('fillTank', () => {
  it('should fill to full tank if no amount is provided', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10);

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(3000 - 32 * 10);
  });

  it('should fill only what can fit in the tank', () => {
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

  it('should fill only what the customer can afford', () => {
    const customer = {
      money: 50,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 0,
      },
    };

    fillTank(customer, 20, 10);

    expect(customer.vehicle.fuelRemains).toBe(2.5);
    expect(customer.money).toBe(50 - 2.5 * 20);
  });

  it('should not fill if rounded amount is less than 2 liters', () => {
    const customer = {
      money: 30,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 20, 1.9);

    expect(customer.vehicle.fuelRemains).toBe(10);
    expect(customer.money).toBe(30);
  });

  it('should round down to the nearest 0.1 liter', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 10, 15.678);

    expect(customer.vehicle.fuelRemains).toBe(25.6);
    expect(customer.money).toBe(3000 - 15.6 * 10);
  });

  it('should round price to nearest hundredth', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 0,
      },
    };

    fillTank(customer, 3.333, 10);

    expect(customer.vehicle.fuelRemains).toBe(10);
    expect(customer.money).toBeCloseTo(66.67, 2);
  });
});

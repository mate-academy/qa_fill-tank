'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('fills tank fully if amount not given', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };
    const fuelPrice = 50;

    fillTank(customer, fuelPrice);

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(1500);
  });

  it('should fill only what fits if amount is greater than tank space', () => {
    const customer = {
      money: 5000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 30,
      },
    };
    const fuelPrice = 100;
    const amount = 20;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(4000);
  });

  it('should only fill what the customer can afford', () => {
    const customer = {
      money: 200,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 0,
      },
    };
    const fuelPrice = 100;
    const amount = 10;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(2);
    expect(customer.money).toBe(0);
  });

  it('should not fill if rounded fuel is less than 2 liters', () => {
    const customer = {
      money: 90,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 0,
      },
    };
    const fuelPrice = 50;

    fillTank(customer, fuelPrice);

    expect(customer.vehicle.fuelRemains).toBe(0);
    expect(customer.money).toBe(90);
  });

  it('should round down the poured fuel to the nearest tenth', () => {
    const customer = {
      money: 999,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 0,
      },
    };
    const fuelPrice = 33;
    const amount = 50;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(30.2);
    expect(customer.money).toBeCloseTo(999 - 30.2 * 33, 2);
  });

  it('should round fuel cost to the nearest hundredth', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 0,
      },
    };
    const fuelPrice = 33.333;
    const amount = 10;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(10);
    expect(customer.money).toBeCloseTo(666.67, 2);
  });
});

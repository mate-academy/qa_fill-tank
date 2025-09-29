'use strict';

const { fillTank } = require('./fillTank');

describe('fillTank', () => {
  test('fills to full when requested amount exceeds free capacity', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 50, fuelRemains: 0,
      },
    };

    fillTank(customer, 1, 100);
    expect(customer.vehicle.fuelRemains).toBe(50);
    expect(customer.money).toBe(950);
  });

  test('fills requested amount when affordable and within capacity', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 50, fuelRemains: 0,
      },
    };

    fillTank(customer, 10, 30);
    expect(customer.vehicle.fuelRemains).toBe(30);
    expect(customer.money).toBe(700);
  });

  test('fills to full when amount is omitted (fill up)', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 50, fuelRemains: 0,
      },
    };

    fillTank(customer, 10);
    expect(customer.vehicle.fuelRemains).toBe(50);
    expect(customer.money).toBe(500);
  });

  test('does not exceed capacity even when amount > capacity', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 50, fuelRemains: 0,
      },
    };

    fillTank(customer, 10, 60);
    expect(customer.vehicle.fuelRemains).toBe(50);
    expect(customer.money).toBe(500);
  });

  test('fills only what customer can pay', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 50, fuelRemains: 0,
      },
    };

    fillTank(customer, 100, 50);
    expect(customer.vehicle.fuelRemains).toBe(10);
    expect(customer.money).toBe(0);
  });

  test('rounds fuel to one decimal place (tenth)', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 50, fuelRemains: 0,
      },
    };

    fillTank(customer, 44.1, 12.56);
    expect(customer.vehicle.fuelRemains).toBe(12.5);
    expect(customer.money).toBeCloseTo(448.75, 2);
  });

  test('does nothing when requested amount < 2', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 50, fuelRemains: 0,
      },
    };

    fillTank(customer, 431, 1.9);
    expect(customer.vehicle.fuelRemains).toBe(0);
    expect(customer.money).toBe(1000);
  });

  test('rounds price to nearest hundredth', () => {
    const customer = {
      money: 10,
      vehicle: {
        maxTankCapacity: 50, fuelRemains: 0,
      },
    };

    fillTank(customer, 1.333, 5);
    expect(customer.money).toBeCloseTo(3.33, 2);
  });
});

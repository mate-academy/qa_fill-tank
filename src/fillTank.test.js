'use strict';

const { fillTank } = require('./fillTank');

describe('fillTank', () => {
  const roundTo2 = (num) => Math.round(num * 100) / 100;

  it('declared as function', () => {
    expect(typeof fillTank).toBe('function');
  });

  it('fills full tank when enough money and no amount given', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 50);

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBeCloseTo(3000 - (32 * 50), 2);
  });

  it('fills requested amount if tank and money allow', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 10, 20);

    expect(customer.vehicle.fuelRemains).toBe(30);
    expect(customer.money).toBeCloseTo(3000 - (20 * 10), 2);
  });

  it('fills only what tank can hold if amount exceeds space', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 30,
        fuelRemains: 25,
      },
    };

    fillTank(customer, 10, 10);

    expect(customer.vehicle.fuelRemains).toBe(30);
    expect(customer.money).toBeCloseTo(3000 - (5 * 10), 2);
  });

  it('does not fill if client cannot afford at least 2 liters', () => {
    const customer = {
      money: 15,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 10, 5);

    expect(customer.vehicle.fuelRemains).toBe(10);
    expect(customer.money).toBe(15);
  });

  it('rounds fuel down to nearest tenth', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 20,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 3, 4.97);

    expect(customer.vehicle.fuelRemains).toBe(14.9);
    expect(customer.money).toBeCloseTo(100 - roundTo2(4.9 * 3), 2);
  });

  it('rounds price to nearest hundredth', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 20,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 3.333, 5);

    const expected = roundTo2(5 * 3.333);

    expect(customer.vehicle.fuelRemains).toBe(15);
    expect(customer.money).toBeCloseTo(100 - expected, 2);
  });

  it('does not fill if rounded amount is less than 2 liters', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 10, 1.9);

    expect(customer.vehicle.fuelRemains).toBe(10);
    expect(customer.money).toBe(100);
  });

  it('does nothing if no money', () => {
    const customer = {
      money: 0,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 10, 10);

    expect(customer.vehicle.fuelRemains).toBe(10);
    expect(customer.money).toBe(0);
  });

  it('fills exactly 2 liters if threshold met', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 10, 2);

    expect(customer.vehicle.fuelRemains).toBe(12);
    expect(customer.money).toBeCloseTo(100 - (2 * 10), 2);
  });
});

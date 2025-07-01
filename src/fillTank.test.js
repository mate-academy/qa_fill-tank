'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should ', () => {

  });

  test('fills full tank if amount is not specified', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const fuelPrice = 50;

    fillTank(customer, fuelPrice);

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBeCloseTo(3000 - 1600, 2);
  });

  test('does not fill more than tank capacity when amount is greater', () => {
    const customer = {
      money: 2000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 35,
      },
    };
    const fuelPrice = 50;

    fillTank(customer, fuelPrice, 10);

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBeCloseTo(2000 - 250, 2);
  });

  test('does not fill more than customer can pay', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 20,
      },
    };
    const fuelPrice = 50;

    fillTank(customer, fuelPrice, 10);

    expect(customer.vehicle.fuelRemains).toBe(22);
    expect(customer.money).toBeCloseTo(100 - 100, 2);
  });

  test('rounds down fuel amount to the nearest tenth', () => {
    const customer = {
      money: 500,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 20,
      },
    };
    const fuelPrice = 50;

    fillTank(customer, fuelPrice, 5.99);

    expect(customer.vehicle.fuelRemains).toBeCloseTo(25.9, 2);
    expect(customer.money).toBeCloseTo(500 - 295, 2);
  });

  test('does not fill if rounded amount is less than 2 liters', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 20,
      },
    };
    const fuelPrice = 50;

    fillTank(customer, fuelPrice, 1.9);

    expect(customer.vehicle.fuelRemains).toBe(20);
    expect(customer.money).toBe(100);
  });

  test('rounds price to nearest hundredth', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };
    const fuelPrice = 1.2345;

    fillTank(customer, fuelPrice, 5);

    expect(customer.vehicle.fuelRemains).toBe(15);
    expect(customer.money).toBeCloseTo(1000 - 6.17, 2);
  });

  test('fills only what fits and what customer can pay', () => {
    const customer = {
      money: 25,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 38,
      },
    };
    const fuelPrice = 10;

    fillTank(customer, fuelPrice);

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBeCloseTo(25 - 20, 2);
  });
});

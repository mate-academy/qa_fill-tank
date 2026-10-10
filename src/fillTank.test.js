'use strict';

const { fillTank } = require('./fillTank');

describe('fillTank', () => {
  test('should be declared as a function', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  test('should fill the tank when amount is not given', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10);

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(2680);
  });

  test('should not exceed the maximum tank capacity', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 35,
      },
    };

    fillTank(customer, 10, 10);

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(950);
  });

  test('should buy only the amount the customer can afford', () => {
    const customer = {
      money: 25,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 5,
      },
    };

    fillTank(customer, 10, 10);

    expect(customer.vehicle.fuelRemains).toBe(7.5);
    expect(customer.money).toBe(0);
  });

  test('should round the poured fuel down to one decimal place', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 5,
      },
    };

    fillTank(customer, 10, 2.78);

    expect(customer.vehicle.fuelRemains).toBe(7.7);
    expect(customer.money).toBe(973);
  });

  test('should not pour less than 2 liters', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 5,
      },
    };

    fillTank(customer, 10, 1.9);

    expect(customer.vehicle.fuelRemains).toBe(5);
    expect(customer.money).toBe(1000);
  });

  test('should round the fuel price to two decimal places', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 5,
      },
    };

    fillTank(customer, 10.126, 2);

    expect(customer.vehicle.fuelRemains).toBe(7);
    expect(customer.money).toBe(79.75);
  });

  test('should not return a value', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 5,
      },
    };

    expect(fillTank(customer, 10, 2)).toBeUndefined();
  });
});

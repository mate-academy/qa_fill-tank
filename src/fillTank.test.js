/* eslint-disable max-len */
'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  test('should be declared', () => {
    expect(fillTank)
      .toBeInstanceOf(Function);
  });

  test('should full tank if the amount is not given', () => {
    const customer = {
      'money': 1000,
      'vehicle': {
        'maxTankCapacity': 100,
        'fuelRemains': 10,
      },
    };

    fillTank(customer, 10);

    expect(customer)
      .toStrictEqual({
        'money': 100,
        'vehicle': {
          'maxTankCapacity': 100,
          'fuelRemains': 100,
        },
      });
  });

  test('should pour only what will fit if the amount is greater than the tank can accommodate', () => {
    const customer = {
      'money': 1000,
      'vehicle': {
        'maxTankCapacity': 100,
        'fuelRemains': 10,
      },
    };

    fillTank(customer, 10, 100);

    expect(customer)
      .toStrictEqual({
        'money': 100,
        'vehicle': {
          'maxTankCapacity': 100,
          'fuelRemains': 100,
        },
      });
  });

  test('should fill in only what the client can pay', () => {
    const customer = {
      'money': 100,
      'vehicle': {
        'maxTankCapacity': 100,
        'fuelRemains': 10,
      },
    };

    fillTank(customer, 10, 20);

    expect(customer)
      .toStrictEqual({
        'money': 0,
        'vehicle': {
          'maxTankCapacity': 100,
          'fuelRemains': 20,
        },
      });
  });

  test('should round the poured amount to the tenth part', () => {
    const customer = {
      'money': 1000,
      'vehicle': {
        'maxTankCapacity': 100,
        'fuelRemains': 10.3,
      },
    };

    fillTank(customer, 10, 25.47);

    expect(customer)
      .toStrictEqual({
        'money': 746,
        'vehicle': {
          'maxTankCapacity': 100,
          'fuelRemains': 35.7,
        },
      });
  });

  test('should not pour if the poured amount is less than 2 liters', () => {
    const customer = {
      'money': 1000,
      'vehicle': {
        'maxTankCapacity': 100,
        'fuelRemains': 10,
      },
    };

    fillTank(customer, 10, 1);

    expect(customer)
      .toStrictEqual({
        'money': 1000,
        'vehicle': {
          'maxTankCapacity': 100,
          'fuelRemains': 10,
        },
      });
  });

  test('should round the price of the purchased fuel the to the nearest hundredth part', () => {
    const customer = {
      'money': 1000,
      'vehicle': {
        'maxTankCapacity': 100,
        'fuelRemains': 10,
      },
    };

    fillTank(customer, 12.85, 18.95);

    expect(customer)
      .toStrictEqual({
        'money': 757.14,
        'vehicle': {
          'maxTankCapacity': 100,
          'fuelRemains': 28.9,
        },
      });
  });
});

'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  test('should be declared as a function', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  test(
    'should fill the tank completely' +
      'if amount is not provided and money is enough',
    () => {
      const customer = {
        money: 1000,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 8,
        },
      };

      fillTank(customer, 10);

      expect(customer).toEqual({
        money: 680,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 40,
        },
      });
    },
  );

  test(
    'should fill only up to the requested amount' +
      'if it fits and is affordable',
    () => {
      const customer = {
        money: 1000,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 8,
        },
      };

      fillTank(customer, 10, 15);

      expect(customer).toEqual({
        money: 850,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 23,
        },
      });
    },
  );

  test(
    'should fill only up to free space' +
      'if the requested amount exceeds tank capacity',
    () => {
      const customer = {
        money: 1000,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 30,
        },
      };

      fillTank(customer, 10, 25);

      expect(customer).toEqual({
        money: 900,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 40,
        },
      });
    },
  );

  test(
    'should fill only what customer can afford' +
      'if money is lower than required amount',
    () => {
      const customer = {
        money: 150,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 8,
        },
      };

      fillTank(customer, 10, 30);

      expect(customer).toEqual({
        money: 0,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 23,
        },
      });
    },
  );

  test('should round down fuel volume to tenths', () => {
    const customer = {
      money: 500,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 10, 5.27);

    expect(customer).toEqual({
      money: 448,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 15.2,
      },
    });
  });

  test('should round total price to the nearest hundredths', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 1.111, 2.5);

    expect(customer).toEqual({
      money: 97.22,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 12.5,
      },
    });
  });

  test(
    'should not fuel at all' + 'if rounded fuel amount is less than 2 liters',
    () => {
      const customer = {
        money: 100,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 10,
        },
      };

      fillTank(customer, 10, 1.95);

      expect(customer).toEqual({
        money: 100,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 10,
        },
      });
    },
  );

  test('should fuel if rounded fuel amount is exactly 2 liters', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 10, 2.0);

    expect(customer).toEqual({
      money: 80,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 12,
      },
    });
  });
});

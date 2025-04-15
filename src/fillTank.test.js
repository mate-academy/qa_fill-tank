'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it(`should be declared`, () => {
    expect(fillTank)
      .toBeInstanceOf(Function);
  });

  test('If the `amount` is not given, then full tank is ordered', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 2.5);

    expect(customer).toEqual({
      money: 2920,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    },
    );
  });

  test('If the `amount` > capacity left, pour only what will fit', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 2.5, 80);

    expect(customer).toEqual({
      money: 2920,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    },
    );
  });

  test('Pour only what money can buy', () => {
    const customer = {
      money: 10,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 2.5, 30);

    expect(customer).toEqual({
      money: 0,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 12,
      },
    },
    );
  });

  test('Round the poured amount by discarding number to the tenth part', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 5,
      },
    };

    fillTank(customer, 2.5, 11.46);

    expect(customer).toEqual({
      money: 71.5,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 16.4,
      },
    },
    );
  });

  test('If the poured amount is less than 2 liters, do not pour at all', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 5,
      },
    };

    fillTank(customer, 2.5, 1);

    expect(customer).toEqual({
      money: 100,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 5,
      },
    },
    );
  });

  test('Round the bought fuel price to the nearest 100th part', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 5,
      },
    };

    fillTank(customer, 2.456, 10);

    expect(customer).toEqual({
      money: 75.44,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 15,
      },
    },
    );
  });
});

'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it(`should be declared`, () => {
    expect(fillTank).toBeDefined();
  });

  it(`should return 'undefined'`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    expect(fillTank(customer)).toBeUndefined();
  });

  it(`should ordered full tank if amount is not given`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    const fuelPrice = 5;

    fillTank(customer, fuelPrice);

    expect(customer).toEqual({
      money: 2850,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  it(`should not pour more than tank can accommodate`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    const fuelPrice = 5;
    const fuelAmount = 50;

    fillTank(customer, fuelPrice, fuelAmount);

    expect(customer).toEqual({
      money: 2850,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  it(`should not fill more than client can pay`, () => {
    const customer = {
      money: 50,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    const fuelPrice = 5;
    const fuelAmount = 20;

    fillTank(customer, fuelPrice, fuelAmount);

    expect(customer).toEqual({
      money: 0,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 20,
      },
    });
  });

  it(`should not pour at all if poured amount is less than 2 liters`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const fuelPrice = 5;
    const fuelAmount = 1;

    fillTank(customer, fuelPrice, fuelAmount);

    expect(customer).toEqual({
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    });
  });

  it(`should correctly round poured amount, and price`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const fuelPrice = 5.12;
    const fuelAmount = 4.6;

    fillTank(customer, fuelPrice, fuelAmount);

    expect(customer).toEqual({
      money: 2976.45,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 12.6,
      },
    });
  });

  it(`should done nothing with negative values for price or amount`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const fuelPrice = -5;
    const fuelAmount = -4;

    fillTank(customer, fuelPrice, fuelAmount);

    expect(customer).toEqual({
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    });
  });
});

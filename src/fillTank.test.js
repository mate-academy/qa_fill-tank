'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should be declared', () => {
    expect(fillTank)
      .toBeInstanceOf(Function);
  });

  it(`should order full tank if 'amount' is not given`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const fuelPrice = 4;
    const expectedResult = 40;

    fillTank(customer, fuelPrice);

    expect(customer.vehicle.fuelRemains).toBe(expectedResult);
  });

  it(`should order full tank if 'amount'
    is greater than the tank can accommodate`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const fuelPrice = 4;
    const amount = 90;
    const expectedResult = 40;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(expectedResult);
  });

  it(`should fill in only what the client can pay`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const fuelPrice = 600;
    const amount = 30;

    const expectedResult = {
      money: 0,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 13,
      },
    };

    fillTank(customer, fuelPrice, amount);

    expect(customer).toEqual(expectedResult);
  });

  it(`should round the 'fuelRemains' by discarding
    number to the tenth part`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const fuelPrice = 8;
    const amount = 5.599;
    const expectedResult = 13.5;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(expectedResult);
  });

  it(`should not pour at all if 'amount' is less than 2`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const fuelPrice = 8;
    const amount = 1;
    const expectedResult = 8;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(expectedResult);
  });

  it(`should round the price of the purchased fuel
    to the nearest hundredth part`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const fuelPrice = 8.5698576495;
    const amount = 5;
    const expectedResult = 2957.15;

    fillTank(customer, fuelPrice, amount);

    expect(customer.money).toBe(expectedResult);
  });
});

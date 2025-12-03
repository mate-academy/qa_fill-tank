'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should fill tank', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 30, 15);

    expect(customer).toEqual({
      money: 2550,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 23,
      },
    });
  });

  it(`should fill full tank without 'amount'`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 30);

    expect(customer).toEqual({
      money: 2040,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  it(`'amount' > 'vehicle.maxTankCapacity'`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 30, 40);

    expect(customer).toEqual({
      money: 2040,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  it(`'amount' * 'fuelPrice' > 'customer.money'`, () => {
    const customer = {
      money: 400,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 15.35, 30);

    expect(customer).toEqual({
      money: 0.8999999999999773,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 34,
      },
    });
  });

  it(`'customer.money' / 'amount' * 'fuelPrice' < 2`, () => {
    const customer = {
      money: 29,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 15, 30);

    expect(customer).toEqual({
      money: 29,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    });
  });

  it(`rounds 'fuelPrice' * 'amount' to two decimal places`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 15.53, 15.23);

    expect(customer).toEqual({
      money: 2763.94,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 23.2,
      },
    });
  });
});

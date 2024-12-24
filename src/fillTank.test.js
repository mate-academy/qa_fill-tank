/* eslint-disable max-len */
'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('Should be called', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it('Should tank to max capacity, if customer want to much ', () => {
    const customer = {
      money: 2085,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 35,
      },
    };

    fillTank(customer, 28, 15);

    expect(customer).toEqual({
      money: 1945,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  it('Should tank to max capacity, if customer doesn\'t say amount', () => {
    const customer = {
      money: 1500,
      vehicle: {
        maxTankCapacity: 29,
        fuelRemains: 4,
      },
    };

    fillTank(customer, 40);

    expect(customer).toEqual({
      money: 500,
      vehicle: {
        maxTankCapacity: 29,
        fuelRemains: 29,
      },
    });
  });

  it('Should stay at the start position, if it not need to tanking', () => {
    const customer = {
      money: 930,
      vehicle: {
        maxTankCapacity: 80,
        fuelRemains: 80,
      },
    };

    fillTank(customer, 40);

    expect(customer).toEqual({
      money: 930,
      vehicle: {
        maxTankCapacity: 80,
        fuelRemains: 80,
      },
    });
  });

  it('Should tanking possible amount, if customer doest\'n have enough money ', () => {
    const customer = {
      money: 760,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 3,
      },
    };

    fillTank(customer, 40, 20);

    expect(customer).toEqual({
      money: 0,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 22,
      },
    });
  });

  it('Should tanking possible amount, if customer doest\'n have enough money and doesn\'t say', () => {
    const customer = {
      money: 450,
      vehicle: {
        maxTankCapacity: 20,
        fuelRemains: 1,
      },
    };

    fillTank(customer, 45);

    expect(customer).toEqual({
      money: 0,
      vehicle: {
        maxTankCapacity: 20,
        fuelRemains: 11,
      },
    });
  });

  it(`should the same 'customer' if 'amount' < 2`, () => {
    const customer = {
      money: 400,
      vehicle: {
        maxTankCapacity: 30,
        fuelRemains: 12,
      },
    };

    fillTank(customer, 25, 1.64);

    expect(customer).toEqual({
      money: 400,
      vehicle: {
        maxTankCapacity: 30,
        fuelRemains: 12,
      },
    });
  });
});

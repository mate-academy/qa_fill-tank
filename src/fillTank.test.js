/* eslint-disable max-len */
'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should return a function', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it('should not return anything', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    expect(fillTank(customer, 10)).toBeUndefined();
  });

  it(`should fill the tank to full and reduce money when amount is not specified`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    expect(fillTank(customer, 10)).toBeUndefined();

    expect(customer).toEqual({
      money: 2680,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  it(`should fill the tank to full when requested amount exceeds capacity`, () => {
    const customer = {
      money: 4000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    expect(fillTank(customer, 10, 50)).toBeUndefined();

    expect(customer).toEqual({
      money: 3680,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  it(`should fill in only what the client can pay`, () => {
    const customer = {
      money: 400,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    expect(fillTank(customer, 100, 50)).toBeUndefined();

    expect(customer).toEqual({
      money: 0,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 12,
      },
    });
  });

  it(`should fill in only what the client can pay`, () => {
    const customer = {
      money: 400,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    expect(fillTank(customer, 100, 50)).toBeUndefined();

    expect(customer).toEqual({
      money: 0,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 12,
      },
    });
  });

  it(`should return rounded the poured amount by discarding number to the tenth part`, () => {
    const customer = {
      money: 4000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    expect(fillTank(customer, 100, 8.4797)).toBeUndefined();

    expect(customer).toEqual({
      money: 3160,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 16.4,
      },
    });
  });

  it(`should not pour at all if poured amount is less then 2 liters`, () => {
    const customer = {
      money: 4000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    expect(fillTank(customer, 100, 1)).toBeUndefined();

    expect(customer).toEqual({
      money: 4000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    });
  });

  it(`should round the price of the purchased fuel the to the nearest hundredth part`, () => {
    const customer = {
      money: 4000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    expect(fillTank(customer, 99.5, 9.3)).toBeUndefined();

    expect(customer).toEqual({
      money: 3074.65,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 17.3,
      },
    });
  });
});

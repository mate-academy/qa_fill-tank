'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank.js');

  it(`'fillTank' should be declarated`, () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it(`don't fill if client has not money`, () => {
    const customer = {
      money: 0,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 40, 40);

    expect(customer).toEqual({
      money: 0,
      vehicle: {
        maxTankCapacity: 40, fuelRemains: 8,
      },
    });
  });

  it(`don't fill if client tank is full`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    };

    fillTank(customer, 40, 40);

    expect(customer).toEqual({
      money: 3000,
      vehicle: {
        maxTankCapacity: 40, fuelRemains: 40,
      },
    });
  });

  it(`don't fill if we can fill less than 2 liters`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 39,
      },
    };

    fillTank(customer, 40, 40);

    expect(customer).toEqual({
      money: 3000,
      vehicle: {
        maxTankCapacity: 40, fuelRemains: 39,
      },
    });
  });

  it(`fill full tank if client has enoght money and hasn't amount value`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 40);

    expect(customer).toEqual({
      money: 1720,
      vehicle: {
        maxTankCapacity: 40, fuelRemains: 40,
      },
    });
  });

  it(`should round money to .00`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 23.3,
      },
    };

    fillTank(customer, 41.33);

    expect(customer).toEqual({
      money: 2309.79,
      vehicle: {
        maxTankCapacity: 40, fuelRemains: 40,
      },
    });
  });

  it(`should round the fuel to .0`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 23.3,
      },
    };

    fillTank(customer, 41.33, 2.343);

    expect(customer).toEqual({
      money: 2904.94,
      vehicle: {
        maxTankCapacity: 40, fuelRemains: 25.6,
      },
    });
  });
});

'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it(`should be declared`, () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it(`should do nothing when amount < 2`, () => {
    // preparation
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10, 1.9);

    expect(customer).toEqual({
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    });
  });

  it(`should refills fuel if the amount = 2`, () => {
    // preparation
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10, 2);

    expect(customer).toEqual({
      money: 2980,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    });
  });

  it(`should refills full tank if the amount is not given`, () => {
    // preparation
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10,);

    expect(customer).toEqual({
      money: 2680,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  it(`should fill the tank fully if the customer wants to buy
  more fuel than his vehicle can accommodate`, () => {
    // preparation
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10, 32);

    expect(customer).toEqual({
      money: 2680,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  it(`decline an operation if the customer can buy less
  then 2 liters of fuel`, () => {
    // preparation
    const customer = {
      money: 18,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10, 3);

    expect(customer).toEqual({
      money: 18,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    });
  });

  it(`fill in only what the client can pay`, () => {
    // preparation
    const customer = {
      money: 40,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10, 5);

    expect(customer).toEqual({
      money: 0,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 12,
      },
    });
  });

  it(`Round the amount fuel, to the tenth`, () => {
    // preparation
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10, 10.547);

    expect(customer).toEqual({
      money: 2895,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 18.5,
      },
    });
  });

  it(`Round the price to the hundredth`, () => {
    // preparation
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10.528, 10);

    expect(customer).toEqual({
      money: 2894.72,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 18,
      },
    });
  });
});

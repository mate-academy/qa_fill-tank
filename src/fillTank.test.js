'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it(`should be declared`, () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it(`shouldn't return anything `, () => {
    const customer = {
      money: 2000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 3,
      },
    };

    expect(fillTank(customer, 5, 5)).toBeUndefined();
  });

  it(`should fill all the tank if amount is undefined`, () => {
    const customer = {
      money: 2000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 3,
      },
    };

    fillTank(customer, 10);

    expect(customer).toEqual({
      money: 1630,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  it(`should fill not more than the capacity of the`
  + ` tank if 'amount' > 'maxTankCapacity'`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 7,
      },
    };

    fillTank(customer, 25, 65);

    expect(customer).toEqual({
      money: 1925,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 50,
      },
    });
  });

  it(`should fill not more than customer is able`
  + ` to pay for it`, () => {
    const customer = {
      money: 200,
      vehicle: {
        maxTankCapacity: 30,
        fuelRemains: 5,
      },
    };

    fillTank(customer, 10, 25);

    expect(customer).toEqual({
      money: 0,
      vehicle: {
        maxTankCapacity: 30,
        fuelRemains: 25,
      },
    });
  });

  it(`should round the poured amount of fuel`
  + ` by the nearest tenth part`, () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 12,
      },
    };

    fillTank(customer, 10, 8.78);

    expect(customer).toEqual({
      money: 913,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 20.7,
      },
    });
  });

  it(`should round the price of perchased fuel`
  + ` to the nearest hundredth part`, () => {
    const customer = {
      money: 2500,
      vehicle: {
        maxTankCapacity: 45,
        fuelRemains: 14,
      },
    };

    fillTank(customer, 22.477, 20);

    expect(customer).toEqual({
      money: 2050.46,
      vehicle: {
        maxTankCapacity: 45,
        fuelRemains: 34,
      },
    });
  });

  it(`shouldn't pour the fuel if amount is less`
  + ` than 2`, () => {
    const customer = {
      money: 1500,
      vehicle: {
        maxTankCapacity: 30,
        fuelRemains: 3,
      },
    };

    fillTank(customer, 15, 1.5);

    expect(customer).toEqual({
      money: 1500,
      vehicle: {
        maxTankCapacity: 30,
        fuelRemains: 3,
      },
    });
  });

  it(`should pour the fuel if amount is more`
  + ` than 2`, () => {
    const customer = {
      money: 1500,
      vehicle: {
        maxTankCapacity: 30,
        fuelRemains: 3,
      },
    };

    fillTank(customer, 15, 2);

    expect(customer).toEqual({
      money: 1470,
      vehicle: {
        maxTankCapacity: 30,
        fuelRemains: 5,
      },
    });
  });
});

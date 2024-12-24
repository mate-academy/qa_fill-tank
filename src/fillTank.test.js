"use strict";

describe("fillTank", () => {
  const { fillTank } = require("./fillTank");

  it(`should be declared`, () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it(`should be full tank if not 'amount'`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10);

    expect(customer).toEqual({
      money: 2680,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  it(`should be full tank if customer want too much 'amount'`, () => {
    const customer = {
      money: 2000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 30,
      },
    };

    fillTank(customer, 30, 20);

    expect(customer).toEqual({
      money: 1700,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  it(`should be fix count 'amount'
    if 'customer' don't have enough
    money and without 'amount'`, () => {
    const customer = {
      money: 800,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 15,
      },
    };

    fillTank(customer, 50);

    expect(customer).toEqual({
      money: 0,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 31,
      },
    });
  });

  it(`should be fix count 'amount'
    if 'customer' don't have enough
    money and with 'amount'`, () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 0,
      },
    };

    fillTank(customer, 50, 30);

    expect(customer).toEqual({
      money: 0,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 20,
      },
    });
  });

  it(`should around sum to decimal part`, () => {
    const customer = {
      money: 2000,
      vehicle: {
        maxTankCapacity: 30,
        fuelRemains: 0,
      },
    };

    fillTank(customer, 23.54, 10);

    expect(customer).toEqual({
      money: 1764.6,
      vehicle: {
        maxTankCapacity: 30,
        fuelRemains: 10,
      },
    });
  });

  it(`should around litters to hundredth part`, () => {
    const customer = {
      money: 1764.6,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 32.564,
      },
    };

    fillTank(customer, 25);

    expect(customer).toEqual({
      money: 1579.6,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 39.964,
      },
    });
  });

  it(`should the same 'customer' if 'amount' < 2`, () => {
    const customer = {
      money: 400,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 12,
      },
    };

    fillTank(customer, 25, 1.64);

    expect(customer).toEqual({
      money: 400,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 12,
      },
    });
  });
});

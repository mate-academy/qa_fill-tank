"use strict";

describe("fillTank", () => {
  const { fillTank } = require("./fillTank");

  it("shouldn't return a value", () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    expect(fillTank(customer, 10, 30)).toBeUndefined();
  });

  it(`if no 'amount' then order full tank`, () => {
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

  it(`if 'amount' > 'fuelRemains' pour only what will fit`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 35,
      },
    };

    fillTank(customer, 8, 12);

    expect(customer).toEqual({
      money: 2960,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  it(`if client money less then he can pay `, () => {
    const customer = {
      money: 50,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 15, 30);

    expect(customer).toEqual({
      money: 0.5,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 13.3,
      },
    });
  });

  it(`round the amount of required fuel`, () => {
    const customer = {
      money: 2500,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 4,
      },
    };

    fillTank(customer, 15, 20.4);

    expect(customer).toEqual({
      money: 2194,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 24.4,
      },
    });
  });

  it(`don't pour if 'amount' < 2`, () => {
    const customer = {
      money: 2500,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 38,
      },
    };

    fillTank(customer, 15, 1.2);

    expect(customer).toEqual({
      money: 2500,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 38,
      },
    });
  });

  it(`round the price of purshased fuel`, () => {
    const customer = {
      money: 5000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 14,
      },
    };

    fillTank(customer, 15.8, 23);

    expect(customer).toEqual({
      money: 4636.6,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 37,
      },
    });
  });
});

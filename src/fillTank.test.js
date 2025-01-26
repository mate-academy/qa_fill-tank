"use strict";

describe("fillTank", () => {
  const { fillTank } = require("./fillTank");
  const customer = {
    money: 3000,
    vehicle: {
      maxTankCapacity: 40,
      fuelRemains: 8,
    },
  };

  beforeEach(() => {
    customer.money = 3000;
    customer.vehicle.fuelRemains = 8;
  });

  afterEach(() => {
    customer.money = 3000;
    customer.vehicle.fuelRemains = 8;
  });

  it("should be an instance of function", () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it("should return the full tank if there is no amount", () => {
    fillTank(customer, 5);

    const expectedResult = {
      money: 2840,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    };

    expect(customer).toStrictEqual(expectedResult);
  });

  it("should return the max tank if there is more fuel than possible", () => {
    fillTank(customer, 10, 50);

    const expectedResult = {
      money: 2680,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    };

    expect(customer).toStrictEqual(expectedResult);
  });

  it("should fill in only what the client can pay", () => {
    customer.money = 500;
    fillTank(customer, 100, 10);

    const expectedResult = {
      money: 0,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 13,
      },
    };

    expect(customer).toStrictEqual(expectedResult);
  });

  it("should not fill in the tank if the client doesnt have any money", () => {
    customer.money = 0;
    fillTank(customer, 100, 10);

    const expectedResult = {
      money: 0,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    expect(customer).toStrictEqual(expectedResult);
  });

  it("should round the price of the fuel to the nearest hunderdth part", () => {
    fillTank(customer, 3.151, 11);

    const expectedResult = {
      money: 2965.34,
      vehicle: {
        fuelRemains: 19,
        maxTankCapacity: 40,
      },
    };

    expect(customer).toStrictEqual(expectedResult);
  });

  it("should not fill in the tank if the amount is less than 2 liters", () => {
    fillTank(customer, 5, 1);

    const expectedResult = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    expect(customer).toStrictEqual(expectedResult);
  });

  it("should round the amount to the tenth part", () => {
    fillTank(customer, 109);

    const expectedResult = {
      money: 2.5,
      vehicle: {
        fuelRemains: 35.5,
        maxTankCapacity: 40,
      },
    };

    expect(customer).toStrictEqual(expectedResult);
  });
});
